import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Mock data
				if (
					credentials?.email === "demo@admin.com" &&
					credentials?.password === "123456"
				) {
					return {
						id: "1",
						name: "Demo User",
						email: "demo@example.com",
						role: "admin",
					}
				}
				return null
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = user.role
			return token
		},
		async session({ session, token }) {
			if (token?.role) session.user.role = token.role
			return session
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
})

export { handler as GET, handler as POST }
