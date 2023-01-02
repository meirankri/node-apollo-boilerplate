export default {
  truc: (_, { a }) => a,
  logout: (parent, args, context) => context.logout(),
  login: async (parent, { email, password }, context) => {
    const { user } = await context.authenticate('graphql-local', {
      email,
      password
    });
    await context.login(user);
    return { user };
  },
  signup: async (_, { firstName, lastName, email, password }, context) => {
    const existingUser = await context.User().findOne({ where: { email } });

    if (existingUser) {
      throw new Error('User with email already exists');
    }
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };
    const userCreated = await context.User().create(newUser);
    await context.login(userCreated);
    return { user: userCreated };
  }
};
