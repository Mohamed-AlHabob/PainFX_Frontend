import { AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from "../routes";
import { NextRequest, NextResponse } from 'next/server';

// Helper function to check if the path matches any route with dynamic segments
function matchesDynamicRoute(path: string, routes: string[]): boolean {
    return routes.some(route => {
        const routeParts = route.split('/');
        const pathParts = path.split('/');

        if (routeParts.length !== pathParts.length) return false;

        return routeParts.every((part, index) => {
            return part.startsWith('[') || part === pathParts[index];
        });
    });
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const cookies = req.cookies;
    const isLoggedIn = cookies.get('access'); // Check if 'access' cookie exists

    console.log('Incoming cookies:', cookies); // Log all cookies
    console.log('Access cookie:', isLoggedIn); // Log the value of 'access' cookie

    const isPublicRoute = matchesDynamicRoute(url.pathname, PUBLIC_ROUTES);
    const isAuthRoute = matchesDynamicRoute(url.pathname, AUTH_ROUTES);

    // Allow access to routes even if 'access' cookie is not available (for testing purposes)
    if (!isLoggedIn) {
        console.log('No access cookie, allowing access for testing...');
        return NextResponse.next();
    }

    // If the route is for authentication and user is logged in, redirect to the default login redirect
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url));
        }
        // Allow access to authentication routes for non-logged-in users
        return NextResponse.next();
    }

    // If the route is not public and the user is not logged in, redirect to the login page
    if (!isLoggedIn && !isPublicRoute) {
        const callbackUrl = url.pathname + (url.search || ''); // Save the current URL
        const encodedCallbackUrl = encodeURIComponent(callbackUrl); // Encode it for the query string
        return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, url));
    }

    // Allow access if the user is authenticated or if the route is public
    return NextResponse.next();
}

// Configure middleware to apply to certain routes
export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
}
