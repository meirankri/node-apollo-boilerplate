import User from '../../../models/User';

export default {
  truc: async () => {
    try {
      const a = await User().findOne({ where: { userId: 1 } });
      console.log('ouech', a.firstName);
    } catch (error) {
      console.error('ouech error', error);
    }
    return 'ouech';
  }
};
