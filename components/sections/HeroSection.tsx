"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import GhastlyLogo from "@/components/ui/Logo";
import { Brain, HardDrive, Globe, Container } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-8 text-center px-4 py-24"
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-2 mb-8">
        <GhastlyLogo />
        <h1 className="text-4xl font-bold tracking-tighter">
          ghastly<span className="text-blue-500">DB</span>
        </h1>
      </div>

      {/* Main Heading */}
      <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl max-w-3xl">
        a lightweight vector database built from{" "}
        <span className="text-blue-500">first principles</span>
      </h2>

      {/* Description */}
      <p className="text-zinc-400 text-xl max-w-2xl">
        this is *not* a production grade database! it&apos;s just something i
        wanted to build because i was curious.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm"
          >
            <feature.icon className="h-6 w-6 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-zinc-400 text-sm text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Try Console Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex gap-4 mt-8">
          <button
            className="btn-skeuomorphic"
            onClick={() =>
              document
                .getElementById("console")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Try the Console
          </button>

          <a
            href="https://github.com/ahhcash/ghastly/pkgs/container/ghastly"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-skeuomorphic"
          >
            <span className="mr-2">🐳</span>
            Deploy your own
          </a>

          <a
            href="https://github.com/ahhcash/ghastly?tab=readme-ov-file#building-from-source"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-skeuomorphic github"
          >
            <span className="mr-2">⚡</span>
            Build from source
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

const features = [
  {
    title: "multiple embeddings",
    description: "text-embedding-3-small, colBERT-ir/v2, NVEmbed/v2 ",
    icon: Brain,
  },
  {
    title: "LSM tree storage",
    description: "the coolest data structure i've seen",
    icon: HardDrive,
  },
  {
    title: "containerized",
    description: "because managing dependencies is hard",
    icon: Container,
  },
];
