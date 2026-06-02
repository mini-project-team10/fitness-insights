"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    type User as FirebaseUser
} from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface User {
    uid: string;
    email: string | null;
    name: string | null;
    username?: string;
    mobile?: string;
    photoURL?: string | null;
    onboardingComplete?: boolean;
    height?: number;
    weight?: number;
    stepGoal?: number;
    calorieGoal?: number;
    distanceGoal?: number;
    gender?: string;
    schedule?: Record<string, string>;
    gymCompletions?: Record<string, Record<string, boolean>>;
    gymHistory?: { day: string, accuracy: number, date: string, timestamp: number }[];
}

export const MOCK_GUEST_USER: User = {
    uid: "guest-athlete",
    email: "guest@aura.fit",
    name: "Alex Rivera",
    username: "alex_rivera",
    mobile: "+1 (555) 019-2834",
    photoURL: null,
    onboardingComplete: true,
    height: 182,
    weight: 78,
    stepGoal: 10000,
    calorieGoal: 2800,
    distanceGoal: 8,
    gender: "Male",
    schedule: {
        Monday: "Chest & Triceps",
        Tuesday: "Back & Biceps",
        Wednesday: "Active Recovery",
        Thursday: "Shoulders & Abs",
        Friday: "Leg Day",
        Saturday: "Cardio & HIIT",
        Sunday: "Rest & Stretch",
    },
    gymCompletions: {
        "2026-05-25": { chest: true, triceps: true },
        "2026-05-26": { back: true },
    },
    gymHistory: [
        { day: "Monday", accuracy: 92, date: "May 25", timestamp: Date.now() - 172800000 },
        { day: "Tuesday", accuracy: 88, date: "May 26", timestamp: Date.now() - 86400000 },
    ]
};

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loginAsGuest: () => Promise<void>;
    signup: (data: { email: string; password: string; username: string; mobile: string }) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const syncUserWithFirestore = async (user: FirebaseUser) => {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    username: user.displayName || user.email?.split('@')[0] || "User",
                    email: user.email,
                    createdAt: serverTimestamp(),
                    mobile: "",
                    onboardingComplete: false
                });
            }
        } catch (error) {
            console.error("Error syncing user with Firestore:", error);
        }
    };

    useEffect(() => {
        // Intercept and gracefully suppress browser console errors / unhandled rejections
        // caused by Firebase Auth checking domain whitelisting on local hostnames.
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const reason = event.reason;
            if (reason && (
                reason.code === "auth/unauthorized-domain" ||
                reason.message?.includes("auth/unauthorized-domain") ||
                reason.message?.includes("unauthorized-domain")
            )) {
                console.warn("Suppressed Firebase unauthorized-domain overlay rejection:", reason);
                event.preventDefault();
                event.stopPropagation();
            }
        };

        const handleGlobalError = (event: ErrorEvent) => {
            const error = event.error || event.message;
            if (error && (
                error.code === "auth/unauthorized-domain" ||
                (typeof error === "string" && error.includes("auth/unauthorized-domain")) ||
                (error.message && error.message.includes("auth/unauthorized-domain"))
            )) {
                console.warn("Suppressed Firebase unauthorized-domain overlay error:", error);
                event.preventDefault();
                event.stopPropagation();
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("unhandledrejection", handleUnhandledRejection);
            window.addEventListener("error", handleGlobalError);
        }

        // Check local guest active first
        const isGuest = typeof window !== "undefined" && localStorage.getItem("aura_guest_active") === "true";
        if (isGuest) {
            setUser(MOCK_GUEST_USER);
            setIsLoading(false);
        }

        // Handle redirect result
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    await syncUserWithFirestore(result.user);
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Error handling redirect result:", error);
            }
        };
        handleRedirectResult();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            // Ignore if guest is active
            if (typeof window !== "undefined" && localStorage.getItem("aura_guest_active") === "true") {
                return;
            }

            if (firebaseUser) {
                try {
                    // Fetch additional user details from Firestore
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    const userData = userDoc.data();

                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: userData?.username || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
                        username: userData?.username,
                        mobile: userData?.mobile,
                        photoURL: firebaseUser.photoURL,
                        onboardingComplete: userData?.onboardingComplete || false,
                        height: userData?.height,
                        weight: userData?.weight,
                        stepGoal: userData?.stepGoal,
                        calorieGoal: userData?.calorieGoal,
                        distanceGoal: userData?.distanceGoal,
                        gender: userData?.gender,
                        schedule: userData?.schedule,
                        gymCompletions: userData?.gymCompletions,
                        gymHistory: userData?.gymHistory,
                    });
                } catch (error) {
                    console.error("Firestore error:", error);
                    // Fallback to basic auth info if firestore fails
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
                        photoURL: firebaseUser.photoURL,
                        onboardingComplete: false
                    });
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
            if (typeof window !== "undefined") {
                window.removeEventListener("unhandledrejection", handleUnhandledRejection);
                window.removeEventListener("error", handleGlobalError);
            }
        };
    }, [router]);

    const login = async (email: string, password: string) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("aura_guest_active");
        }
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
    };

    const loginAsGuest = async () => {
        setIsLoading(true);
        try {
            if (typeof window !== "undefined") {
                localStorage.setItem("aura_guest_active", "true");
            }
            setUser(MOCK_GUEST_USER);
            router.push("/dashboard");
        } catch (error) {
            console.error("Guest login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        try {
            console.log("Initializing Google login...");
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google popup sign-in successful:", result.user.email);
            await syncUserWithFirestore(result.user);
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Detailed Google login error:", error);
            if (error.code === "auth/popup-blocked") {
                console.log("Popup blocked, falling back to redirect...");
                try {
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError) {
                    console.error("Redirect login failed:", redirectError);
                    throw redirectError;
                }
            } else if (error.code === "auth/cancelled-popup-request") {
                 console.log("User closed the popup.");
            } else {
                throw error;
            }
        }
    };

    const signup = async (data: { email: string; password: string; username: string; mobile: string }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

        try {
            // Create user document in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                username: data.username,
                mobile: data.mobile,
                email: data.email,
                createdAt: serverTimestamp(),
                onboardingComplete: false
            });
        } catch (error) {
            console.error("Error creating user document:", error);
        }

        router.push("/dashboard");
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!auth.currentUser) return;

        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, data, { merge: true });

            // Update local state
            setUser(prev => prev ? { ...prev, ...data } : null);
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error; // Re-throw to handle in UI
        }
    };

    const logout = async () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("aura_guest_active");
        }
        try {
            await signOut(auth);
        } catch (e) {
            console.error("SignOut error:", e);
        }
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                loginWithGoogle,
                loginAsGuest,
                signup,
                updateProfile,
                logout,
                isAuthenticated: !!user,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
