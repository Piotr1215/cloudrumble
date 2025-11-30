import React, { useState, useEffect, useRef } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { TypeAnimation } from "react-type-animation";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";

export default function TerminalHero() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [lastCommand, setLastCommand] = useState(null);
  const [showHelp, setShowHelp] = useState(true);
  const [inVimMode, setInVimMode] = useState(false);
  const [vimBuffer, setVimBuffer] = useState("");
  const [vimAttempts, setVimAttempts] = useState(0);
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
      action: () => "projects  videos  talks  blogs"
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
    "cd blogs": {
      description: "Go to blogs (Medium)",
      action: () => {
        history.push("/medium");
        return "Navigating to blogs...";
      }
    },
    vim: {
      hidden: true,
      action: () => {
        setInVimMode(true);
        setVimAttempts(0);
        setShowHelp(false);
        return null;
      }
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

  const handleVimCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    setVimAttempts(prev => prev + 1);

    const vimResponses = {
      ":q": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ You escaped vim!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":wq": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ You escaped vim AND saved your work!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
              <div className="text-cyan-400 text-sm">Efficiency level: Expert</div>
            </div>
          )
        };
      },
      ":q!": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Force quit successful!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
              <div className="text-yellow-400 text-sm">All unsaved changes discarded (there were none anyway)</div>
            </div>
          )
        };
      },
      ":x": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Saved and exited!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
              <div className="text-cyan-400 text-sm">A true vim wizard!</div>
            </div>
          )
        };
      },
      "ZZ": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited with ZZ!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
              <div className="text-purple-400 text-sm">Wow, someone actually knows the keyboard shortcuts!</div>
            </div>
          )
        };
      },
      "ZQ": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Quit without saving with ZQ!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
              <div className="text-purple-400 text-sm">A true vim master!</div>
            </div>
          )
        };
      },
      ":exit": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited vim!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":qa": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":qa!": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Force quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":qall": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":qall!": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Force quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":wqa": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Write all and quit!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":wqall": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Write all and quit!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":xa": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":xal": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":xall": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":quita": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":quital": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":quitall": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Quit all!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":wqal": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Write all and quit!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":exi": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited vim!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      },
      ":exil": () => {
        setInVimMode(false);
        setVimBuffer("");
        return {
          command: "vim",
          output: (
            <div className="space-y-2">
              <div className="text-green-400">✓ Exited vim!</div>
              <div className="text-gray-400 text-sm">Attempts: {vimAttempts + 1}</div>
            </div>
          )
        };
      }
    };

    if (vimResponses[trimmedCmd]) {
      const result = vimResponses[trimmedCmd]();
      setLastCommand(result);
      return;
    }

    // Funny responses for incorrect commands
    if (trimmedCmd) {
      const funnyResponses = [
        "Nice try, but that's not it...",
        "So close, yet so far away...",
        "Have you tried turning it off and on again?",
        "That's not how vim works, friend",
        "You're making this harder than it needs to be",
        "The year is 2025 and you're still stuck in vim",
        "Legend says some are still trying to exit vim to this day",
        "Your keyboard is not broken, you just need the right command",
        "This is why we can't have nice things",
        "404: Exit command not found",
        "This isn't Google, you can't just type anything",
        "Keep trying, you'll get there... eventually",
        "At this rate, you'll discover the answer by accident",
        "Fun fact: vim has been holding developers hostage since 1991"
      ];

      const randomResponse = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
      setVimBuffer(prev => prev + `\n${randomResponse}`);
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
      if (inVimMode) {
        handleVimCommand(currentCommand);
        setCurrentCommand("");
      } else {
        handleCommand(currentCommand);
      }
    }
  };

  // Focus input when clicking anywhere in the terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="no-underline-links px-4">
      <div className="max-w-[96rem] mx-auto">
        {/* Terminal Window */}
        <div className="rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black shadow-2xl overflow-hidden font-mono">
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
                <span className="text-gray-500 dark:text-gray-300">$</span>
                <span className="text-gray-900 dark:text-white ml-2">whoami</span>
              </div>
              <div className="ml-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-green-400 font-bold text-2xl whitespace-nowrap">Piotr Zaniewski</span>
                  <BrowserOnly fallback={<span className="text-gray-800 dark:text-gray-300 text-lg">Platform Engineer</span>}>
                    {() => (
                      <span className="text-gray-800 dark:text-gray-300 text-lg whitespace-nowrap overflow-hidden">
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

                <div className="text-gray-800 dark:text-gray-300 leading-relaxed space-y-2">
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
                    <span className="text-green-400 font-semibold">I love contributing</span> to open source projects like <span className="text-green-400 font-semibold">vCluster</span> for virtual Kubernetes clusters.
                    I build tools for terminal-focused developers including Neovim plugins, CLI utilities, and <span className="text-green-400 font-semibold">AI-powered</span> development workflows.
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

            {/* Vim Mode Display */}
            {inVimMode && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-300">$</span>
                  <span className="text-white ml-2">vim</span>
                </div>
                <div className="bg-black p-6 rounded text-sm leading-relaxed">
                  <div className="space-y-0.5 text-gray-500">
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                  </div>
                  <div className="text-center space-y-1 my-4">
                    <div className="text-white font-bold">VIM - Vi IMproved</div>
                    <div className="text-gray-400">~</div>
                    <div className="text-gray-300">version 8.2.2121</div>
                    <div className="text-gray-300">by Bram Moolenaar et al.</div>
                    <div className="text-gray-300">Modified by team+vim@tracker.debian.org</div>
                    <div className="text-gray-300">Vim is open source and freely distributable</div>
                    <div className="text-gray-400">~</div>
                  </div>
                  <div className="space-y-0.5 text-gray-500">
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                    <div>~</div>
                  </div>
                  {vimBuffer && (
                    <div className="text-red-400 text-sm space-y-1 mt-4 border-t border-gray-800 pt-2">
                      {vimBuffer.split('\n').filter(line => line.trim()).map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-gray-800 pt-2 mt-4 flex justify-between items-center">
                    <div className="text-white text-xs">
                      <span className="bg-gray-700 px-2 py-0.5">NORMAL</span>
                    </div>
                    <div className="text-gray-500 text-xs">Attempt {vimAttempts + 1}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Help Display */}
            {showHelp && !inVimMode && (
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
              {!inVimMode && (
                <>
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-300">$</span>
                </>
              )}
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="ml-2 bg-transparent border-none outline-none text-white font-mono flex-1 caret-white"
                placeholder={inVimMode ? "Enter command to exit vim..." : "Type 'help' for commands..."}
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
