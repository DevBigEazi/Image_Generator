import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes:["/api/webhooks/clerk"]
});

export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico).*)", "/"],
};

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/api/webhooks/clerk"]);

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next*).*)", "/", "/(api|trpc)(.*)"],
// };
