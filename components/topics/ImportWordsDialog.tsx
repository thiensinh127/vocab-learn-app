"use client";

import type React from "react";

import { Download, FileText, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface ImportWordsDialogProps {
  onImportWords: (words: any[]) => void;
}

export function ImportWordsDialog({ onImportWords }: ImportWordsDialogProps) {
  const [open, setOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (file.name.endsWith(".csv")) {
        setCsvText(content);
      } else if (file.name.endsWith(".json")) {
        setJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  const parseCsvData = (csvData: string) => {
    const lines = csvData.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    // Expected headers: word, pronunciation, meaning, example, partOfSpeech, difficulty
    const requiredHeaders = ["word", "meaning"];
    const hasRequiredHeaders = requiredHeaders.every((header) =>
      headers.some((h) => h.includes(header))
    );

    if (!hasRequiredHeaders) {
      throw new Error('CSV must contain at least "word" and "meaning" columns');
    }

    const words = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""));
      if (values.length < 2) continue;

      const word: any = {};
      headers.forEach((header, index) => {
        if (header.includes("word")) word.word = values[index] || "";
        else if (header.includes("pronunciation"))
          word.pronunciation = values[index] || "";
        else if (header.includes("meaning")) word.meaning = values[index] || "";
        else if (header.includes("example")) word.example = values[index] || "";
        else if (header.includes("part") || header.includes("speech"))
          word.partOfSpeech = values[index] || "noun";
        else if (header.includes("difficulty"))
          word.difficulty = values[index] || "Medium";
      });

      if (word.word && word.meaning) {
        words.push({
          ...word,
          pronunciation: word.pronunciation || "",
          example: word.example || "",
          partOfSpeech: word.partOfSpeech || "noun",
          difficulty: word.difficulty || "Medium",
        });
      }
    }

    return words;
  };

  const parseJsonData = (jsonData: string) => {
    const data = JSON.parse(jsonData);
    if (!Array.isArray(data)) {
      throw new Error("JSON must be an array of word objects");
    }

    return data
      .map((item) => ({
        word: item.word || "",
        pronunciation: item.pronunciation || "",
        meaning: item.meaning || "",
        example: item.example || "",
        partOfSpeech: item.partOfSpeech || "noun",
        difficulty: item.difficulty || "Medium",
      }))
      .filter((word) => word.word && word.meaning);
  };

  const handleImport = (format: "csv" | "json") => {
    try {
      setError("");
      let words: any[] = [];

      if (format === "csv") {
        if (!csvText.trim()) {
          setError("Please enter CSV data or upload a file");
          return;
        }
        words = parseCsvData(csvText);
      } else {
        if (!jsonText.trim()) {
          setError("Please enter JSON data or upload a file");
          return;
        }
        words = parseJsonData(jsonText);
      }

      if (words.length === 0) {
        setError("No valid words found in the data");
        return;
      }

      onImportWords(words);
      setCsvText("");
      setJsonText("");
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid data format");
    }
  };

  const downloadTemplate = (format: "csv" | "json") => {
    let content = "";
    let filename = "";

    if (format === "csv") {
      content =
        "word,pronunciation,meaning,example,partOfSpeech,difficulty\n" +
        'entrepreneur,"/ˌɑːntrəprəˈnɜːr/","A person who starts and runs a business","She became a successful entrepreneur",noun,Medium\n' +
        'resilient,"/rɪˈzɪliənt/","Able to recover quickly from difficulties","The team was resilient after the setback",adjective,Hard';
      filename = "vocabulary-template.csv";
    } else {
      content = JSON.stringify(
        [
          {
            word: "entrepreneur",
            pronunciation: "/ˌɑːntrəprəˈnɜːr/",
            meaning: "A person who starts and runs a business",
            example: "She became a successful entrepreneur",
            partOfSpeech: "noun",
            difficulty: "Medium",
          },
          {
            word: "resilient",
            pronunciation: "/rɪˈzɪliənt/",
            meaning: "Able to recover quickly from difficulties",
            example: "The team was resilient after the setback",
            partOfSpeech: "adjective",
            difficulty: "Hard",
          },
        ],
        null,
        2
      );
      filename = "vocabulary-template.json";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import Words
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Vocabulary Words</DialogTitle>
          <DialogDescription>
            Import words from CSV or JSON format. You can paste data directly or
            upload a file.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="csv" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="csv">CSV Format</TabsTrigger>
            <TabsTrigger value="json">JSON Format</TabsTrigger>
          </TabsList>

          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>CSV Data</Label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadTemplate("csv")}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Template
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Upload File
                  </Button>
                </div>
              </div>
              <Textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder='word,pronunciation,meaning,example,partOfSpeech,difficulty&#10;entrepreneur,"/ˌɑːntrəprəˈnɜːr/","A person who starts a business","She is an entrepreneur",noun,Medium'
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            <Button
              onClick={() => handleImport("csv")}
              className="w-full bg-gradient-indigo-purple hover:opacity-90"
            >
              Import CSV Data
            </Button>
          </TabsContent>

          <TabsContent value="json" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>JSON Data</Label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadTemplate("json")}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Template
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Upload File
                  </Button>
                </div>
              </div>
              <Textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='[{"word": "entrepreneur", "pronunciation": "/ˌɑːntrəprəˈnɜːr/", "meaning": "A person who starts a business", "example": "She is an entrepreneur", "partOfSpeech": "noun", "difficulty": "Medium"}]'
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            <Button
              onClick={() => handleImport("json")}
              className="w-full bg-gradient-indigo-purple hover:opacity-90"
            >
              Import JSON Data
            </Button>
          </TabsContent>
        </Tabs>

        {/* {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json"
          onChange={handleFileUpload}
          className="hidden"
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
