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
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-base font-semibold tracking-tight text-foreground">
          Мониторинг карт
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
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
                className="cursor-not-allowed opacity-60"
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