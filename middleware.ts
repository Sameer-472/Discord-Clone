import { authMiddleware, clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default clerkMiddleware({
  publicRoutes: ['/api/uploadthings']
})