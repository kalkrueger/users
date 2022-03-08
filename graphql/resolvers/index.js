import { userQueries, userMutations } from './users';
import { productQueries, productMutations } from './products';
import { companyQueries, companyMutations } from './companies';
import { purchaseQueries, purchaseMutations } from './purchases';


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
  },
};

export default resolvers;