import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";

export default function DocumentsTab() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage student documents, certificates, and important files
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Repository</span>
          </CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Document Management</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Secure document storage for student records. Manage certificates,
              transcripts, and important documents.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary">Certificates</Badge>
              <Badge variant="secondary">Transcripts</Badge>
              <Badge variant="secondary">ID Documents</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
