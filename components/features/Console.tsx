"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { dbClient } from "@/lib/api";

type CommandHistory = {
  command: string;
  output: string | React.ReactNode; // Updated to allow React components for rich formatting
  type: "success" | "error" | "info";
  timestamp: Date;
};

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

  const parseCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const action = parts[0].toLowerCase();
    const args = parts.slice(1);
    return { action, args };
  };

  // Helper function to format search results
  const formatSearchResults = (results: SearchResults) => {
    const length = results.results.length;
    return (
      <div className="space-y-2">
        <div className="text-blue-400">Found {length} results:</div>
        {results.results.map((result, index) => (
          <div key={index} className="pl-4 border-l-2 border-zinc-800">
            <div className="text-zinc-300">Key: {result.Key}</div>
            <div className="text-zinc-400">Value: {result.Value}</div>
            <div className="text-zinc-500">
              Score: {result.Score?.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
          console.log("Search result from API:", searchResult);
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
      className="w-full max-w-3xl mx-auto p-4"
    >
      <div className="rounded-lg border border-zinc-800 bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-2 border-b border-zinc-800 p-4">
          <Terminal className="h-5 w-5 text-blue-500" />
          <h3 className="font-mono text-sm text-zinc-400">GhastlyDB Console</h3>
        </div>

        <div className="p-4 font-mono text-sm space-y-2 max-h-[400px] overflow-y-auto">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`${
                entry.type === "error"
                  ? "text-red-400"
                  : entry.type === "success"
                    ? "text-green-400"
                    : "text-zinc-300"
              }`}
            >
              {entry.command && (
                <div className="opacity-60"> {entry.command}</div>
              )}
              <div className="whitespace-pre-wrap">
                {typeof entry.output === "string" ? entry.output : entry.output}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="border-t border-zinc-800 p-4">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="font-mono text-sm bg-transparent border-zinc-800"
              placeholder="Type a command..."
              spellCheck={false}
              autoComplete="off"
            />
            <Button type="submit" variant="outline">
              Enter
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
