import { userQueries, userMutations } from './users/index.js';
import { productQueries, productMutations } from './products/index.js';
import { companyQueries, companyMutations } from './companies/index.js';
import { purchaseQueries, purchaseMutations } from './purchases/index.js';


const resolvers = {
  Query: {
    ...userQueries,
    ...productQueries,
    ...companyQueries,
    ...purchaseQueries,
  },
  Mutation: {
    ...userMutations,
    ...productMutations,
    ...companyMutations,
    ...purchaseMutations,
  }
};

export default resolvers