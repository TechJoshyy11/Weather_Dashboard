import type { PropsWithChildren } from "react";
import Header from "./header";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-linear-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-12 supports-backdrop-filter:bg-background/60">
        <div className="container mx-aut px-4 text-center text-gray-200">
          <p>Made with 💖 Joshua Gesta</p>
        </div>
      </footer>
    </div>
  );
};

export default layout;
