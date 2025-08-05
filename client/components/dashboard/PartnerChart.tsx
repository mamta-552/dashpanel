import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const partnerData = [
  { month: "Jan", partners: 18, revenue: 45000 },
  { month: "Feb", partners: 20, revenue: 52000 },
  { month: "Mar", partners: 22, revenue: 58000 },
  { month: "Apr", partners: 25, revenue: 65000 },
  { month: "May", partners: 26, revenue: 72000 },
  { month: "Jun", partners: 28, revenue: 85000 },
];

const partnerTypeData = [
  { name: "Franchise", value: 15, color: "#8B5CF6" },
  { name: "Direct Partners", value: 8, color: "#10B981" },
  { name: "Affiliate", value: 5, color: "#F59E0B" },
];

export function PartnerChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Partner Growth & Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={partnerData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) => [
                  name === "partners" ? value : `₹${value.toLocaleString()}`,
                  name === "partners" ? "Partners" : "Revenue",
                ]}
              />
              <Bar
                dataKey="partners"
                fill="#8B5CF6"
                radius={[3, 3, 0, 0]}
                name="partners"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Partner Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={partnerTypeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {partnerTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 mt-3">
            {partnerTypeData.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
