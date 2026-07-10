import { Link } from "@tanstack/react-router";
import { formatToday } from "@/lib/cards";

const nav = [
  { label: "Рейтинг", href: "#rating" },
  { label: "По задаче", href: "#task" },
  { label: "По странам", href: "#countries" },
  { label: "Как оформить", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-tight text-primary"
          aria-label="NHcard — на главную"
        >
          NHcard
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden text-xs text-muted-foreground md:inline">
            Обновлено: {formatToday()}
          </span>
          <a
            href="#rating"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            К рейтингу
          </a>
        </div>
      </div>
    </header>
  );
}