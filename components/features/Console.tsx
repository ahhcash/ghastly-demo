"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { dbClient } from "@/lib/api";

// Define our type structure for command history
type CommandHistory = {
  command: string;
  output: string | React.ReactNode;
  type: "success" | "error" | "info";
  timestamp: Date;
};

// Types for search results structure
type SearchResult = {
  Key: string;
  Value: string;
  Score: number;
};

type SearchResults = {
  results: SearchResult[];
};

export default function Console() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output:
        "Welcome to GhastlyDB CLI v0.1.0\nType 'help' to see available commands",
      type: "info",
      timestamp: new Date(),
    },
  ]);

  // Parse the command string into action and arguments
  const parseCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const action = parts[0].toLowerCase();
    const args = parts.slice(1);
    return { action, args };
  };

  // Format search results in a responsive way
  const formatSearchResults = (results: SearchResults) => {
    const length = results.results.length;
    return (
      <div className="space-y-2">
        <div className="text-blue-400">Found {length} results:</div>
        {results.results.map((result, index) => (
          <div
            key={index}
            className="pl-4 border-l-2 border-zinc-800 py-2 my-2"
          >
            <div className="text-zinc-300 break-words">Key: {result.Key}</div>
            <div className="text-zinc-400 break-words">
              Value: {result.Value}
            </div>
            <div className="text-zinc-500">
              Score: {result.Score?.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Handle command execution
  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const { action, args } = parseCommand(command);
    const response: CommandHistory = {
      command,
      output: "",
      type: "info",
      timestamp: new Date(),
    };

    try {
      switch (action) {
        case "help":
          response.output = `Available commands:
  put <key> <value>       - Store a key-value pair
  get <key>               - Retrieve a value by key
  delete <key>            - Delete a key-value pair
  search <query>          - Perform semantic search
  clear                   - Clear the console
  help                    - Show this help message`;
          response.type = "info";
          break;

        case "put":
          if (args.length < 2) {
            throw new Error("Usage: put <key> <value>");
          }
          const [key, ...valueParts] = args;
          const value = valueParts.join(" ");
          const putResult = await dbClient.put(key, value);
          response.output = putResult.message || "Stored successfully";
          response.type = putResult.success ? "success" : "error";
          break;

        case "get":
          if (args.length !== 1) {
            throw new Error("Usage: get <key>");
          }
          const getResult = await dbClient.get(args[0]);
          response.output = getResult.success
            ? `Value: ${getResult.data}`
            : getResult.message || "Key not found";
          response.type = getResult.success ? "success" : "error";
          break;

        case "delete":
          if (args.length !== 1) {
            throw new Error("Usage: delete <key>");
          }
          const deleteResult = await dbClient.delete(args[0]);
          response.output = deleteResult.message || "Key deleted successfully";
          response.type = deleteResult.success ? "success" : "error";
          break;

        case "search":
          if (args.length < 1) {
            throw new Error("Usage: search <query>");
          }
          const query = args.join(" ");
          const searchResult = await dbClient.search(query);
          response.output = searchResult.success
            ? formatSearchResults(searchResult.data)
            : "No results found";
          response.type = searchResult.success ? "success" : "info";
          break;

        case "clear":
          setHistory([
            {
              command: "",
              output: "Console cleared",
              type: "info",
              timestamp: new Date(),
            },
          ]);
          setCommand("");
          return;

        default:
          throw new Error(`Unknown command: ${action}`);
      }
    } catch (error) {
      response.output =
        error instanceof Error ? error.message : "An error occurred";
      response.type = "error";
    }

    setHistory((prev) => [...prev, response]);
    setCommand("");
  };

  return (
    <motion.div
      id="console"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Console Container with improved mobile padding */}
      <div className="rounded-lg border border-zinc-800 bg-black/50 backdrop-blur-sm overflow-hidden">
        {/* Console Header */}
        <div className="flex items-center gap-2 border-b border-zinc-800 p-4">
          <Terminal className="h-5 w-5 text-blue-500" />
          <h3 className="font-mono text-sm text-zinc-400">GhastlyDB Console</h3>
        </div>

        {/* Console Output Area */}
        <div className="p-4 font-mono text-sm space-y-2 min-h-[200px] max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`${
                entry.type === "error"
                  ? "text-red-400"
                  : entry.type === "success"
                    ? "text-green-400"
                    : "text-zinc-300"
              } break-words`}
            >
              {entry.command && (
                <div className="opacity-60 break-words">$ {entry.command}</div>
              )}
              <div className="whitespace-pre-wrap break-words">
                {typeof entry.output === "string" ? entry.output : entry.output}
              </div>
            </div>
          ))}
        </div>

        {/* Command Input Area */}
        <form onSubmit={handleCommand} className="border-t border-zinc-800 p-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 font-mono text-sm bg-transparent border-zinc-800"
              placeholder="Type a command..."
              spellCheck={false}
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Enter
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
