// Date Created: 13/05/2020, 7:05:00 PM
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = { 
  matcher: [
    "/conversations/:path*",
    "/users/:path*",
    "/teams/:path*",
  ]
};