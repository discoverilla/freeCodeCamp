import { isEmpty } from 'lodash-es';
import { sortChallengeFiles } from '../../../../../utils/sort-challengefiles';

export function getTargetEditor(challengeFiles) {
  if (isEmpty(challengeFiles)) return null;
  else {
    let targetEditor = challengeFiles.find(
      ({ editableRegionBoundaries }) => !isEmpty(editableRegionBoundaries)
    )?.fileKey;

    // fallback for when there is no editable region.
    return targetEditor || sortChallengeFiles(challengeFiles)[0].fileKey;
  }
}
