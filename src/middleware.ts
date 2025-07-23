import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/login"]
const regex =
	/^\/(?!api\/|auth|content|_next\/static|_next\/image|favicon\.ico).*/

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const isPublic = PUBLIC_PATHS.includes(pathname)
	const token = await getToken({ req })

	if (regex.test(pathname)) {
		if (pathname === "/") {
			if (token) {
				const url = req.nextUrl.clone()
				url.pathname = "/dashboard"
				return NextResponse.redirect(url)
			}
			const url = req.nextUrl.clone()
			url.pathname = "/login"
			return NextResponse.redirect(url)
		}

		if (!isPublic && !token) {
			const url = req.nextUrl.clone()
			url.pathname = "/login"
			return NextResponse.redirect(url)
		}
		return NextResponse.next()
	}
}
