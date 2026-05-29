import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-16 space-y-20">
      <section className="text-center space-y-4">
        <Badge variant="outline">About</Badge>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Three engineers. One system.
        </h1>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          We build clean, scalable web systems with a focus on performance,
          simplicity, and long-term maintainability.
        </p>
      </section>

      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Team</h2>
          <p className="text-muted-foreground text-sm">
            Full-stack engineers across UI, backend, and data systems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-muted/40">
            <CardContent className="p-6 space-y-4 text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src="./maahi.jpg" className="grayscale-25" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium text-lg">Mohit Singh</h3>
                <p className="text-xs text-muted-foreground">
                  Full-Stack Engineer — Systems, Backend, Data
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Focused on system architecture, APIs, data modeling, and
                scalable backend design.
              </p>
            </CardContent>
          </Card>

          <Card className="border-muted/40">
            <CardContent className="p-6 space-y-4 text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src="./simmi.jpg" className="grayscale-25" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium text-lg">Simran Dalakoti</h3>
                <p className="text-xs text-muted-foreground">
                  Full-Stack Engineer — UI, UX, Database
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Builds clean interfaces, design systems, and high-performance
                frontend architecture.
              </p>
            </CardContent>
          </Card>

          <Card className="border-muted/40">
            <CardContent className="p-6 space-y-4 text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src="./aadi.jpg" className="grayscale-25" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium text-lg">Aditya Joshi</h3>
                <p className="text-xs text-muted-foreground">
                  Full-Stack Engineer — UI Designer, Frontend
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Works across frontend and backend with focus on product logic,
                system flows, and feature architecture.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center pt-10 border-t">
        <p className="text-sm text-muted-foreground">
          Minimal design • Clean systems • Scalable architecture
        </p>
      </section>
    </div>
  );
}
