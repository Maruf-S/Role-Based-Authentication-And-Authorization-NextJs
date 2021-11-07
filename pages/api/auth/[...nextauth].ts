import NextAuth, { Session } from "next-auth";
import Providers from "next-auth/providers";
import { getUserByEmail, verifyPassword, getUserRolesString } from "../../../lib/utils/auth";

export default NextAuth({
  session: {
    jwt: true
  },
  jwt: {
    secret: "dsa6teyiuoquyftwyueiqw9ygetfwqgy" //!Set this as an env variable
  },
  callbacks: {


    session: async (session, token) => {
      return { user: token.user } as Session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      user && (token.user = user);
      return token;
    },
  
  },
  providers: [
    Providers.Credentials({

      async authorize(credentials: any) {
        let { email, password } = credentials;
        let user = await getUserByEmail(email)
        if (!user) {
          throw new Error("Email is incorrect.")
        }
        if (!await verifyPassword(password, user.password)) throw new Error("Password is incorrect");
        return { email: user.email,firstName: user.firstName,lastName: user.lastName , roles:await getUserRolesString(user.id)};
      }
    }),
  ],
});
