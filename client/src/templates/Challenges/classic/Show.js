import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { first } from 'lodash';
import Media from 'react-media';

import LearnLayout from '../../../components/layouts/Learn';
import Editor from './Editor';
import Preview from '../components/Preview';
import SidePanel from '../components/Side-Panel';
import Output from '../components/Output';
import CompletionModal from '../components/CompletionModal';
import HelpModal from '../components/HelpModal';
import VideoModal from '../components/VideoModal';
import ResetModal from '../components/ResetModal';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';
import ToolPanel from '../components/Tool-Panel';

import { randomCompliment } from '../utils/get-words';
import { createGuideUrl } from '../utils';
import { challengeTypes } from '../../../../utils/challengeTypes';
import { ChallengeNode } from '../../../redux/propTypes';
import { dasherize } from '../../../../utils';
import {
  createFiles,
  challengeFilesSelector,
  challengeTestsSelector,
  initTests,
  updateChallengeMeta,
  challengeMounted,
  updateSuccessMessage,
  consoleOutputSelector
} from '../redux';

import './classic.css';
import '../components/test-frame.css';

const mapStateToProps = createStructuredSelector({
  files: challengeFilesSelector,
  tests: challengeTestsSelector,
  output: consoleOutputSelector
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createFiles,
      initTests,
      updateChallengeMeta,
      challengeMounted,
      updateSuccessMessage
    },
    dispatch
  );

const propTypes = {
  challengeMounted: PropTypes.func.isRequired,
  createFiles: PropTypes.func.isRequired,
  data: PropTypes.shape({
    challengeNode: ChallengeNode
  }),
  files: PropTypes.shape({
    key: PropTypes.string
  }),
  initTests: PropTypes.func.isRequired,
  output: PropTypes.string,
  pageContext: PropTypes.shape({
    challengeMeta: PropTypes.shape({
      nextChallengePath: PropTypes.string
    })
  }),
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      testString: PropTypes.string
    })
  ),
  updateChallengeMeta: PropTypes.func.isRequired,
  updateSuccessMessage: PropTypes.func.isRequired
};

const MAX_MOBILE_WIDTH = 767;

class ShowClassic extends Component {
  constructor() {
    super();

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this)
    };

    this.state = {
      resizing: false
    };
  }
  onResize() {
    this.setState({ resizing: true });
  }

  onStopResize() {
    this.setState({ resizing: false });
  }

  componentDidMount() {
    const {
      challengeMounted,
      createFiles,
      initTests,
      updateChallengeMeta,
      updateSuccessMessage,
      data: {
        challengeNode: {
          files,
          title,
          fields: { tests },
          challengeType
        }
      },
      pageContext: { challengeMeta }
    } = this.props;
    createFiles(files);
    initTests(tests);
    updateChallengeMeta({ ...challengeMeta, title, challengeType });
    updateSuccessMessage(randomCompliment());
    challengeMounted(challengeMeta.id);
  }

  componentDidUpdate(prevProps) {
    const {
      data: {
        challengeNode: { title: prevTitle }
      }
    } = prevProps;
    const {
      challengeMounted,
      createFiles,
      initTests,
      updateChallengeMeta,
      updateSuccessMessage,
      data: {
        challengeNode: {
          files,
          title: currentTitle,
          fields: { tests },
          challengeType
        }
      },
      pageContext: { challengeMeta }
    } = this.props;
    if (prevTitle !== currentTitle) {
      updateSuccessMessage(randomCompliment());
      createFiles(files);
      initTests(tests);
      updateChallengeMeta({
        ...challengeMeta,
        title: currentTitle,
        challengeType
      });
      challengeMounted(challengeMeta.id);
    }
  }

  componentWillUnmount() {
    const { createFiles } = this.props;
    createFiles({});
  }

  getChallenge = () => this.props.data.challengeNode;

  getBlockNameTitle() {
    const {
      fields: { blockName },
      title
    } = this.getChallenge();
    return `${blockName}: ${title}`;
  }

  getGuideUrl() {
    const {
      fields: { slug }
    } = this.getChallenge();
    return createGuideUrl(slug);
  }

  getVideoUrl = () => this.getChallenge().videoUrl;

  getChallengeFile() {
    const { files } = this.props;
    return first(Object.keys(files).map(key => files[key]));
  }

  hasPreview() {
    const { challengeType } = this.getChallenge();
    return (
      challengeType === challengeTypes.html ||
      challengeType === challengeTypes.modern
    );
  }

  renderInstructionsPanel({ showToolPanel }) {
    const {
      fields: { blockName },
      description,
      instructions
    } = this.getChallenge();

    return (
      <SidePanel
        className='full-height'
        description={description}
        guideUrl={this.getGuideUrl()}
        instructions={instructions}
        section={dasherize(blockName)}
        showToolPanel={showToolPanel}
        title={this.getBlockNameTitle()}
        videoUrl={this.getVideoUrl()}
      />
    );
  }

  renderEditor() {
    const { files } = this.props;
    const challengeFile = first(Object.keys(files).map(key => files[key]));
    return (
      challengeFile && <Editor {...challengeFile} fileKey={challengeFile.key} />
    );
  }

  renderTestOutput() {
    const { output } = this.props;
    return (
      <Output
        defaultOutput={`
/**
* Your test output will go here.
*/
`}
        output={output}
      />
    );
  }

  renderPreview() {
    return (
      <Preview className='full-height' disableIframe={this.state.resizing} />
    );
  }

  renderToolPanel(isMobile) {
    return (
      <ToolPanel
        className='classic-tool-panel'
        guideUrl={this.getGuideUrl()}
        isMobile={isMobile}
        videoUrl={this.getVideoUrl()}
      />
    );
  }

  render() {
    return (
      <LearnLayout>
        <Helmet
          title={`Learn ${this.getBlockNameTitle()} | freeCodeCamp.org`}
        />
        <Media defaultMatches={false} query={{ maxWidth: MAX_MOBILE_WIDTH }}>
          {matches =>
            matches ? (
              <MobileLayout
                editor={this.renderEditor()}
                hasPreview={this.hasPreview()}
                instructions={this.renderInstructionsPanel({
                  showToolPanel: false
                })}
                preview={this.renderPreview()}
                testOutput={this.renderTestOutput()}
                toolPanel={this.renderToolPanel(true)}
              />
            ) : (
              <DesktopLayout
                challengeFile={this.getChallengeFile()}
                editor={this.renderEditor()}
                hasPreview={this.hasPreview()}
                instructions={this.renderInstructionsPanel({
                  showToolPanel: false
                })}
                preview={this.renderPreview()}
                resizeProps={this.resizeProps}
                testOutput={this.renderTestOutput()}
                toolPanel={this.renderToolPanel(false)}
              />
            )
          }
        </Media>
        <CompletionModal />
        <HelpModal />
        <VideoModal videoUrl={this.getVideoUrl()} />
        <ResetModal />
      </LearnLayout>
    );
  }
}

ShowClassic.displayName = 'ShowClassic';
ShowClassic.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowClassic);

export const query = graphql`
  query ClassicChallenge($slug: String!) {
    challengeNode(fields: { slug: { eq: $slug } }) {
      title
      description
      instructions
      challengeType
      videoUrl
      fields {
        slug
        blockName
        tests {
          text
          testString
        }
      }
      required {
        link
        src
      }
      files {
        indexhtml {
          key
          ext
          name
          contents
          head
          tail
        }
        indexjs {
          key
          ext
          name
          contents
          head
          tail
        }
        indexjsx {
          key
          ext
          name
          contents
          head
          tail
        }
      }
    }
  }
`;
