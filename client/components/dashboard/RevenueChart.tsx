import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "Jan", revenue: 65000, students: 1200 },
  { month: "Feb", revenue: 75000, students: 1450 },
  { month: "Mar", revenue: 85000, students: 1650 },
  { month: "Apr", revenue: 78000, students: 1580 },
  { month: "May", revenue: 92000, students: 1820 },
  { month: "Jun", revenue: 105000, students: 2100 },
  { month: "Jul", revenue: 118000, students: 2350 },
  { month: "Aug", revenue: 125000, students: 2500 },
  { month: "Sep", revenue: 135000, students: 2700 },
  { month: "Oct", revenue: 142000, students: 2850 },
  { month: "Nov", revenue: 155000, students: 3100 },
  { month: "Dec", revenue: 168000, students: 3350 },
];

export function RevenueChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip
                formatter={(value: number) => [
                  `₹${value.toLocaleString()}`,
                  "Revenue",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="#8B5CF6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Enrollment Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} />
              <Tooltip
                formatter={(value: number) => [
                  value.toLocaleString(),
                  "Students",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
