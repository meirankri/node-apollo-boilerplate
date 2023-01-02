const typeDefs = `
    type User {
        userId: ID
        firstName: String
        lastName: String
        email: String
    }

    type AuthPayload {
        user: User
    }

    type Query {
		truc: String
    }

	type Mutation {
		truc(a:String): String!
        logout: Boolean
        login(email: String!, password: String!): AuthPayload
        signup(firstName: String, lastName: String, email: String!, password: String!): AuthPayload
	}
`;

export default typeDefs;
