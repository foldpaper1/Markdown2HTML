"use client";

import { useState, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { Copy, Download, Check } from "lucide-react";
import React from "react";

interface PreviewPaneProps {
  markdown: string;
}

export function PreviewPane({ markdown }: PreviewPaneProps) {
  const [viewMode, setViewMode] = useState<"rendered" | "html">("rendered");
  const [copied, setCopied] = useState(false);

  // Convert markdown to HTML string
  const getHtmlOutput = useCallback(async (markdownText: string) => {
    if (!markdownText.trim()) return "";
    try {
      const result = await remark().use(remarkHtml).process(markdownText);
      return result.toString();
    } catch (error) {
      return "Error converting markdown to HTML";
    }
  }, []);

  const [htmlOutput, setHtmlOutput] = useState("");

  // Update HTML output when markdown or view mode changes
  React.useEffect(() => {
    if (viewMode === "html" && markdown.trim()) {
      getHtmlOutput(markdown).then(setHtmlOutput);
    }
  }, [markdown, viewMode, getHtmlOutput]);

  // Copy HTML to clipboard
  const copyToClipboard = async () => {
    if (!markdown.trim()) return;
    
    try {
      const html = await getHtmlOutput(markdown);
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  // Template-specific classes - only minimal now
  const templateClasses = useMemo(() => {
    const baseClasses = "prose prose-gray max-w-none font-serif dark:prose-invert";
    
    // Minimal template (only option)
    return `${baseClasses} prose-headings:font-serif prose-headings:font-semibold prose-h1:text-2xl prose-h1:mb-4 prose-h2:text-xl prose-h2:mb-3 prose-h3:text-lg prose-h3:mb-2 prose-p:mb-3 prose-p:leading-relaxed prose-ul:mb-3 prose-ol:mb-3 prose-li:mb-1 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-gray-50 prose-pre:border prose-pre:rounded-lg prose-pre:p-3 prose-pre:overflow-x-auto dark:prose-code:bg-gray-800 dark:prose-pre:bg-gray-800 dark:prose-blockquote:border-gray-600 p-4 sm:p-6 sm:prose-h1:text-3xl sm:prose-h1:mb-6 sm:prose-h2:text-2xl sm:prose-h2:mb-4 sm:prose-h3:text-xl sm:prose-h3:mb-3 sm:prose-p:mb-4 sm:prose-ul:mb-4 sm:prose-ol:mb-4 sm:prose-pre:p-4`;
  }, []);
  
  // Download HTML as file
  const downloadHtml = async () => {
    if (!markdown.trim()) return;
    
    try {
      const html = await getHtmlOutput(markdown);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "markdown-output.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download HTML:", error);
    }
  };
  
  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base">
            Preview
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 p-1 text-xs sm:text-sm">
            <button
              onClick={() => setViewMode("rendered")}
              className={`px-2 py-1 font-medium rounded-md transition-colors sm:px-3 ${
                viewMode === "rendered"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Rendered View
            </button>
            <button
              onClick={() => setViewMode("html")}
              className={`px-2 py-1 font-medium rounded-md transition-colors sm:px-3 ${
                viewMode === "html"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              HTML View
            </button>
          </div>
        </div>
        </div>
      </div>
      <div className="overflow-y-scroll bg-white dark:bg-gray-900 border-l border-r border-gray-200 dark:border-gray-700" style={{ height: 'calc(100vh - 220px)', scrollbarWidth: 'thin' }}>
        {viewMode === "rendered" ? (
          <div className={templateClasses}>
            {markdown.trim() ? (
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
              >
                {markdown}
              </ReactMarkdown>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
                <p className="text-lg">Start typing markdown to see the preview</p>
                <p className="text-sm mt-2">
                  Try headings, lists, code blocks, and more!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            {markdown.trim() ? (
              <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {htmlOutput || "Converting to HTML..."}
              </pre>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
                <p className="text-lg">Start typing markdown to see the HTML output</p>
                <p className="text-sm mt-2">
                  The raw HTML will be displayed here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 rounded-b-lg border-l border-r border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            onClick={copyToClipboard}
            disabled={!markdown.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy HTML"}
          </button>
          <button
            onClick={downloadHtml}
            disabled={!markdown.trim()}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
        </div>
      </div>
    </div>
  );
}