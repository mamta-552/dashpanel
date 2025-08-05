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

const studentGrowthData = [
  { month: "Jan", totalStudents: 2800, newEnrollments: 120, completions: 85 },
  { month: "Feb", totalStudents: 2920, newEnrollments: 135, completions: 92 },
  { month: "Mar", totalStudents: 3055, newEnrollments: 148, completions: 105 },
  { month: "Apr", totalStudents: 3203, newEnrollments: 162, completions: 118 },
  { month: "May", totalStudents: 3365, newEnrollments: 178, completions: 125 },
  { month: "Jun", totalStudents: 3543, newEnrollments: 195, completions: 142 },
];

const performanceData = [
  { category: "Excellent (90-100%)", students: 128, percentage: 15 },
  { category: "Good (80-89%)", students: 425, percentage: 50 },
  { category: "Average (70-79%)", students: 285, percentage: 34 },
  { category: "Below Average (<70%)", students: 85, percentage: 10 },
];

export function StudentGrowthChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Student Growth Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={studentGrowthData}>
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
                  value.toLocaleString(),
                  name === "totalStudents"
                    ? "Total Students"
                    : name === "newEnrollments"
                      ? "New Enrollments"
                      : "Completions",
                ]}
              />
              <Area
                type="monotone"
                dataKey="totalStudents"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="newEnrollments"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Student Performance Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">{item.category}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.students} students ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                          ? "bg-blue-500"
                          : index === 2
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
                    style={{ width: `${item.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
