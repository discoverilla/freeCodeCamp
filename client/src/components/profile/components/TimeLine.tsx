/* eslint-disable @typescript-eslint/unbound-method */
import {
  Button,
  Modal,
  Table,
  DropdownButton,
  MenuItem
} from '@freecodecamp/react-bootstrap';
import Loadable from '@loadable/component';
import { useStaticQuery, graphql } from 'gatsby';
import { reverse, sortBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { TFunction, withTranslation } from 'react-i18next';

import envData from '../../../../../config/env.json';
import { langCodes } from '../../../../../config/i18n/all-langs';
import {
  getCertIds,
  getPathFromID,
  getTitleFromId
} from '../../../../../utils';
import CertificationIcon from '../../../assets/icons/certification-icon';
import { ChallengeFiles } from '../../../redux/prop-types';
import { maybeUrlRE } from '../../../utils';
import { FullWidthRow, Link } from '../../helpers';
import TimelinePagination from './TimelinePagination';

import './timeline.css';

const SolutionViewer = Loadable(
  () => import('../../SolutionViewer/SolutionViewer')
);

const { clientLocale } = envData as { clientLocale: keyof typeof langCodes };
const localeCode = langCodes[clientLocale];

// Items per page in timeline.
const ITEMS_PER_PAGE = 15;

interface CompletedMap {
  id: string;
  completedDate: number;
  challengeType: number;
  solution: string;
  challengeFiles: ChallengeFiles;
  githubLink: string;
}

interface TimelineProps {
  completedMap: CompletedMap[];
  t: TFunction;
  username: string;
}

interface SortedTimeline {
  id: string;
  completedDate: number;
  challengeFiles: ChallengeFiles;
  githubLink: string;
  solution: string;
}

interface TimelineInnerProps extends TimelineProps {
  idToNameMap: Map<string, string>;
  sortedTimeline: SortedTimeline[];
  totalPages: number;
}

function TimelineInner({
  idToNameMap,
  sortedTimeline,
  totalPages,

  completedMap,
  t,
  username
}: TimelineInnerProps) {
  const [solutionToView, setSolutionToView] = useState<string | null>(null);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [solution, setSolution] = useState<string | null>(null);
  const [challengeFiles, setChallengeFiles] = useState<ChallengeFiles>(null);

  function viewSolution(
    id: string,
    solution_: string,
    challengeFiles_: ChallengeFiles
  ): void {
    setSolutionToView(id);
    setSolutionOpen(true);
    setSolution(solution_);
    setChallengeFiles(challengeFiles_);
  }

  function closeSolution(): void {
    setSolutionToView(null);
    setSolutionOpen(false);
    setSolution(null);
    setChallengeFiles(null);
  }

  function firstPage(): void {
    setPageNo(1);
  }
  function nextPage(): void {
    setPageNo(prev => prev + 1);
  }
  function prevPage(): void {
    setPageNo(prev => prev - 1);
  }
  function lastPage(): void {
    setPageNo(totalPages);
  }

  function renderViewButton(
    id: string,
    challengeFiles: ChallengeFiles,
    githubLink: string,
    solution: string
  ): React.ReactNode {
    if (challengeFiles?.length) {
      return (
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          id={`btn-for-${id}`}
          onClick={() => viewSolution(id, solution, challengeFiles)}
        >
          {t('buttons.show-code')}
        </Button>
      );
    } else if (githubLink) {
      return (
        <div className='solutions-dropdown'>
          <DropdownButton
            block={true}
            bsStyle='primary'
            className='btn-invert'
            id={`dropdown-for-${id}`}
            title='View'
          >
            <MenuItem
              bsStyle='primary'
              href={solution}
              rel='noopener noreferrer'
              target='_blank'
            >
              {t('buttons.frontend')}
            </MenuItem>
            <MenuItem
              bsStyle='primary'
              href={githubLink}
              rel='noopener noreferrer'
              target='_blank'
            >
              {t('buttons.backend')}
            </MenuItem>
          </DropdownButton>
        </div>
      );
    } else if (maybeUrlRE.test(solution)) {
      return (
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          href={solution}
          id={`btn-for-${id}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('buttons.view')}
        </Button>
      );
    } else {
      return null;
    }
  }

  function renderCompletion(completed: SortedTimeline): JSX.Element {
    const { id, challengeFiles, githubLink, solution } = completed;
    const completedDate = new Date(completed.completedDate);
    // @ts-expect-error idToNameMap is not a <string, string> Map...
    const { challengeTitle, challengePath, certPath } = idToNameMap.get(id);
    return (
      <tr className='timeline-row' key={id}>
        <td>
          {certPath ? (
            <Link
              className='timeline-cert-link'
              to={`/certification/${username}/${certPath as string}`}
            >
              {challengeTitle}
              <CertificationIcon />
            </Link>
          ) : (
            <Link to={challengePath as string}>{challengeTitle}</Link>
          )}
        </td>
        <td>{renderViewButton(id, challengeFiles, githubLink, solution)}</td>
        <td className='text-center'>
          <time dateTime={completedDate.toISOString()}>
            {completedDate.toLocaleString([localeCode, 'en-US'], {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </td>
      </tr>
    );
  }

  const id = solutionToView;
  const startIndex = (pageNo - 1) * ITEMS_PER_PAGE;
  const endIndex = pageNo * ITEMS_PER_PAGE;

  return (
    <FullWidthRow>
      <h2 className='text-center'>{t('profile.timeline')}</h2>
      {completedMap.length === 0 ? (
        <p className='text-center'>
          {t('profile.none-completed')}&nbsp;
          <Link to='/learn'>{t('profile.get-started')}</Link>
        </p>
      ) : (
        <Table condensed={true} striped={true}>
          <thead>
            <tr>
              <th>{t('profile.challenge')}</th>
              <th>{t('settings.labels.solution')}</th>
              <th className='text-center'>{t('profile.completed')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedTimeline.slice(startIndex, endIndex).map(renderCompletion)}
          </tbody>
        </Table>
      )}
      {id && (
        <Modal
          aria-labelledby='contained-modal-title'
          onHide={closeSolution}
          show={solutionOpen}
        >
          <Modal.Header closeButton={true}>
            <Modal.Title id='contained-modal-title'>
              {`${username}'s Solution to ${
                // @ts-expect-error Need better TypeDef for this
                idToNameMap.get(id).challengeTitle as string
              }`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SolutionViewer
              challengeFiles={challengeFiles}
              solution={solution ?? ''}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeSolution}>{t('buttons.close')}</Button>
          </Modal.Footer>
        </Modal>
      )}
      {totalPages > 1 && (
        <TimelinePagination
          firstPage={firstPage}
          lastPage={lastPage}
          nextPage={nextPage}
          pageNo={pageNo}
          prevPage={prevPage}
          totalPages={totalPages}
        />
      )}
    </FullWidthRow>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call*/
function useIdToNameMap(): Map<string, string> {
  const {
    allChallengeNode: { edges }
  } = useStaticQuery(graphql`
    query challengeNodes {
      allChallengeNode {
        edges {
          node {
            fields {
              slug
            }
            id
            title
          }
        }
      }
    }
  `);
  const idToNameMap = new Map();
  for (const id of getCertIds()) {
    idToNameMap.set(id, {
      challengeTitle: `${getTitleFromId(id)} Certification`,
      certPath: getPathFromID(id)
    });
  }
  edges.forEach(
    ({
      node: {
        // @ts-expect-error Graphql needs typing
        id,
        // @ts-expect-error Graphql needs typing
        title,
        // @ts-expect-error Graphql needs typing
        fields: { slug }
      }
    }) => {
      idToNameMap.set(id, { challengeTitle: title, challengePath: slug });
    }
  );
  return idToNameMap;
  /* eslint-enable */
}

const Timeline = (props: TimelineProps): JSX.Element => {
  const idToNameMap = useIdToNameMap();
  const { completedMap } = props;
  // Get the sorted timeline along with total page count.
  const { sortedTimeline, totalPages } = useMemo(() => {
    const sortedTimeline = reverse(
      sortBy(completedMap, ['completedDate']).filter(challenge => {
        return idToNameMap.has(challenge.id);
      })
    );
    const totalPages = Math.ceil(sortedTimeline.length / ITEMS_PER_PAGE);
    return { sortedTimeline, totalPages };
  }, [completedMap, idToNameMap]);
  return (
    <TimelineInner
      idToNameMap={idToNameMap}
      sortedTimeline={sortedTimeline}
      totalPages={totalPages}
      {...props}
    />
  );
};

Timeline.displayName = 'Timeline';

export default withTranslation()(Timeline);
