"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { EditorPane } from "./editor-pane";
import { PreviewPane } from "./preview-pane";

const STORAGE_KEY = "markdown-editor-content";

export function MainLayout() {
  const [markdown, setMarkdown] = useState("");

  // Load saved markdown from localStorage on component mount
  useEffect(() => {
    try {
      const savedMarkdown = localStorage.getItem(STORAGE_KEY);
      if (savedMarkdown) {
        setMarkdown(savedMarkdown);
      }
    } catch (error) {
      console.error("Failed to load saved markdown:", error);
    }
  }, []);

  // Save markdown to localStorage whenever it changes
  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      console.error("Failed to save markdown:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <div className="flex w-full flex-col md:grid md:grid-cols-2">
          <div className="flex-1 border-b border-gray-200 dark:border-gray-700 md:border-b-0 md:border-r">
            <EditorPane markdown={markdown} setMarkdown={handleMarkdownChange} />
          </div>
          <div className="flex-1">
            <PreviewPane markdown={markdown} />
          </div>
        </div>
      </main>
    </div>
  );
}