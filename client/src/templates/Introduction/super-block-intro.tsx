import { Grid, Row, Col } from '@freecodecamp/react-bootstrap';
import { WindowLocation } from '@reach/router';
import { graphql } from 'gatsby';
import { uniq } from 'lodash-es';
import React, { Fragment, useEffect, memo } from 'react';
import Helmet from 'react-helmet';
import { TFunction, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { configureAnchors } from 'react-scrollable-anchor';
import { bindActionCreators, Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { SuperBlocks } from '../../../../config/certification-settings';
import DonateModal from '../../components/Donation/donation-modal';
import Login from '../../components/Header/components/Login';
import Map from '../../components/Map';
import { Spacer } from '../../components/helpers';
import WebhookToken from '../../components/settings/webhook-token';
import {
  currentChallengeIdSelector,
  userFetchStateSelector,
  signInLoadingSelector,
  isSignedInSelector,
  tryToShowDonationModal,
  userSelector
} from '../../redux';
import { MarkdownRemark, AllChallengeNode, User } from '../../redux/prop-types';
import Block from './components/block';
import CertChallenge from './components/cert-challenge';
import LegacyLinks from './components/legacy-links';
import SuperBlockIntro from './components/super-block-intro';
import { resetExpansion, toggleBlock } from './redux';

import './intro.css';

type FetchState = {
  pending: boolean;
  complete: boolean;
  errored: boolean;
};

type SuperBlockProp = {
  currentChallengeId: string;
  data: {
    markdownRemark: MarkdownRemark;
    allChallengeNode: AllChallengeNode;
  };
  expandedState: {
    [key: string]: boolean;
  };
  fetchState: FetchState;
  isSignedIn: boolean;
  signInLoading: boolean;
  location: WindowLocation<{ breadcrumbBlockClick: string }>;
  resetExpansion: () => void;
  t: TFunction;
  toggleBlock: (arg0: string) => void;
  tryToShowDonationModal: () => void;
  user: User;
};

configureAnchors({ offset: -40, scrollDuration: 0 });

const mapStateToProps = (state: Record<string, unknown>) => {
  return createSelector(
    currentChallengeIdSelector,
    isSignedInSelector,
    signInLoadingSelector,
    userFetchStateSelector,
    userSelector,
    (
      currentChallengeId: string,
      isSignedIn,
      signInLoading: boolean,
      fetchState: FetchState,
      user: User
    ) => ({
      currentChallengeId,
      isSignedIn,
      signInLoading,
      fetchState,
      user
    })
  )(state);
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      tryToShowDonationModal,
      resetExpansion,
      toggleBlock: b => toggleBlock(b)
    },
    dispatch
  );

const SuperBlockIntroductionPage = (props: SuperBlockProp) => {
  useEffect(() => {
    initializeExpandedState();
    props.tryToShowDonationModal();

    setTimeout(() => {
      configureAnchors({ offset: -40, scrollDuration: 400 });
    }, 0);

    return () => {
      configureAnchors({ offset: -40, scrollDuration: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChosenBlock = (): string => {
    const {
      data: {
        allChallengeNode: { edges }
      },
      isSignedIn,
      currentChallengeId,
      location
    }: SuperBlockProp = props;

    // if coming from breadcrumb click
    if (
      location.state &&
      typeof location.state === 'object' &&
      Object.prototype.hasOwnProperty.call(
        location.state,
        'breadcrumbBlockClick'
      )
    ) {
      return location.state.breadcrumbBlockClick;
    }

    // if the URL includes a hash
    if (location.hash) {
      const dashedBlock = location.hash.replace('#', '').replace('/', '');
      return dashedBlock;
    }

    const edge = edges[0];

    if (isSignedIn) {
      // see if currentChallenge is in this superBlock
      const currentChallengeEdge = edges.find(
        edge => edge.node.challenge.id === currentChallengeId
      );

      return currentChallengeEdge
        ? currentChallengeEdge.node.challenge.block
        : edge.node.challenge.block;
    }

    return edge.node.challenge.block;
  };

  const initializeExpandedState = () => {
    const { resetExpansion, toggleBlock } = props;

    resetExpansion();
    return toggleBlock(getChosenBlock());
  };

  const {
    data: {
      markdownRemark: {
        frontmatter: { superBlock, title, certification }
      },
      allChallengeNode: { edges }
    },
    isSignedIn,
    signInLoading,
    t,
    user
  } = props;

  const nodesForSuperBlock = edges.map(({ node }) => node);
  const blockDashedNames = uniq(
    nodesForSuperBlock.map(({ challenge: { block } }) => block)
  );

  const i18nSuperBlock = t(`intro:${superBlock}.title`);
  const i18nTitle =
    superBlock === SuperBlocks.CodingInterviewPrep
      ? i18nSuperBlock
      : t(`intro:misc-text.certification`, {
          cert: i18nSuperBlock
        });

  const defaultCurriculumNames = blockDashedNames;

  return (
    <>
      <Helmet>
        <title>{i18nTitle} | freeCodeCamp.org</title>
      </Helmet>
      <Grid>
        <Row className='super-block-intro-page'>
          <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
            <Spacer size={2} />
            <LegacyLinks superBlock={superBlock} />
            <SuperBlockIntro superBlock={superBlock} />
            {superBlock === SuperBlocks.RelationalDb && isSignedIn && (
              <WebhookToken isSuperBlockPage={true} />
            )}
            <Spacer size={2} />
            <h2 className='text-center big-subheading'>
              {t(`intro:misc-text.courses`)}
            </h2>
            <Spacer />
            <div className='block-ui'>
              {defaultCurriculumNames.map(blockDashedName => (
                <Fragment key={blockDashedName}>
                  <Block
                    blockDashedName={blockDashedName}
                    challenges={nodesForSuperBlock.filter(
                      node => node.challenge.block === blockDashedName
                    )}
                    superBlock={superBlock}
                  />
                </Fragment>
              ))}
              {superBlock !== SuperBlocks.CodingInterviewPrep && (
                <div>
                  <CertChallenge
                    certification={certification}
                    superBlock={superBlock}
                    title={title}
                    user={user}
                  />
                </div>
              )}
            </div>
            {!isSignedIn && !signInLoading && (
              <div>
                <Spacer size={2} />
                <Login block={true}>{t('buttons.logged-out-cta-btn')}</Login>
              </div>
            )}
            <Spacer size={2} />
            <h3
              className='text-center big-block-title'
              style={{ whiteSpace: 'pre-line' }}
            >
              {t(`intro:misc-text.browse-other`)}
            </h3>
            <Spacer />
            <Map currentSuperBlock={superBlock} />
            <Spacer size={2} />
          </Col>
        </Row>
      </Grid>
      <DonateModal location={props.location} />
    </>
  );
};

SuperBlockIntroductionPage.displayName = 'SuperBlockIntroductionPage';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(memo(SuperBlockIntroductionPage)));

export const query = graphql`
  query SuperBlockIntroPageBySlug($slug: String!, $superBlock: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        certification
        superBlock
        title
      }
    }
    allChallengeNode(
      sort: {
        fields: [
          challenge___superOrder
          challenge___order
          challenge___challengeOrder
        ]
      }
      filter: { challenge: { superBlock: { eq: $superBlock } } }
    ) {
      edges {
        node {
          challenge {
            fields {
              slug
              blockName
            }
            id
            block
            challengeType
            title
            order
            superBlock
            dashedName
          }
        }
      }
    }
  }
`;
