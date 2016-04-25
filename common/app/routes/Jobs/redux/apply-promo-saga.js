import { Observable } from 'rx';

import { applyPromo } from './types';
import { applyPromoCompleted } from './actions';
import { postJSON$ } from '../../../../utils/ajax-stream';

export default function applyPromoSaga(action$) {
  return action$
    .filter(action => action.type === applyPromo)
    .flatMap(action => {
      const { id, code = '', type = null } = action.payload;
      const body = {
        id,
        code: code.replace(/[^\d\w\s]/, '')
      };
      if (type) {
        body.type = type;
      }
      return postJSON$('/api/promos/getButton', body)
        .retry(3)
        .map(({ promo }) => {
          if (!promo || !promo.buttonId) {
            throw new Error('No promo returned by server');
          }

          return applyPromoCompleted(promo);
        })
        .catch(error => Observable.just({
          type: 'app.handleError',
          error
        }));
    });
}
