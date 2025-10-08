import React, { useState, useEffect, useRef } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { TypeAnimation } from "react-type-animation";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";

export default function TerminalHero() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [lastCommand, setLastCommand] = useState(null);
  const [showHelp, setShowHelp] = useState(true);
  const inputRef = useRef(null);
  const history = useHistory();

  const commands = {
    help: {
      description: "Show available commands",
      action: () => {
        setShowHelp(true);
        return null;
      }
    },
    clear: {
      description: "Clear command history",
      action: () => {
        setLastCommand(null);
        setShowHelp(false);
        return null;
      }
    },
    ls: {
      description: "List available sections",
      action: () => "projects  videos  talks  blog"
    },
    "cd projects": {
      description: "Go to projects page",
      action: () => {
        history.push("/projects");
        return "Navigating to projects...";
      }
    },
    "cd videos": {
      description: "Go to videos page",
      action: () => {
        history.push("/youtube");
        return "Navigating to videos...";
      }
    },
    "cd talks": {
      description: "Go to talks page",
      action: () => {
        history.push("/talks");
        return "Navigating to talks...";
      }
    },
    "cd blog": {
      description: "Go to blog",
      action: () => {
        history.push("/blog");
        return "Navigating to blog...";
      }
    },
    vim: {
      hidden: true,
      action: () => "Pro tip: I use Neovim btw"
    },
    nvim: {
      hidden: true,
      action: () => "Ah, a person of culture! Check out beam.nvim and pairup.nvim"
    },
    "sudo su": {
      hidden: true,
      action: () => {
        return (
          <div>
            <div className="text-green-400 mb-2">Access granted! Here are all the hidden commands:</div>
            <div className="space-y-1 text-sm ml-4">
              <div className="text-yellow-400">vim</div>
              <div className="text-yellow-400">nvim</div>
              <div className="text-yellow-400">cowsay</div>
              <div className="text-yellow-400">fortune</div>
              <div className="text-yellow-400">sudo rm -rf /</div>
              <div className="text-yellow-400">sudo rm -rf /*</div>
            </div>
          </div>
        );
      }
    },
    "sudo rm -rf /": {
      hidden: true,
      action: () => "Deleting root partition... goodbye cruel world"
    },
    "sudo rm -rf /*": {
      hidden: true,
      action: () => "Deleting root partition... goodbye cruel world"
    },
    cowsay: {
      hidden: true,
      action: () => (
        <pre className="text-gray-300 text-xs whitespace-pre bg-black p-4 rounded">
{` __________________________________________
/ Kubernetes: Making simple things hard   \\
\\ and hard things possible since 2014     /
 ------------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
        </pre>
      )
    },
    fortune: {
      hidden: true,
      action: () => {
        const fortunes = [
          "\"Make it work, make it right, make it fast.\" - Kent Beck",
          "\"The best way to predict the future is to implement it.\" - DHH",
          "\"Pragmatic beats perfect.\" - Piotr's principle",
          "\"Kubernetes is not a destination, it's a journey.\"",
          "\"In terminal we trust.\""
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];
      }
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    const newCommand = { command: cmd, output: null };

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd].action();
      newCommand.output = output;
    } else {
      newCommand.output = `command not found: ${cmd}. Type 'help' for available commands.`;
    }

    // Hide help menu when any command is executed (except help itself)
    if (trimmedCmd !== "help") {
      setShowHelp(false);
    }

    setLastCommand(newCommand);
    setCurrentCommand("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand);
    }
  };

  // Focus input when clicking anywhere in the terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="no-underline-links px-4">
      <div className="mx-auto max-w-7xl">
        {/* Terminal Window */}
        <div className="rounded-lg border-2 border-gray-700 bg-black shadow-2xl overflow-hidden font-mono">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"></div>
            </div>
            <div className="flex-1 text-center text-xs text-gray-400 font-mono">
              piotr@cloudrumble: ~
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 text-base min-h-[400px]">
            {/* whoami command */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-300">$</span>
                <span className="text-white ml-2">whoami</span>
              </div>
              <div className="ml-4 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-green-400 font-bold text-2xl">Piotr Zaniewski:</span>
                  <BrowserOnly fallback={<span className="text-gray-300 text-lg">Platform Engineer</span>}>
                    {() => (
                      <span className="text-gray-300 text-lg">
                        <TypeAnimation
                          sequence={[
                            "Platform Engineer",
                            2000,
                            "Engineering Manager",
                            2000,
                            "Developer Advocate",
                            2000,
                            "Cloud Native Expert",
                            2000,
                          ]}
                          speed={75}
                          repeat={Infinity}
                        />
                      </span>
                    )}
                  </BrowserOnly>
                </div>

                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>
                    I lead <span className="text-green-400 font-semibold">platform, operations, and DevOps teams</span> while driving technical excellence across
                    cloud-native infrastructure. My expertise spans Kubernetes, GitOps, and building tools
                    that streamline engineering workflows and developer productivity.
                  </p>
                  <p>
                    As a technical speaker and <span className="text-green-400 font-semibold">developer advocate</span>, I deliver deeply technical talks driven by live demos
                    and real-world experience. I've presented at KCD (Kubernetes Community Days), SRE Day,
                    and engineering summits—sessions that are hands-on, honest, and <span className="text-green-400 font-semibold">pragmatic</span>.
                  </p>
                  <p>
                    <span className="text-green-400 font-semibold">I love contributing</span> to CNCF projects like Crossplane, <span className="text-green-400 font-semibold">vCluster</span>, and OpenGitOps, and building open source
                    tools for terminal-focused developers including Neovim plugins, CLI utilities, and <span className="text-green-400 font-semibold">AI-powered</span> development workflows.
                  </p>
                </div>

                <div className="pt-3">
                  <a
                    href="https://www.linkedin.com/in/piotr-zaniewski/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold hover:no-underline"
                  >
                    <span>→ Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Last Command Output */}
            {lastCommand && (
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-300">$</span>
                  <span className="text-white ml-2">{lastCommand.command}</span>
                </div>
                {lastCommand.output && (
                  <div className="ml-4 mt-1">
                    {typeof lastCommand.output === 'string' ? (
                      <div className="text-gray-300">{lastCommand.output}</div>
                    ) : (
                      lastCommand.output
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Help Display */}
            {showHelp && (
              <div className="mb-4 ml-4 border-l-2 border-cyan-500 pl-4">
                <div className="text-cyan-400 font-semibold mb-2">Available Commands:</div>
                <div className="space-y-1 text-sm">
                  {Object.entries(commands)
                    .filter(([_, cmd]) => !cmd.hidden)
                    .map(([cmd, { description }]) => (
                      <div key={cmd} className="flex gap-4">
                        <span className="text-yellow-400 w-32">{cmd}</span>
                        <span className="text-gray-400">{description}</span>
                      </div>
                    ))}
                </div>
                <div className="text-gray-500 text-xs mt-3 italic">
                  Psst... there are some hidden commands too.
                </div>
              </div>
            )}

            {/* Interactive Input */}
            <div
              className="mt-6 flex items-center gap-2 cursor-text"
              onClick={focusInput}
            >
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-300">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="ml-2 bg-transparent border-none outline-none text-white font-mono flex-1 caret-white"
                placeholder="Type 'help' for commands..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
