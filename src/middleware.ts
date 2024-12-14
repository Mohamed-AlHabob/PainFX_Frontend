import { AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from "../routes";
import { NextRequest, NextResponse } from 'next/server';

// Converts a dynamic route pattern (e.g. "/user/[id]") into a regex for matching the requested path.
function matchesDynamicRoute(path: string, routes: string[]): boolean {
    return routes.some(route => {
        // Replace all dynamic segments [something] with a regex group that matches any single path segment
        const regexPattern = '^' + route.replace(/\[[^\]]+\]/g, '[^/]+') + '$';
        const regex = new RegExp(regexPattern);
        return regex.test(path);
    });
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const isLoggedIn = Boolean(req.cookies.get('access'));

    const isPublicRoute = matchesDynamicRoute(url.pathname, PUBLIC_ROUTES);
    const isAuthRoute = matchesDynamicRoute(url.pathname, AUTH_ROUTES);

    // If the route is for authentication (e.g., sign-in), but user is logged in, redirect to the default page.
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url.origin));
        }
        return NextResponse.next();
    }

    // If the user is not logged in and the route is not public, redirect to sign-in.
    if (!isLoggedIn && !isPublicRoute) {
        const callbackUrl = `${url.pathname}${url.search || ''}`.replace('//', '/');
        const fallbackRoute = '/';
        const validCallbackUrl = callbackUrl.startsWith('/') ? callbackUrl : fallbackRoute;

        return NextResponse.redirect(
            new URL(`/sign-in?callbackUrl=${encodeURIComponent(validCallbackUrl)}`, url.origin)
        );
    }

    // Otherwise, just continue.
    return NextResponse.next();
}

// Matcher configuration that excludes Next.js internals and static files
// Adjust as needed based on your routing structure.
export const config = {
    matcher: [
        // Match all paths except for _next (Next.js internals), api routes, and static files.
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ],
};
