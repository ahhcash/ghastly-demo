import HeroSection from "@/components/sections/HeroSection";
import Console from "@/components/features/Console";
import Footer from "@/components/ui/Footer";
import { GithubIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900/50 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      </div>

      <div className="fixed top-6 right-6 z-50">
        <a
          href="https://github.com/ahhcash/ghastly"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-100 transition-colors inline-flex items-center justify-center"
          aria-label="View on GitHub"
        >
          <GithubIcon className="w-6 h-6" />
        </a>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <HeroSection />
        <Console />
        <Footer />
      </div>
    </main>
  );
}
