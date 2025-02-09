import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/onboarding/:path*",
    "/reports/:path*",
    "/governance/:path*",
    "/csr/:path*",
    "/esg/:path*",
    "/agent-aggregation/:path*",
    "/emissions-calculator/:path*",
  ],
};
