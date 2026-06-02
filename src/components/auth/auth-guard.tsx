"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading } = useAuth();
    const publicPaths = ["/", "/signup"];

    useEffect(() => {
        if (isLoading) return;

        // Redirect logic based on Auth and Onboarding status
        if (!isAuthenticated) {
            if (!publicPaths.includes(pathname)) {
                router.replace("/");
            }
        } else if (user) {
            if (!user.onboardingComplete) {
                if (pathname !== "/onboarding") {
                    router.replace("/onboarding");
                }
            } else if (pathname === "/onboarding" || (pathname !== "/dashboard" && pathname !== "/settings" && pathname !== "/bmi-calculator")) {
                // If authenticated and onboarding complete, ensure we are on a valid app page
                // This replaces the old check for publicPaths to allow the root to be the dashboard gateway
                if (pathname === "/" || pathname === "/signup") {
                    router.replace("/dashboard");
                }
            }
        }
    }, [isAuthenticated, isLoading, user?.onboardingComplete, pathname, router]);

    // Show loading while checking auth state
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
                <div className="relative">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                    <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-primary/20" />
                </div>
            </div>
        );
    }

    // Protection to avoid rendering wrong content during redirects
    if (!isAuthenticated && !publicPaths.includes(pathname)) return null;
    if (isAuthenticated && !user?.onboardingComplete && pathname !== "/onboarding") return null;
    if (isAuthenticated && user?.onboardingComplete && (pathname === "/" || pathname === "/signup" || pathname === "/onboarding")) return null;

    return <>{children}</>;
}
