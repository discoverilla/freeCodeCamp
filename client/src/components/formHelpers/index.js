import normalizeUrl from 'normalize-url';
import {
  localhostValidator,
  editorValidator,
  composeValidators
} from './FormValidators';

export { default as BlockSaveButton } from './BlockSaveButton.js';
export { default as BlockSaveWrapper } from './BlockSaveWrapper.js';
export { default as Form } from './Form.js';
export { default as FormFields } from './FormFields.js';

const normalizeOptions = {
  stripWWW: false
};

export function formatUrlValues(values, options) {
  const validatedValues = { values: {}, errors: [], invalidValues: [] };
  const urlValues = Object.keys(values).reduce((result, key) => {
    let value = values[key];
    const nullOrWarning = composeValidators(
      localhostValidator,
      editorValidator
    )(value);
    if (nullOrWarning) {
      validatedValues.invalidValues.push(nullOrWarning);
    }
    if (value && options.types[key] === 'url') {
      try {
        value = normalizeUrl(value, normalizeOptions);
      } catch (err) {
        // Not a valid URL for testing or submission
        validatedValues.errors.push({ error: err, value });
      }
    }
    return { ...result, [key]: value };
  }, {});
  validatedValues.values = urlValues;
  return validatedValues;
}
