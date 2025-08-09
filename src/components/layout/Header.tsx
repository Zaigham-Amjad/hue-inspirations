import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { pathname } = useLocation();

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 text-sm font-medium transition-colors",
        pathname === to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
      aria-current={pathname === to ? "page" : undefined}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary inline-flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground text-sm font-bold">H</span>
          </div>
          <span className="sr-only sm:not-sr-only sm:font-semibold sm:text-foreground">Hue Inspirations</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
