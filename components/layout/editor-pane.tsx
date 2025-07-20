"use client";

interface EditorPaneProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export function EditorPane({ markdown, setMarkdown }: EditorPaneProps) {
  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base">
            Markdown Editor
          </h2>
          <div style={{ width: '200px' }}></div> {/* Spacer to match preview header */}
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden border-l border-r border-gray-200 dark:border-gray-700" style={{ height: 'calc(100vh - 380px)' }}>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type or paste your Markdown here..."
          className="h-full w-full resize-none border-0 bg-transparent p-3 font-mono text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400 sm:p-4 sm:text-base overflow-y-auto"
        />
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 rounded-b-lg border-l border-r border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <div className="text-sm text-gray-500 dark:text-gray-400 px-4 py-2">
            {markdown.length} characters
          </div>
        </div>
      </div>
    </div>
  );
}