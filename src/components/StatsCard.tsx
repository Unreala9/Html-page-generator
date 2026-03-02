import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: "default" | "primary";
}

const StatsCard = ({ title, value, icon: Icon, variant = "default" }: StatsCardProps) => {
  return (
    <Card
      className={`p-6 transition-all duration-300 hover:shadow-lg ${
        variant === "primary"
          ? "bg-gradient-to-br from-primary to-primary-hover text-primary-foreground"
          : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-sm font-medium ${
              variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}
          >
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>
        <div
          className={`rounded-full p-3 ${
            variant === "primary" ? "bg-white/20" : "bg-accent"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
