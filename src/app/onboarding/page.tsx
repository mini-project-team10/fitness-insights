import { OnboardingForm } from "@/components/auth/onboarding-form";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-2xl space-y-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter sm:text-6xl">
                        Personalize Your <span className="text-primary italic">Journey</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        To give you the most accurate insights, we need a few more details about your goals.
                    </p>
                </div>

                <OnboardingForm />
            </div>
        </div>
    );
}
