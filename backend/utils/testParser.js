import { parseUserQuery } from './queryParser.js';

const testQuery = 'де на оболоні поїсти суші';
parseUserQuery(testQuery).then(result => {
  console.log(result);
});
