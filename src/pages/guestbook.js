import React, { useState } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import "../css/custom.css";
const guestbookData = require("../data/guestbook.json");

function GuestbookContent() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const approvedEntries = guestbookData
    .filter((entry) => entry.approved)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !message.trim()) {
      setError("Name and message are required");
      return;
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "guestbook",
          name: name.trim(),
          message: message.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName("");
        setMessage("");
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Entries Section */}
      <div>
        <div className="flex items-center gap-2 mb-6 font-mono">
          <span className="text-green-400">$</span>
          <span className="text-gray-600 dark:text-gray-400">
            tail -f /var/log/guestbook.log
          </span>
        </div>
        <div className="space-y-4">
          {approvedEntries.length === 0 ? (
            <p className="text-gray-500 ml-4">No entries yet. Be the first!</p>
          ) : (
            approvedEntries.map((entry) => (
              <div
                key={entry.id}
                className="border-l-2 border-gray-600 dark:border-gray-500 pl-4 py-2 ml-4"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-yellow-500 font-mono">[{entry.date}]</span>
                  <span className="text-green-400 font-semibold">{entry.name}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                  "{entry.message}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sign Form Section */}
      <div>
        <div className="flex items-center gap-2 mb-6 font-mono">
          <span className="text-green-400">$</span>
          <span className="text-gray-600 dark:text-gray-400">./sign-guestbook.sh</span>
        </div>

        {submitted ? (
          <div className="ml-4 space-y-2">
            <p className="text-green-400">✓ Message submitted successfully!</p>
            <p className="text-gray-500 text-sm">
              Your message will appear after review.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-cyan-400 hover:text-cyan-300 text-sm underline"
            >
              Sign again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ml-4 space-y-4 max-w-lg">
            {/* Honeypot field for spam protection */}
            <input type="hidden" name="form-name" value="guestbook" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>
            {error && <p className="text-red-400 text-sm">Error: {error}</p>}

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Enter your name:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">$</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="anonymous"
                  maxLength={50}
                  className="flex-1 bg-transparent border-b border-gray-600 text-gray-900 dark:text-white outline-none focus:border-cyan-400 px-1 py-1 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Enter your message:
              </label>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 mt-2">$</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  maxLength={280}
                  rows={3}
                  className="flex-1 bg-transparent border border-gray-600 rounded text-gray-900 dark:text-white outline-none focus:border-cyan-400 px-2 py-1 resize-none font-mono"
                />
              </div>
              <p className="text-gray-600 text-xs mt-1 ml-5">
                {message.length}/280 characters
              </p>
            </div>

            <button
              type="submit"
              className="ml-5 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm rounded transition-colors font-mono"
            >
              ./submit.sh
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function GuestbookPage() {
  return (
    <Layout
      title="Guestbook"
      description="Sign the guestbook and leave a message"
    >
      <main className="px-4 py-12">
        <div className="max-w-[96rem] mx-auto font-mono">
          {/* Terminal header */}
          <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 flex-1 text-center">
                ~/guestbook
              </span>
            </div>
            <div className="bg-gray-100 dark:bg-black p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-700 dark:text-white ml-2">
                  cat README.md
                </span>
              </div>
              <div className="ml-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  Welcome to the guestbook! Leave a message, say hi, or share
                  what brought you here.
                </p>
                <p className="text-gray-500 text-xs">
                  // Messages are moderated before appearing
                </p>
              </div>
            </div>
          </div>
          <BrowserOnly fallback={<div>Loading...</div>}>
            {() => <GuestbookContent />}
          </BrowserOnly>
        </div>
      </main>
    </Layout>
  );
}
