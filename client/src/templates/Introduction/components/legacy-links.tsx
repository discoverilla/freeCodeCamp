import React from 'react';
import { useTranslation } from 'react-i18next';
import { SuperBlocks } from '../../../../../config/certification-settings';
import { Link } from '../../../components/helpers';
import { Alert } from '@freecodecamp/react-bootstrap';

interface LegacyLinksProps {
  superBlock: SuperBlocks;
}

function LegacyLinks({ superBlock }: LegacyLinksProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      {superBlock === SuperBlocks.RespWebDesignNew && (
        <Alert bsStyle='info'>
          <p>
            {t('intro:misc-text.viewing-upcoming-change')}{' '}
            <Link sameTab={false} to={`/learn/`}>
              {t('intro:misc-text.go-back-to-learn')}
            </Link>
          </p>
        </Alert>
      )}
    </>
  );
}

export default LegacyLinks;
