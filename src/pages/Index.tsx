import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Layers, Zap, Eye, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PageContainer from "@/components/pageContainer";


export default function Index() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPages: 0,
    totalViews: 0,
    avgViews: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await gql<{
          landing_pages: { page_views: number }[];
        }>(`query GetPageViews { landing_pages { page_views } }`);
        if (error) throw new Error(error);
        const pages = data?.landing_pages ?? [];
        const totalPages = pages.length;
        const totalViews = pages.reduce((s, p) => s + (p.page_views || 0), 0);
        const avgViews = totalPages ? Math.round(totalViews / totalPages) : 0;
        setStats({ totalPages, totalViews, avgViews });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer allowScroll={false} className="bg-background">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Landing Pages
              </h1>
              <p className="text-xs text-muted-foreground">Welcome back 👋</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              View Dashboard
            </Button>
            <Button onClick={() => navigate("/create")}>Create New</Button>
          </div>
        </div>

        {/* Hero (fills remaining height without page scroll) */}
        <Card className="mt-6 flex-1 rounded-2xl border-border bg-card">
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <h2 className="mb-3 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Create Beautiful Landing Pages in Minutes
            </h2>
            <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
              Build, manage, and track stunning landing pages with our powerful
              platform.
            </p>
            <div className="flex justify-center gap-3">
              <Button size="lg" onClick={() => navigate("/create")}>
                Start Creating
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Analytics */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            title="Total Pages"
            desc="All landing pages"
            value={loading ? "…" : stats.totalPages.toLocaleString()}
            wrapper="border-violet-500/30 bg-violet-950/20"
            titleClass="text-violet-400"
            valueClass="text-violet-300"
          />
          <StatCard
            title="Total Views"
            desc="Cumulative views"
            value={loading ? "…" : stats.totalViews.toLocaleString()}
            wrapper="border-orange-500/30 bg-orange-950/20"
            titleClass="text-orange-400"
            valueClass="text-orange-300"
          />
          <StatCard
            title="Avg. Views / Page"
            desc="Per page average"
            value={loading ? "…" : stats.avgViews.toLocaleString()}
            wrapper="border-emerald-500/30 bg-emerald-950/20"
            titleClass="text-emerald-400"
            valueClass="text-emerald-300"
          />
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Feature
            icon={<Zap className="h-6 w-6" />}
            title="Lightning Fast"
            desc="Create & deploy in minutes"
          />
          <Feature
            icon={<Eye className="h-6 w-6" />}
            title="Track Performance"
            desc="Built-in analytics"
          />
          <Feature
            icon={<TrendingUp className="h-6 w-6" />}
            title="Grow Your Business"
            desc="Optimized pages"
          />
        </div>
      </div>
    </PageContainer>
  );
}

function StatCard({
  title,
  desc,
  value,
  wrapper,
  titleClass,
  valueClass,
}: {
  title: string;
  desc: string;
  value: string | number;
  wrapper: string;
  titleClass: string;
  valueClass: string;
}) {
  return (
    <Card className={`rounded-2xl border ${wrapper} shadow-sm`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm ${titleClass}`}>{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${valueClass}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border-border bg-card p-5 text-center shadow-sm">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
        {icon}
      </div>
      <h3 className="mb-1 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
