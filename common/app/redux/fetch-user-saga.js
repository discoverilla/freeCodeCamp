import { Observable } from 'rx';
import { fetchUser } from './types';
import {
  addUser,
  updateThisUser,
  updateCompletedChallenges,
  createErrorObservable,
  showSignIn
} from './actions';

export default function getUserSaga(action$, getState, { services }) {
  return action$
    .filter(action => action.type === fetchUser)
    .flatMap(() => {
      return services.readService$({ service: 'user' })
        .flatMap(({ entities, result })=> {
          if (!entities || !result) {
            return Observable.just(showSignIn());
          }
          return Observable.of(
            addUser(entities),
            updateThisUser(result),
            updateCompletedChallenges(result)
          );
        })
        .catch(createErrorObservable);
    });
}
