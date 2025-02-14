"use client";
import { motion } from "framer-motion";
import GhastlyLogo from "@/components/ui/Logo";
import { Brain, HardDrive, Container } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center justify-center space-y-8 text-center px-4 py-16 md:py-24"
    >
      {/* Logo and Title - Made responsive */}
      <div className="flex items-center gap-2 mb-4 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12">
          <GhastlyLogo />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          ghastly<span className="text-blue-500">DB</span>
        </h1>
      </div>

      {/* Main Heading - Improved responsive text sizing */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl">
        a lightweight vector database built from{" "}
        <span className="text-blue-500">first principles</span>
      </h2>

      {/* Description - Better spacing and text size */}
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
        this is *not* a production grade database! it&apos;s just something i
        wanted to build because i was curious.
      </p>

      {/* Feature Grid - Improved grid responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-4xl">
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

      {/* Buttons Section - Made responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-3xl"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            className="btn-skeuomorphic w-full sm:w-auto"
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
            className="btn-skeuomorphic w-full sm:w-auto"
          >
            <span className="mr-2">🐳</span>
            Deploy your own
          </a>

          <a
            href="https://github.com/ahhcash/ghastly?tab=readme-ov-file#building-from-source"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-skeuomorphic github w-full sm:w-auto"
          >
            <span className="mr-2">⚡</span>
            Build from source
          </a>
        </div>
      </motion.div>

      {/* Why section - Improved spacing and readability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="w-full max-w-3xl mx-auto mt-16 md:mt-24 px-4 text-center"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
          why did i build this? 🤔
        </h2>

        <div className="text-zinc-400 space-y-6 text-base md:text-lg">
          <p>
            i had to perform a case study / vendor analysis for a vector DB
            migration task during an internship. that got me interested in how
            these things work under the hood, how vector arithmetic works etc.
          </p>

          <p>
            i decided the best way to learn was to build one from scratch.
            ghastlyDB uses a{" "}
            <a
              href="https://www.scylladb.com/glossary/log-structured-merge-tree/"
              className="text-blue-500 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Log-Structured Merge (LSM) tree architecture{" "}
            </a>
            (like RocksDB or ScyllaDB), with a memory-mapped memtable for writes
            and persistent SSTables on disk. the actual storage is powered by a
            skiplist index built from the ground up. and the vector similarity
            search takes a simple kNN approach for now (hnsw coming soon,
            hopefully)
          </p>

          <p>
            right now, it&apos;s super basic - you can only do puts, gets,
            deletes, and semantic search. but i&apos;m actively working on
            adding more features like proper indexing, compaction, write-ahead
            logs and maybe full implementing the Redis API! also planning to add
            more embedding models and distance metrics. if you&apos;re curious
            about any of this stuff, the code is{" "}
            <a
              href="https://github.com/ahhcash/ghastly"
              className="text-blue-500 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source!
            </a>{" "}
            📚
          </p>

          <p className="text-zinc-500 text-sm mt-4">
            ps: this is not production ready yet! it&apos;s just a fun learning
            project. if you need a real vector db, check out{" "}
            <a
              href="https://weaviate.io"
              className="text-blue-500 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              weaviate
            </a>{" "}
            or{" "}
            <a
              href="https://milvus.io"
              className="text-blue-500 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              milvus
            </a>
            ! 🚀
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const features = [
  {
    title: "multiple embeddings",
    description: "text-embedding-3-small, colBERT-ir/v2, NVEmbed/v2",
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
