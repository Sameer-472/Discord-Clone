import {  clerkMiddleware , authMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"]
});