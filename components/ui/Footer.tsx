export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12">
      <div className="container flex items-center justify-center gap-1">
        <span className="text-sm text-zinc-500">Built with</span>
        <span className="text-red-500 animate-pulse">❤️</span>
        <span className="text-sm text-zinc-500">by</span>
        <a
          href="https://x.com/aahhcash"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
        >
          @aahhcash
        </a>
        <span className="text-sm text-zinc-500">on</span>
        <span className="text-sm text-zinc-500">X [dot] com</span>
      </div>
    </footer>
  );
}
