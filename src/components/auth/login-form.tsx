"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, loginWithGoogle, loginAsGuest } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login(email, password);
        } catch (err: any) {
            console.error(err);
            if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
                setError("Wrong credentials entered. Please try again.");
            } else {
                setError("An error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        setError(null);
        try {
            await loginWithGoogle();
        } catch (err: any) {
            console.error("Login component error:", err);
            if (err.code === "auth/popup-closed-by-user") {
                setError("Login cancelled. Please keep the window open.");
            } else if (err.code === "auth/network-request-failed") {
                setError("Network error. Please check your connection.");
            } else if (err.code === "auth/operation-not-allowed") {
                setError("Google sign-in is not enabled in the Firebase console.");
            } else if (err.code === "auth/unauthorized-domain") {
                setError("This domain is not authorized. Please add your current IP/Domain to Firebase Console -> Auth -> Settings -> Authorized Domains.");
            } else {
                setError("Google login failed. Please try again.");
            }
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full relative z-10 space-y-6"
            >
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                placeholder="you@example.com"
                                type="email"
                                className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 transition-colors text-foreground"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 transition-colors text-foreground"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg text-black font-black italic uppercase tracking-wider h-11 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="ml-2 h-4 w-4 text-black" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors h-11 text-foreground cursor-pointer"
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading || isLoading}
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </div>
                        )}
                    </Button>
                    <Button
                        type="button"
                        className="w-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 hover:border-white/20 transition-all duration-300 h-11 font-black italic uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                        onClick={loginAsGuest}
                        disabled={isLoading}
                    >
                        <span>Guest Mode</span>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
