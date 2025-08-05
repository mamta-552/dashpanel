import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IdCard } from "lucide-react";

export default function AdmitCards() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admit Card Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload, update & distribute admit cards for exams
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IdCard className="h-5 w-5" />
            <span>Admit Card System</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <IdCard className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">
              Admit Card Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Generate, manage and distribute admit cards for examinations.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary">Generation</Badge>
              <Badge variant="secondary">Distribution</Badge>
              <Badge variant="secondary">Tracking</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
