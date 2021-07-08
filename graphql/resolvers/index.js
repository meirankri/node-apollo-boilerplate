import glob from 'glob';
import path from 'path';

let queries = {};
let mutations = {};

glob.sync(path.join(__dirname, '**/*.js')).forEach(p => {
  const relativePath = path.relative(__dirname, p);
  const baseDir = path.dirname(relativePath).split(path.sep)[0];
  const d = require(`./${relativePath}`).default;

  if (d) {
    switch (baseDir) {
      case 'queries':
        queries = { ...queries, ...d };
        break;
      case 'mutations':
        mutations = { ...mutations, ...d };
        break;
    }
  }
});

const resolvers = {
  Query: { ...queries },
  Mutation: { ...mutations },
};

export default resolvers;
