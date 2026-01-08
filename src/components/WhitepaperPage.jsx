import React, { useState, useEffect } from "react";

export default function WhitepaperPage() {
  // Replace this URL with your actual whitepaper URL
  const whitepaperUrl = process.env.REACT_APP_WHITEPAPER_URL || "https://plausible-tin-01d.notion.site/ebd//2e1b1eccadb280fd9542c92082c42004";
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // Check if iframe is blocked after a short delay
    const timer = setTimeout(() => {
      // Try to detect if iframe failed to load
      const iframe = document.querySelector('iframe[title="Whitepaper Documentation"]');
      if (iframe) {
        try {
          // If we can't access the iframe content, it's likely blocked
          iframe.contentWindow.document;
        } catch (e) {
          // Cross-origin or blocked - this is expected for Notion
          // Don't set error immediately, let user see the iframe attempt
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full px-4 py-12">

        {/* Iframe container with fallback */}
        <div className="w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          {iframeError ? (
            <div className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📄</div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  View Whitepaper
                </h2>
                <p className="text-slate-600 mb-6">
                  The whitepaper cannot be embedded directly. Click the button below to open it in a new tab.
                </p>
                <a
                  href={whitepaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Open Whitepaper
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-[80px] bg-white z-20 pointer-events-none"
              />
              <iframe
                src={whitepaperUrl}
                className="w-full border-0 relative z-10"
                title="Whitepaper Documentation"
                allow="fullscreen"
                loading="lazy"
                onError={() => setIframeError(true)}
                style={{
                  height: 'calc(100vh - 200px)',
                  minHeight: '800px',
                  marginTop: '-80px',
                  paddingTop: '80px',
                  display: 'block'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
