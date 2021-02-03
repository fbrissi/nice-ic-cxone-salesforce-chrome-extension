import { reduce } from 'lodash';
import languages from '../components/Settings/language.json';

export default reduce(languages, (hash, value) => {
  const current = hash;
  current[value.slug] = require(`./messages/${value.module}`);
  return current;
}, {});
