import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
  cardColor?: string;
  textColor?: string;
  iconBg?: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
  className,
  cardColor,
  textColor = "text-foreground",
  iconBg = "bg-gray-100 dark:bg-gray-800",
}: AnalyticsCardProps) {
  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-all duration-300",
        cardColor || "bg-card",
        className,
      )}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p
              className={cn(
                "text-xs font-medium",
                textColor || "text-muted-foreground",
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                "text-xl font-bold",
                textColor || "text-foreground",
              )}
            >
              {value}
            </p>
            {change && (
              <p
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" &&
                    "text-green-600 dark:text-green-400",
                  changeType === "negative" && "text-red-600 dark:text-red-400",
                  changeType === "neutral" && "text-muted-foreground",
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "p-2 rounded-lg",
              iconBg || "bg-gray-100 dark:bg-gray-800",
              textColor || iconColor,
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
