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
    let existingUser = null;
    try {
      existingUser = await context.User().findOne({ where: { email } });
    } catch (error) {
      existingUser = 'REQUEST_ERROR_EXISTING_USER';
      console.error('error with existingUser request', error);
    }

    if (existingUser === 'REQUEST_ERROR_EXISTING_USER') {
      throw new Error('REQUEST_ERROR_EXISTING_USER');
    } else if (existingUser) {
      throw new Error('USER_ALREADY_EXISTS');
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
