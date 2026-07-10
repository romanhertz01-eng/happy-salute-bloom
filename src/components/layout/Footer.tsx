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
    <footer className="mt-24 border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="max-w-[44rem] text-[13.5px] leading-[1.65] text-muted-foreground">
          Проект — независимый мониторинг зарубежных виртуальных карт. Мы не являемся
          эмитентом, банком или платёжной системой и не продаём карты. Все данные носят
          демонстрационный характер и подлежат уточнению.
        </p>
        <p className="mt-3 max-w-[44rem] text-[13.5px] leading-[1.65] text-muted-foreground">
          Официальный канал связи и приём жалоб: <span className="text-foreground/85">указывается редакцией</span>.
        </p>
        <nav className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[13px]">
          {LINKS.map((l) => (
            <a
              key={l.to}
              href={l.to}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              className="cursor-not-allowed text-foreground/70 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="mt-10 text-[12px] text-muted-foreground/70">© 2026 Мониторинг карт. Демо-версия.</p>
      </div>
    </footer>
  );
}