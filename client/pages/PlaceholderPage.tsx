import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Construction className="w-8 h-8 text-gray-400" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
            <p className="text-sm text-muted-foreground">
              This section is currently under development and will be available
              soon.
            </p>
            <Button className="mt-4">Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
