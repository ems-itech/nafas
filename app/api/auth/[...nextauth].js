// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "test@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         // Replace this with your DB lookup
//         const user = {
//           id: "1",
//           email: "test@example.com",
//           password: "123456",
//           name: "Test User",
//         }

//         // Validate user
//         if (
//           credentials.email === user.email &&
//           credentials.password === user.password
//         ) {
//           return {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//           }
//         }

//         return null
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// }

// export default NextAuth(authOptions)