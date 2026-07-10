// Б8 / К8. Дисклеймер · официальный канал · приём жалоб · служебная навигация.
// Тексты — плейсхолдеры (FM-62, FM-63, FM-64), см. PROJECT_TODO.md.
// Ссылки на служебные страницы отображаются, но помечены как недоступные до
// создания соответствующих маршрутов.
const LINKS = [
  { label: "Как мы оцениваем", to: "/methodology" },
  { label: "О проекте", to: "/about" },
  { label: "Партнёрам", to: "/partners" },
  { label: "Пользовательское соглашение", to: "/legal/terms" },
  { label: "Политика конфиденциальности", to: "/legal/privacy" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        <p className="max-w-3xl leading-relaxed">
          Проект — независимый мониторинг зарубежных виртуальных карт. Мы не являемся
          эмитентом, банком или платёжной системой и не продаём карты. Все данные носят
          демонстрационный характер и подлежат уточнению.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed">
          Официальный канал связи и приём жалоб: <span className="text-foreground">указывается редакцией</span>.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l.to}
              href={l.to}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              className="cursor-not-allowed opacity-60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="mt-8 text-xs">© 2026 Мониторинг карт. Демо-версия.</p>
      </div>
    </footer>
  );
}