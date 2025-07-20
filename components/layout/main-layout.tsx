"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { EditorPane } from "./editor-pane";
import { PreviewPane } from "./preview-pane";
import { X, Sparkles, Zap, Download, Eye, Moon, UserCheck, ChevronUp, ChevronDown } from "lucide-react";

const STORAGE_KEY = "markdown-editor-content";
const SEO_SECTION_KEY = "seo-section-dismissed";

function SEOContentSection() {
  const [panelState, setPanelState] = useState<"closed" | "half" | "full">("half");
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(SEO_SECTION_KEY);
    if (dismissed === "true") {
      setIsDismissed(true);
      setPanelState("closed");
    } else {
      // Show panel after a short delay for better UX
      setTimeout(() => setPanelState("half"), 1000);
    }
  }, []);

  const handleClose = () => {
    setPanelState("closed");
    setIsDismissed(true);
    localStorage.setItem(SEO_SECTION_KEY, "true");
  };

  const togglePanel = () => {
    if (panelState === "half") {
      setPanelState("full");
    } else if (panelState === "full") {
      setPanelState("half");
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Backdrop overlay when fully opened */}
      {panelState === "full" && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setPanelState("half")}
        />
      )}
      
      {/* Slide-up panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-50/95 via-white/90 to-purple-50/95 dark:from-blue-950/95 dark:via-gray-900/90 dark:to-purple-950/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 rounded-t-2xl shadow-2xl transition-transform duration-500 ease-out ${
          panelState === "closed" 
            ? "translate-y-full" 
            : panelState === "half"
            ? "translate-y-1/2"
            : "translate-y-0"
        }`}
        style={{ 
          height: panelState === "full" ? "90vh" : "50vh",
          transition: "transform 0.5s ease-out, height 0.3s ease-out"
        }}
      >
        {/* Panel header with drag handle */}
        <div className="relative">
          <button
            onClick={togglePanel}
            className="w-full p-4 flex flex-col items-center gap-2 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors rounded-t-2xl"
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              {panelState === "half" ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Learn more about our converter</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-sm font-medium">Minimize</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </div>
          </button>
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Free Markdown to HTML Converter
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your Markdown documents into beautiful, semantic HTML instantly. 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> No registration required</span> — Start converting now!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Why Choose Our Converter?
                </h2>
                <div className="space-y-3">
                  {[
                    { icon: Eye, text: "Real-time preview", desc: "See your HTML output as you type" },
                    { icon: Sparkles, text: "Syntax highlighting", desc: "Beautiful code formatting with colors" },
                    { icon: Download, text: "Instant export", desc: "Copy to clipboard or download HTML files" },
                    { icon: Moon, text: "Dark mode support", desc: "Work comfortably any time of day" },
                    { icon: UserCheck, text: "No sign-up needed", desc: "Start converting immediately, completely free" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.text}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-xs">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-500" />
                  Perfect For Everyone
                </h2>
                <div className="grid gap-3">
                  {[
                    { role: "Developers", task: "Convert README files and documentation" },
                    { role: "Bloggers", task: "Transform Markdown posts to HTML" },
                    { role: "Technical Writers", task: "Create clean, professional documentation" },
                    { role: "Students", task: "Convert notes and assignments to web format" },
                    { role: "Content Creators", task: "Generate HTML for websites and platforms" }
                  ].map((user, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-900/30 rounded-lg border border-blue-200/50 dark:border-purple-800/50">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">{user.role}</h3>
                      <p className="text-blue-700 dark:text-blue-200 text-xs">{user.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                How to Convert Markdown to HTML
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { step: "1", title: "Write or Paste", desc: "Add your Markdown content in the left editor", icon: "📝" },
                  { step: "2", title: "Watch Preview", desc: "See real-time HTML preview on the right", icon: "👁️" },
                  { step: "3", title: "Export HTML", desc: "Copy code or download as a file", icon: "⬇️" }
                ].map((step, index) => (
                  <div key={index} className="text-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg">
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">Step {step.step}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Full Markdown Support
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {["Headers", "Code Blocks", "Lists", "Links", "Images", "Tables", "Blockquotes", "Bold & Italic", "Strikethrough", "Horizontal Rules"].map((feature, index) => (
                  <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-200/50 dark:border-blue-700/50">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
      <SEOContentSection />
    </div>
  );
}