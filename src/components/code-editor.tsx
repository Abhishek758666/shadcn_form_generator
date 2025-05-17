"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language,
  placeholder = "// Write your code here...",
  className,
}: CodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Card
        className={cn(
          "font-mono text-sm p-4 bg-zinc-900 text-zinc-100 border-zinc-700 min-h-[300px]",
          className
        )}
      >
        <div className="animate-pulse">{placeholder}</div>
      </Card>
    );
  }

  // Apply syntax highlighting (simplified version)
  // const highlightZodSyntax = (code: string) => {
  //   // This is a very simplified version of syntax highlighting
  //   // In a real app, you'd use a proper syntax highlighter like Prism or highlight.js
  //   return code
  //     .replace(/(import .* from .*)/g, '<span class="text-blue-400">$1</span>')
  //     .replace(/(const|let|var)/g, '<span class="text-blue-400">$1</span>')
  //     .replace(/(z\.object)/g, '<span class="text-yellow-400">$1</span>')
  //     .replace(
  //       /(z\.(string|number|boolean|date|enum|array))/g,
  //       '<span class="text-green-400">$1</span>'
  //     )
  //     .replace(/(\w+):/g, '<span class="text-purple-400">$1</span>:')
  //     .replace(/($$.*$$)/g, '<span class="text-yellow-200">$1</span>')
  //     .replace(
  //       /(\.min|\.max|\.email|\.optional|\.default|\.describe)/g,
  //       '<span class="text-cyan-400">$1</span>'
  //     );
  // };

  return (
    <Card
      className={cn(
        "font-mono text-sm p-4 bg-zinc-900 text-zinc-100 border-zinc-700 relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-800 flex items-center px-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-zinc-400">{language}</div>
      </div>
      <div className="mt-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none resize-none"
          style={{
            fontFamily: "Menlo, Monaco, 'Courier New', monospace",
            lineHeight: 1.5,
            tabSize: 2,
            minHeight: "300px",
          }}
        />
      </div>
    </Card>
  );
}
