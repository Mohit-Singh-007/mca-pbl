import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, Zap, Code2, SortAsc } from "lucide-react";
import Link from "next/link";
import CodeCard from "../_components/home/Snippets";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            MCA PBL - Data Structures & Algorithms
          </Badge>

          <h1 className="text-5xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            E-Commerce Product Search
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto ">
            A high-performance product search engine built with advanced data
            structures. Experience lightning-fast search, filtering, and sorting
            powered by Tries, BSTs, and HashMaps.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link href="/products">
              <Button size="lg" className="text-lg h-12 px-8">
                Try Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="text-lg h-12 px-8">
              <Link
                href={"https://github.com/Mohit-Singh-007/mca-pbl"}
                className="flex items-center"
              >
                <Code2 className="mr-2 h-5 w-5" />
                View Source Code
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: "Products", value: "100+", icon: Database },
            { label: "Search Speed", value: "<10ms", icon: Zap },
            { label: "Data Structures", value: "6+", icon: Code2 },
            { label: "Avg Complexity", value: "O(log n)", icon: SortAsc },
          ].map((stat, i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Data Structures in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hover over each card to see the actual implementation code
          </p>
        </div>

        <CodeCard />
      </section>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Built with Spring Boot, Next.js, and Advanced Data Structures</p>
          <p className="mt-2">MCA Project-Based Learning © 2026</p>
        </div>
      </footer>
    </div>
  );
}
