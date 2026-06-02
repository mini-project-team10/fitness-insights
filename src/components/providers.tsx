"use client";

import { AuthProvider } from "@/context/auth-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import { ThemeProvider } from "@/context/theme-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AuthGuard>{children}</AuthGuard>
            </AuthProvider>
        </ThemeProvider>
    );
}
