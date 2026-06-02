import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <SignupForm />
        </div>
    );
}
