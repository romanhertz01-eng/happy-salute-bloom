import { Link } from "@tanstack/react-router";

// Б1 / К1. Состав по решению владельца: Логотип · Рейтинг · О проекте · Партнёрам.
// Пункт «Как мы оцениваем» вынесен в футер и в блок оценки (не в основную навигацию).
// TODO(routes): /about и /partners пока не созданы — см. PROJECT_TODO.md.
const NAV = [
  { label: "Рейтинг", to: "/" as const },
  { label: "О проекте", to: "/about" as const },
  { label: "Партнёрам", to: "/partners" as const },
];

export function Header() {
  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-[15px] font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Мониторинг&nbsp;карт
        </Link>
        <nav className="flex items-center gap-7 text-[13.5px] text-foreground/70">
          {NAV.map((item) =>
            item.to === "/" ? (
              <Link
                key={item.to}
                to="/"
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground" }}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              // Плейсхолдер: маршрут не создан в этой итерации.
              <a
                key={item.to}
                href={item.to}
                aria-disabled="true"
                className="cursor-not-allowed opacity-70 transition-colors hover:text-foreground"
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}