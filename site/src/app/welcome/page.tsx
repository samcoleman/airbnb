import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { PORTAL_CONFIG } from "@/lib/config";
import { Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Wifi className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">
            {PORTAL_CONFIG.welcomeMessage}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted-foreground">
            You are now connected to the internet.
          </p>
          <a
            href="https://www.google.com"
            className={cn(buttonVariants({ className: "w-full" }))}
          >
            Start Browsing
          </a>
        </CardContent>
      </Card>
    </main>
  );
}
