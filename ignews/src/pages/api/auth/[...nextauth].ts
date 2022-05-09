import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";
import { fauna } from "services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "read:user"}}
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const { email: emailUser } = user;

      try {
        await fauna.query (
          q.If(
            // IF
            q.Not(
              q.Exists(

                //WHERE
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )

              )
            ),
            // CASE IF, DO IT
            q.Create(
              q.Collection('users'),
              { data: { email: emailUser }}
            ),

            // ELSE
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  }
})