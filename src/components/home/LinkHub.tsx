// Б7 / К7. Перелинковка-хаб (FM-82). Ссылки ведут на посадочные, которые
// пока не реализованы (см. PROJECT_TODO.md), поэтому визуально помечены как
// недоступные. Структура — 3 колонки: сервисы / страны / платёжные системы.

interface Group {
  title: string;
  items: { label: string; to: string }[];
}

const DEFAULT_GROUPS: Group[] = [
  {
    title: "По сервисам",
    items: [
      { label: "Карта для оплаты ChatGPT", to: "/service/chatgpt" },
      { label: "Карта для оплаты Netflix", to: "/service/netflix" },
      { label: "Карта для оплаты Spotify", to: "/service/spotify" },
      { label: "Карта для оплаты Steam", to: "/service/steam" },
      { label: "Карта для оплаты App Store", to: "/service/appstore" },
    ],
  },
  {
    title: "По странам",
    items: [
      { label: "Виртуальные карты США", to: "/country/usa" },
      { label: "Виртуальные карты Казахстана", to: "/country/kazakhstan" },
      { label: "Виртуальные карты Турции", to: "/country/turkey" },
      { label: "Виртуальные карты Грузии", to: "/country/georgia" },
      { label: "Виртуальные карты Кипра", to: "/country/cyprus" },
    ],
  },
  {
    title: "По платёжной системе",
    items: [
      { label: "Виртуальные карты Visa", to: "/network/visa" },
      { label: "Виртуальные карты Mastercard", to: "/network/mastercard" },
    ],
  },
];

export function LinkHub({ groups = DEFAULT_GROUPS, title }: { groups?: Group[]; title?: string }) {
  return (
    <section className="mt-20 border-t border-border/70 pt-10">
      {title && (
        <h2 className="text-[22px] font-medium tracking-tight text-foreground">{title}</h2>
      )}
      <div className={"grid gap-x-14 gap-y-10 sm:grid-cols-3 " + (title ? "mt-8" : "")}>
        {groups.map((g) => (
          <div key={g.title}>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/80">
              {g.title}
            </div>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {g.items.map((it) => (
                <li key={it.to}>
                  <a
                    href={it.to}
                    aria-disabled="true"
                    onClick={(e) => e.preventDefault()}
                    className="cursor-not-allowed text-foreground/70 transition-colors hover:text-foreground"
                    title="Страница появится позже"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}