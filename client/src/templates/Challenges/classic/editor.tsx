import * as ReactDOMServer from 'react-dom/server';
import Loadable from '@loadable/component';
// eslint-disable-next-line import/no-duplicates
import type * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import type {
  IRange,
  editor
  // eslint-disable-next-line import/no-duplicates
} from 'monaco-editor/esm/vs/editor/editor.api';
import { highlightAllUnder } from 'prismjs';
import React, {
  useEffect,
  Suspense,
  RefObject,
  MutableRefObject,
  useRef
} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import store from 'store';

import { debounce } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { Loader } from '../../../components/helpers';
import { Themes } from '../../../components/settings/theme';
import {
  userSelector,
  saveChallenge,
  isDonationModalOpenSelector,
  isSignedInSelector
} from '../../../redux';
import {
  ChallengeFiles,
  Dimensions,
  Ext,
  FileKey,
  ResizeProps,
  Test
} from '../../../redux/prop-types';
import { editorToneOptions } from '../../../utils/tone/editor-config';
import { editorNotes } from '../../../utils/tone/editor-notes';
import { challengeTypes } from '../../../../utils/challenge-types';
import {
  canFocusEditorSelector,
  challengeMetaSelector,
  consoleOutputSelector,
  executeChallenge,
  saveEditorContent,
  setEditorFocusability,
  updateFile,
  challengeTestsSelector,
  submitChallenge,
  initTests,
  isResettingSelector,
  stopResetting,
  isProjectPreviewModalOpenSelector,
  openModal,
  isChallengeCompletedSelector
} from '../redux';
import GreenPass from '../../../assets/icons/green-pass';
import LowerJaw from './lower-jaw';

import './editor.css';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const MonacoEditor = Loadable(() => import('react-monaco-editor'));

interface EditorProps {
  canFocus: boolean;
  challengeFiles: ChallengeFiles;
  challengeType: number;
  containerRef: RefObject<HTMLElement>;
  contents: string;
  description: string;
  dimensions: Dimensions;
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor>;
  executeChallenge: (options?: { showCompletionModal: boolean }) => void;
  ext: Ext;
  fileKey: FileKey;
  canFocusOnMountRef: MutableRefObject<boolean>;
  initialEditorContent: string;
  initialExt: string;
  initTests: (tests: Test[]) => void;
  initialTests: Test[];
  isResetting: boolean;
  isSignedIn: boolean;
  openHelpModal: () => void;
  output: string[];
  resizeProps: ResizeProps;
  saveChallenge: () => void;
  saveEditorContent: () => void;
  setEditorFocusability: (isFocusable: boolean) => void;
  submitChallenge: () => void;
  stopResetting: () => void;
  tests: Test[];
  theme: Themes;
  title: string;
  showProjectPreview: boolean;
  previewOpen: boolean;
  updateFile: (object: {
    fileKey: FileKey;
    editorValue: string;
    editableRegionBoundaries?: number[];
  }) => void;
  usesMultifileEditor: boolean;
  isChallengeCompleted: boolean;
}

// TODO: this is grab bag of unrelated properties.  There's no need for them to
// all be in the same object.
interface EditorProperties {
  editor?: editor.IStandaloneCodeEditor;
  model?: editor.ITextModel;
  descriptionZoneId: string;
  insideEditDecId: string;
  descriptionZoneTop: number;
  outputZoneTop: number;
  outputZoneId: string;
  descriptionNode?: HTMLDivElement;
  outputNode?: HTMLDivElement;
  descriptionWidget?: editor.IContentWidget;
  outputWidget?: editor.IOverlayWidget;
}

const mapStateToProps = createSelector(
  canFocusEditorSelector,
  challengeMetaSelector,
  consoleOutputSelector,
  isDonationModalOpenSelector,
  isProjectPreviewModalOpenSelector,
  isResettingSelector,
  isSignedInSelector,
  userSelector,
  challengeTestsSelector,
  isChallengeCompletedSelector,
  (
    canFocus: boolean,
    { challengeType }: { challengeType: number },
    output: string[],
    open,
    previewOpen: boolean,
    isResetting: boolean,
    isSignedIn: boolean,
    { theme = Themes.Default }: { theme: Themes },
    tests: [{ text: string; testString: string }],
    isChallengeCompleted: boolean
  ) => ({
    canFocus: open ? false : canFocus,
    challengeType,
    previewOpen,
    isResetting,
    isSignedIn,
    output,
    theme,
    tests,
    isChallengeCompleted
  })
);

// type ActionDispatchGeneric<P, T> = (payload: P) => ({type: T, payload: P});

const mapDispatchToProps = {
  executeChallenge,
  saveChallenge,
  saveEditorContent,
  setEditorFocusability,
  updateFile,
  submitChallenge,
  initTests,
  stopResetting,
  openHelpModal: () => openModal('help')
};

const modeMap = {
  css: 'css',
  html: 'html',
  js: 'javascript',
  jsx: 'javascript'
};

let monacoThemesDefined = false;
const defineMonacoThemes = (
  monaco: typeof monacoEditor,
  options: { usesMultifileEditor: boolean }
) => {
  if (monacoThemesDefined) {
    return;
  }
  monacoThemesDefined = true;
  const yellowColor = 'FFFF00';
  const lightBlueColor = '9CDCFE';
  const darkBlueColor = '00107E';
  monaco.editor.defineTheme('vs-dark-custom', {
    base: 'vs-dark',
    inherit: true,
    colors: {
      'editor.background': '#2a2a40',
      'editor.lineHighlightBorder': '#0e4470'
    },
    rules: [
      { token: 'delimiter.js', foreground: lightBlueColor },
      { token: 'delimiter.parenthesis.js', foreground: yellowColor },
      { token: 'delimiter.array.js', foreground: yellowColor },
      { token: 'delimiter.bracket.js', foreground: yellowColor }
    ]
  });
  monaco.editor.defineTheme('vs-custom', {
    base: 'vs',
    inherit: true,
    // TODO: Use actual color from style-guide
    colors: {
      'editor.background': options.usesMultifileEditor ? '#eee' : '#fff',
      'editor.lineHighlightBorder': '#cee8fc'
    },
    rules: [{ token: 'identifier.js', foreground: darkBlueColor }]
  });
};

const initialData: EditorProperties = {
  descriptionZoneId: '',
  insideEditDecId: '',
  descriptionZoneTop: 0,
  outputZoneId: '',
  outputZoneTop: 0
};

const Editor = (props: EditorProps): JSX.Element => {
  const { t } = useTranslation();
  const { editorRef, initTests } = props;
  // These refs are used during initialisation of the editor as well as by
  // callbacks.  Since they have to be initialised before editorWillMount and
  // editorDidMount are called, we cannot use useState.  Reason being that will
  // only take effect during the next render, which is too late. We could use
  // plain objects here, but useRef is shared between instances, so avoids
  // unecessary object creation.
  const monacoRef: MutableRefObject<typeof monacoEditor | null> =
    useRef<typeof monacoEditor>(null);
  const dataRef = useRef<EditorProperties>({ ...initialData });
  const player = useRef<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sampler: any;
    noteIndex: number;
    shouldPlay: boolean | undefined;
  }>({
    // eslint-disable-next-line no-undefined
    sampler: undefined,
    noteIndex: 0,
    shouldPlay: store.get('fcc-sound') as boolean | undefined
  });
  const attemptRef = useRef<{ attempts: number }>({ attempts: 0 });

  // since editorDidMount runs once with the initial props object, it keeps a
  // reference to *those* props. If we want it to use the latest props, we can
  // use a ref, since it will be updated on every render.
  const testRef = useRef<Test[]>([]);
  testRef.current = props.tests;

  // TENATIVE PLAN: create a typical order [html/jsx, css, js], put the
  // available files into that order.  i.e. if it's just one file it will
  // automatically be first, but  if there's jsx and js (for some reason) it
  //  will be [jsx, js].

  const options: editor.IStandaloneEditorConstructionOptions = {
    fontSize: 18,
    scrollBeyondLastLine: true,
    selectionHighlight: false,
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    renderIndentGuides: false,
    minimap: {
      enabled: false
    },
    selectOnLineNumbers: true,
    wordWrap: 'on',
    scrollbar: {
      horizontal: 'hidden',
      vertical: 'visible',
      verticalHasArrows: false,
      useShadows: false,
      verticalScrollbarSize: 5
    },
    parameterHints: {
      enabled: false
    },
    tabSize: 2,
    dragAndDrop: true,
    lightbulb: {
      enabled: false
    },
    hover: {
      enabled: false
    },
    quickSuggestions: false,
    suggestOnTriggerCharacters: false
  };

  const getEditableRegionFromRedux = () => {
    const { challengeFiles, fileKey } = props;
    const edRegBounds = challengeFiles?.find(
      challengeFile => challengeFile.fileKey === fileKey
    )?.editableRegionBoundaries;
    return edRegBounds ? [...edRegBounds] : [];
  };

  const editorWillMount = (monaco: typeof monacoEditor) => {
    const { challengeFiles, fileKey, usesMultifileEditor } = props;

    monacoRef.current = monaco;
    defineMonacoThemes(monaco, { usesMultifileEditor });
    // If a model is not provided, then the editor 'owns' the model it creates
    // and will dispose of that model if it is replaced. Since we intend to
    // swap and reuse models, we have to create our own models to prevent
    // disposal.

    const challengeFile = challengeFiles?.find(
      challengeFile => challengeFile.fileKey === fileKey
    );
    const model =
      dataRef.current.model ||
      monaco.editor.createModel(
        challengeFile?.contents ?? '',
        modeMap[challengeFile?.ext ?? 'html']
      );
    dataRef.current.model = model;

    if (player.current.shouldPlay && !player.current.sampler) {
      void import('tone').then(tone => {
        player.current.sampler = new tone.Sampler(
          editorToneOptions
        ).toDestination();
      });
    }

    // TODO: do we need to return this?
    return { model };
  };

  // Updates the model if the contents has changed. This is only necessary for
  // changes coming from outside the editor (such as code resets).
  const resetEditorValues = () => {
    const { challengeFiles, fileKey } = props;
    const { model } = dataRef.current;

    const initialContents = challengeFiles?.find(
      challengeFile => challengeFile.fileKey === fileKey
    )?.contents;
    if (model?.getValue() !== initialContents) {
      model?.setValue(initialContents ?? '');
    }
  };

  const editorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor
  ) => {
    // TODO this should *probably* be set on focus
    editorRef.current = editor;
    dataRef.current.editor = editor;

    if (hasEditableRegion()) {
      initializeDescriptionAndOutputWidgets();
      addContentChangeListener();
      showEditableRegion(editor);
    }

    const storedAccessibilityMode = () => {
      const accessibility = store.get('accessibilityMode') as boolean;
      if (!accessibility) {
        store.set('accessibilityMode', false);
      }
      // Only able to set the arialabel when accessibility mode is set to true
      // Otherwise it gets overwritten by the monaco default aria-label
      if (accessibility) {
        editor.updateOptions({
          ariaLabel:
            'Accessibility mode set to true. Press Ctrl+e to disable or press Alt+F1 for more options'
        });
      }

      return accessibility;
    };

    const accessibilityMode = storedAccessibilityMode();
    editor.updateOptions({
      accessibilitySupport: accessibilityMode ? 'on' : 'auto'
    });
    // Users who are using screen readers should not have to move focus from
    // the editor to the description every time they open a challenge.
    if (props.canFocus && !accessibilityMode) {
      focusIfTargetEditor();
    } else focusOnHotkeys();
    // Removes keybind for intellisense
    // Private method - hopefully changes with future version
    // ref: https://github.com/microsoft/monaco-editor/issues/102
    /* eslint-disable */
    // @ts-ignore
    editor._standaloneKeybindingService.addDynamicKeybinding(
      '-editor.action.triggerSuggest',
      null,
      () => {}
    );
    const newLine = editor.getAction('editor.action.insertLineAfter');
    // @ts-ignore
    editor._standaloneKeybindingService.addDynamicKeybinding(
      '-editor.action.insertLineAfter',
      null,
      () => {}
    );
    // @ts-ignore
    editor._standaloneKeybindingService.addDynamicKeybinding(
      'editor.action.insertLineAfter',
      monaco.KeyMod.Alt | monaco.KeyCode.Enter,
      () => {
        newLine.run();
      }
    );
    /* eslint-enable */
    editor.addAction({
      id: 'execute-challenge',
      label: 'Run tests',
      /* eslint-disable no-bitwise */
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        if (props.usesMultifileEditor) {
          if (challengeIsComplete()) {
            tryToSubmitChallenge();
          } else {
            tryToExecuteChallenge();
          }
        } else {
          props.executeChallenge({ showCompletionModal: true });
        }
      }
    });
    editor.addAction({
      id: 'leave-editor',
      label: 'Leave editor',
      keybindings: [monaco.KeyCode.Escape],
      run: () => {
        focusOnHotkeys();
        props.setEditorFocusability(false);
      }
    });
    editor.addAction({
      id: 'save-editor-content',
      label: 'Save editor content',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
      run:
        props.challengeType === challengeTypes.multifileCertProject &&
        props.isSignedIn
          ? // save to database
            props.saveChallenge
          : // save to local storage
            props.saveEditorContent
    });
    editor.addAction({
      id: 'toggle-accessibility',
      label: 'Toggle Accessibility Mode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_E],
      run: () => {
        const currentAccessibility = storedAccessibilityMode();

        store.set('accessibilityMode', !currentAccessibility);

        editor.updateOptions({
          accessibilitySupport: storedAccessibilityMode() ? 'on' : 'auto'
        });
      }
    });
    // Introduced as a work around for a bug in JAWS 2022
    // https://github.com/FreedomScientific/VFO-standards-support/issues/598
    editor.addAction({
      id: 'toggle-aria-roledescription',
      label: 'Toggle aria-roledescription',
      keybindings: [
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KEY_R
      ],
      run: toggleAriaRoledescription
    });
    editor.onDidFocusEditorWidget(() => props.setEditorFocusability(true));

    // aria-roledescription is on (true) by default, check if it needs
    // to be removed.
    if (!getStoredAriaRoledescription()) {
      setAriaRoledescription(false);
    }
  };

  const toggleAriaRoledescription = () => {
    const newRoledescription = !getStoredAriaRoledescription();
    setAriaRoledescription(newRoledescription);
    ariaAlert(
      `aria-roledescription has been turned ${
        newRoledescription ? 'on' : 'off'
      }`
    );
  };

  const setAriaRoledescription = (value: boolean) => {
    const textareas = document.querySelectorAll('.monaco-editor textarea');
    textareas.forEach(textarea => {
      value
        ? textarea.setAttribute('aria-roledescription', 'editor')
        : textarea.removeAttribute('aria-roledescription');
    });
    store.set('ariaRoledescription', value);
  };

  const getStoredAriaRoledescription = () =>
    !!(store.get('ariaRoledescription') ?? true);

  // Borrowed from
  // freeCodeCamp/node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.js
  // Uses the aria live region provided by monaco.
  const ariaAlert = (message: string) => {
    const ariaLive: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.monaco-alert');
    if (ariaLive.length > 0) {
      const liveText = ariaLive[0];
      liveText.textContent = message;
      // Hack used by monaco to force older browsers to announce the update to
      // the live region.
      // See https://www.tpgi.com/html5-accessibility-chops-aria-rolealert-browser-support/
      liveText.style.visibility = 'hidden';
      liveText.style.visibility = 'visible';
    }
  };

  const descriptionZoneCallback = (
    changeAccessor: editor.IViewZoneChangeAccessor
  ) => {
    const editor = dataRef.current.editor;
    if (!editor) return;
    const domNode = createDescription(editor);

    // make sure the overlayWidget has resized before using it to set the height

    domNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the content widget (i.e. trigger it via onDomNodeTop). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: getLineBeforeEditableRegion(),
      heightInPx: domNode.offsetHeight,
      domNode: document.createElement('div'),
      // This is called when the editor dimensions change and AFTER the
      // text in the editor has shifted.
      onDomNodeTop: () => {
        // The return value for getTopLineNumber includes the height of
        // the content widget so we need to remove it.
        dataRef.current.descriptionZoneTop =
          editor.getTopForLineNumber(getLineBeforeEditableRegion() + 1) -
          domNode.offsetHeight;
        dataRef.current.descriptionWidget &&
          editor.layoutContentWidget(dataRef.current.descriptionWidget);
      }
    };

    dataRef.current.descriptionZoneId = changeAccessor.addZone(viewZone);
  };

  function tryToExecuteChallenge() {
    props.executeChallenge();
    attemptRef.current.attempts++;
  }

  const tryToSubmitChallenge = debounce(props.submitChallenge, 2000);

  function createLowerJaw(outputNode: HTMLElement, callback?: () => void) {
    const { output } = props;
    const isChallengeComplete = challengeIsComplete();
    const isEditorInFocus = document.activeElement?.tagName === 'TEXTAREA';
    ReactDOM.render(
      <LowerJaw
        openHelpModal={props.openHelpModal}
        tryToExecuteChallenge={tryToExecuteChallenge}
        hint={output[1]}
        testsLength={props.tests.length}
        attemptsNumber={attemptRef.current.attempts}
        challengeIsCompleted={isChallengeComplete}
        challengeHasErrors={challengeHasErrors()}
        tryToSubmitChallenge={tryToSubmitChallenge}
        isEditorInFocus={isEditorInFocus}
      />,
      outputNode,
      callback
    );
  }

  const updateOutputZone = () => {
    const editor = dataRef.current.editor;
    if (!editor || !dataRef.current.outputNode) return;

    const outputNode = dataRef.current.outputNode;
    createLowerJaw(outputNode, () => {
      if (dataRef.current.outputNode) {
        updateOutputViewZone(outputNode, editor);
      }
    });
  };

  const updateOutputViewZone = (
    outputNode: HTMLDivElement,
    editor: editor.IStandaloneCodeEditor
  ) => {
    // make sure the overlayWidget has resized before using it to set the height
    outputNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;
    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    editor?.changeViewZones(changeAccessor => {
      changeAccessor.removeZone(dataRef.current.outputZoneId);
      const viewZone = {
        afterLineNumber: getLastLineOfEditableRegion(),
        heightInPx: outputNode.offsetHeight,
        domNode: document.createElement('div'),
        onComputedHeight: () =>
          dataRef.current.outputWidget &&
          editor.layoutOverlayWidget(dataRef.current.outputWidget),
        onDomNodeTop: (top: number) => {
          dataRef.current.outputZoneTop = top;
          if (dataRef.current.outputWidget)
            editor.layoutOverlayWidget(dataRef.current.outputWidget);
        }
      };
      dataRef.current.outputZoneId = changeAccessor.addZone(viewZone);
    });
  };

  function createDescription(editor: editor.IStandaloneCodeEditor) {
    if (dataRef.current.descriptionNode) return dataRef.current.descriptionNode;
    const { description, title, isChallengeCompleted } = props;
    const jawHeading = isChallengeCompleted
      ? document.createElement('div')
      : document.createElement('h1');
    if (isChallengeCompleted) {
      jawHeading.classList.add('challenge-description-header');
      const challengeTitle = document.createElement('h1');
      challengeTitle.innerHTML = `${title} <span class='sr-only'>${t(
        'icons.passed'
      )}</span>`;
      jawHeading.appendChild(challengeTitle);
      const checkmark = ReactDOMServer.renderToStaticMarkup(
        <GreenPass
          hushScreenReaderText
          style={{
            height: '15px',
            width: '15px',
            marginLeft: '7px'
          }}
        />
      );
      const completedChallengeHeader = document.createElement('div');
      completedChallengeHeader.innerHTML = checkmark;
      jawHeading.appendChild(completedChallengeHeader);
    } else {
      jawHeading.innerText = title;
    }
    const domNode = document.createElement('div');
    const desc = document.createElement('div');
    const descContainer = document.createElement('div');
    descContainer.classList.add('description-container');
    domNode.classList.add('editor-upper-jaw');
    domNode.appendChild(descContainer);
    descContainer.appendChild(jawHeading);
    descContainer.appendChild(desc);
    desc.innerHTML = description;
    highlightAllUnder(desc);

    domNode.style.userSelect = 'text';

    domNode.style.left = `${editor.getLayoutInfo().contentLeft}px`;
    domNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;

    domNode.style.top = getDescriptionZoneTop();
    dataRef.current.descriptionNode = domNode;
    return domNode;
  }

  function createOutputNode(editor: editor.IStandaloneCodeEditor) {
    if (dataRef.current.outputNode) return dataRef.current.outputNode;
    const outputNode = document.createElement('div');
    outputNode.classList.add('editor-lower-jaw');
    outputNode.setAttribute('id', 'editor-lower-jaw');
    outputNode.style.left = `${editor.getLayoutInfo().contentLeft}px`;
    outputNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;
    outputNode.style.top = getOutputZoneTop();
    dataRef.current.outputNode = outputNode;
    return outputNode;
  }

  function resetMarginDecorations() {
    const { model, insideEditDecId } = dataRef.current;
    const range = model?.getDecorationRange(insideEditDecId);
    if (range) {
      updateEditableRegion(range, { model });
    }
  }

  function focusOnHotkeys() {
    const currContainerRef = props.containerRef.current;
    if (currContainerRef) {
      currContainerRef.focus();
    }
  }

  const onChange = (editorValue: string) => {
    const { updateFile, fileKey } = props;
    // TODO: now that we have getCurrentEditableRegion, should the overlays
    // follow that directly? We could subscribe to changes to that and redraw if
    // those imply that the positions have changed (i.e. if the content height
    // has changed or if content is dragged between regions)

    const coveringRange = getLinesCoveringEditableRegion();
    const editableRegionBoundaries =
      (coveringRange && [
        coveringRange.startLineNumber - 1,
        coveringRange.endLineNumber + 1
      ]) ??
      undefined;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (player.current.sampler?.loaded && player.current.shouldPlay) {
      void import('tone').then(tone => {
        if (tone.context.state !== 'running') void tone.context.resume();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        player.current.sampler?.triggerAttack(
          editorNotes[player.current.noteIndex]
        );
        player.current.noteIndex++;
        if (player.current.noteIndex >= editorNotes.length) {
          player.current.noteIndex = 0;
        }
      });
    }
    updateFile({ fileKey, editorValue, editableRegionBoundaries });
  };

  // TODO: DRY this and the update function
  function initializeEditableRegion(
    range: IRange,
    modelContext: {
      monaco: typeof monacoEditor;
      model: editor.ITextModel;
    }
  ) {
    const { monaco, model } = modelContext;
    const lineDecoration = {
      range,
      options: {
        isWholeLine: true,
        className: 'editable-region',
        linesDecorationsClassName: 'myEditableLineDecoration',
        stickiness:
          monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges
      }
    };
    return model.deltaDecorations([], [lineDecoration]);
  }

  function updateEditableRegion(
    range: IRange,
    modelContext: {
      model?: editor.ITextModel;
    },
    options: editor.IModelDecorationOptions = {}
  ) {
    const { model } = modelContext;
    const { insideEditDecId } = dataRef.current;

    const oldOptions = model?.getDecorationOptions(insideEditDecId);
    const lineDecoration = {
      range,
      options: {
        ...oldOptions,
        ...options
      }
    };
    model?.deltaDecorations([insideEditDecId], [lineDecoration]);
  }

  function getDescriptionZoneTop() {
    return `${dataRef.current.descriptionZoneTop}px`;
  }

  function getOutputZoneTop() {
    return `${dataRef.current.outputZoneTop}px`;
  }

  function getLineBeforeEditableRegion() {
    const range = dataRef.current.model?.getDecorationRange(
      dataRef.current.insideEditDecId
    );
    return range ? range.startLineNumber - 1 : 1;
  }

  function getLastLineOfEditableRegion() {
    const range = dataRef.current.model?.getDecorationRange(
      dataRef.current.insideEditDecId
    );
    return range ? range.endLineNumber : 1;
  }

  // This Range covers all the text in the editable region,
  const getLinesCoveringEditableRegion = () => {
    const monaco = monacoRef.current;
    const { model, insideEditDecId } = dataRef.current;
    // TODO: this is a little low-level, but we should bail if there is no
    // editable region defined.
    if (!insideEditDecId || !model || !monaco) {
      return null;
    } else {
      const currentRange = model.getDecorationRange(insideEditDecId);

      if (currentRange) {
        return new monaco.Range(
          currentRange.startLineNumber,
          1,
          currentRange.endLineNumber,
          model.getLineLength(currentRange.endLineNumber) + 1
        );
      }
      return null;
    }
  };

  function initializeDescriptionAndOutputWidgets() {
    const editor = dataRef.current.editor;
    if (editor) {
      initializeRegions(getEditableRegionFromRedux());
      addWidgetsToRegions(editor);
    }
  }

  // Currently, only practice project parts have editable region markers
  // This function is used to enable multiple editor tabs, jaws, etc.
  function hasEditableRegion() {
    const editableRegionBoundaries = getEditableRegionFromRedux();
    return editableRegionBoundaries.length === 2;
  }

  function focusIfTargetEditor() {
    const { editor } = dataRef.current;
    const { canFocusOnMountRef } = props;
    if (!editor || !canFocusOnMountRef.current) return;
    if (!props.usesMultifileEditor) {
      // Only one editor? Focus it.
      editor.focus();
      canFocusOnMountRef.current = false;
    } else if (hasEditableRegion()) {
      editor.focus();
      canFocusOnMountRef.current = false;
    }
  }

  function initializeRegions(editableRegion: number[]) {
    const { model, editor } = dataRef.current;
    const monaco = monacoRef.current;
    if (!model || !monaco || !editor) return;

    const editableRange = positionsToRange(monaco, model, [
      editableRegion[0] + 1,
      editableRegion[1] - 1
    ]);

    dataRef.current.insideEditDecId = initializeEditableRegion(editableRange, {
      monaco,
      model
    })[0];
  }

  function addWidgetsToRegions(editor: editor.IStandaloneCodeEditor) {
    const createWidget = (
      id: string,
      domNode: HTMLDivElement,
      getTop: () => string
    ) => {
      const getId = () => id;
      const getDomNode = () => domNode;
      const getPosition = () => {
        domNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;
        domNode.style.top = getTop();

        // must return null, so that Monaco knows the widget will position
        // itself.
        return null;
      };
      // Only the description content widget uses this method but it
      // is harmless to pass it to the overlay widget.
      const afterRender = () => {
        domNode.style.left = '0';
        domNode.style.visibility = 'visible';
      };
      return {
        getId,
        getDomNode,
        getPosition,
        afterRender
      };
    };

    const descriptionNode = createDescription(editor);

    const outputNode = createOutputNode(editor);

    if (!dataRef.current.descriptionWidget) {
      dataRef.current.descriptionWidget = createWidget(
        'description.widget',
        descriptionNode,
        getDescriptionZoneTop
      );
      // this order (add widget, change zone) is necessary, since the zone
      // relies on the domnode being in the DOM to calculate its height - that
      // doesn't happen until the widget is added.
      editor.addContentWidget(dataRef.current.descriptionWidget);
      editor.changeViewZones(descriptionZoneCallback);
      // Now that the description zone is in place, the browser knows its height
      // and we can use that to calculate the top of the output zone.  If we do
      // not do this the output zone will be on top of the description zone,
      // initially.
      dataRef.current.outputZoneTop = editor.getTopForLineNumber(
        getLastLineOfEditableRegion() + 1
      );
    }
    if (!dataRef.current.outputWidget) {
      dataRef.current.outputWidget = createWidget(
        'output.widget',
        outputNode,
        getOutputZoneTop
      );
      editor.addOverlayWidget(dataRef.current.outputWidget);
      editor.changeViewZones(updateOutputZone);
    }

    editor.onDidScrollChange(() => {
      if (dataRef.current.descriptionWidget)
        editor.layoutContentWidget(dataRef.current.descriptionWidget);
      if (dataRef.current.outputWidget)
        editor.layoutOverlayWidget(dataRef.current.outputWidget);
    });
  }

  function addContentChangeListener() {
    const { model } = dataRef.current;
    const monaco = monacoRef.current;
    if (!monaco) return;

    model?.onDidChangeContent(() => {
      const redecorateEditableRegion = () => {
        const coveringRange = getLinesCoveringEditableRegion();
        if (coveringRange) {
          updateEditableRegion(coveringRange, { model });
        }
      };

      // If the content has changed, the zones may need moving. Rather than
      // working out if they have to for a particular content change, we simply
      // ask monaco to update regardless.
      redecorateEditableRegion();
      updateDescriptionZone();
      updateOutputZone();
    });
  }

  function showEditableRegion(editor: editor.IStandaloneCodeEditor) {
    const editableRegionBoundaries = getEditableRegionFromRedux();
    // TODO: The heuristic has been commented out for now because the cursor
    // position is not saved at the moment, so it's redundant. I'm leaving it
    // here for now, in case we decide to save it in future.
    // this is a heuristic: if the cursor is at the start of the page, chances
    // are the user has not edited yet. If so, move to the start of the editable
    // region.
    // if (
    //  isEqual({ ..._editor.getPosition() }, { lineNumber: 1, column: 1 })
    // ) {
    const [top, bottom] = editableRegionBoundaries;
    editor.setPosition({
      lineNumber: top + 1,
      column: 1
    });

    // To prevent descriptionWidget from being out of view
    editor.revealLinesInCenter(top, top === 0 ? 1 : bottom);
    // }
  }

  // creates a range covering all the lines in 'positions'
  // NOTE: positions is an array of [startLine, endLine]
  function positionsToRange(
    monaco: typeof monacoEditor,
    model: editor.ITextModel,
    [start, end]: [number, number]
  ) {
    // convert to [startLine, startColumn, endLine, endColumn]
    const range = new monaco.Range(start, 1, end, 1);

    // Protect against ranges that extend outside the editor
    const startLineNumber = Math.max(1, range.startLineNumber);
    const endLineNumber = Math.min(model.getLineCount(), range.endLineNumber);
    const endColumnText = model.getLineContent(endLineNumber);
    // NOTE: the end column is incremented by 2 so that the dangerous range
    // extends far enough to capture new text added to the end.
    // NOTE: according to the spec, it should only need to be +1, but in
    // practice that's not enough.
    return range
      .setStartPosition(startLineNumber, 1)
      .setEndPosition(range.endLineNumber, endColumnText.length + 2);
  }

  function challengeIsComplete() {
    const tests = testRef.current;
    return tests.every(test => test.pass && !test.err);
  }

  function challengeHasErrors() {
    const tests = testRef.current;
    return tests.some(test => test.err);
  }

  function resetAttampts() {
    attemptRef.current.attempts = 0;
  }

  // runs every update to the editor and when the challenge is reset
  useEffect(() => {
    // If a challenge is reset, it needs to communicate that change to the
    // editor.
    const { editor } = dataRef.current;

    if (props.isResetting) {
      // NOTE: this looks a lot like a race condition, since stopResetting gets
      // called in each editor and changes isResetting. However, all open editor
      // are rendered in a batch (before stopResetting talks to redux), so they
      // all get to this point. Also stopResetting is idempotent, so it doesn't
      // matter that each editor calls it.
      props.stopResetting();
      resetEditorValues();
      focusIfTargetEditor();
    }

    if (props.initialTests) initTests(props.initialTests);

    if (hasEditableRegion() && editor) {
      if (props.isResetting) {
        initializeDescriptionAndOutputWidgets();
        updateDescriptionZone();
        showEditableRegion(editor);
        resetAttampts();
        resetMarginDecorations();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.challengeFiles, props.isResetting]);

  useEffect(() => {
    const { showProjectPreview, previewOpen } = props;
    if (!previewOpen && showProjectPreview) {
      const description = document.getElementsByClassName(
        'description-container'
      )?.[0];
      description?.classList.add('description-highlighter');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.previewOpen]);

  useEffect(() => {
    const { model, insideEditDecId } = dataRef.current;
    const lowerJawElement = dataRef.current.outputNode;
    const isChallengeComplete = challengeIsComplete();
    const range = model?.getDecorationRange(insideEditDecId);
    if (range && isChallengeComplete) {
      updateEditableRegion(
        range,
        { model },
        {
          linesDecorationsClassName: 'myEditableLineDecoration tests-passed'
        }
      );
    }
    dataRef.current.outputNode = lowerJawElement;
    updateOutputZone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tests]);

  useEffect(() => {
    const editor = dataRef.current.editor;
    editor?.layout();
    if (hasEditableRegion()) {
      updateDescriptionZone();
      updateOutputZone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dimensions]);

  function updateDescriptionZone() {
    const editor = dataRef.current.editor;
    editor?.changeViewZones(changeAccessor => {
      changeAccessor.removeZone(dataRef.current.descriptionZoneId);
      descriptionZoneCallback(changeAccessor);
    });
  }

  const { theme } = props;
  const editorTheme = theme === Themes.Night ? 'vs-dark-custom' : 'vs-custom';
  return (
    <Suspense fallback={<Loader timeout={600} />}>
      <span className='notranslate'>
        <MonacoEditor
          editorDidMount={editorDidMount}
          editorWillMount={editorWillMount}
          onChange={onChange}
          options={{ ...options, folding: !hasEditableRegion() }}
          theme={editorTheme}
        />
      </span>
    </Suspense>
  );
};

Editor.displayName = 'Editor';

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
