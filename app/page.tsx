import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary backdrop-blur-sm">
              <span className="text-sm font-medium ">
                ✨ Simplify your subscription management
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text ">
              Manage Your <span className="text-primary">Subscriptions</span>{" "}
              with Ease
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track, manage, and optimize all your subscriptions in one place.
            Never miss a payment or renewal date again. Take control of your
            digital expenses today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="group animate-fade-in w-80">
              <Link href="/login" className="flex items-center gap-2">
                Start Managing Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats section */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center gap-8 text-center text-sm text-muted-foreground">
            <div className="animate-fade-up">
              <div className="font-bold text-2xl text-foreground">10k+</div>
              <div>Active Users</div>
            </div>
            <div className="animate-fade-up [animation-delay:200ms]">
              <div className="font-bold text-2xl text-foreground">50k+</div>
              <div>Subscriptions Tracked</div>
            </div>
            <div className="animate-fade-up [animation-delay:400ms]">
              <div className="font-bold text-2xl text-foreground">$2M+</div>
              <div>Savings Found</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
