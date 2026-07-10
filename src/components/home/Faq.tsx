import { useState } from "react";

// Б6. FAQ-аккордеон 7–10 вопросов (FM-60). Тексты — плейсхолдеры реалистичной
// структуры (Wireframes §6.3 п.4). Редактура — вне этой итерации.

const ITEMS: { q: string; a: string }[] = [
  {
    q: "Почему российские карты не работают за рубежом?",
    a: "После 2022 года международные платёжные системы отключили карты, выпущенные в РФ, от процессинга за пределами страны.",
  },
  {
    q: "Законно ли пользоваться зарубежной виртуальной картой?",
    a: "Использование карт зарубежных эмитентов не запрещено. Ответственность за отчётность лежит на владельце счёта.",
  },
  {
    q: "Нужно ли проходить KYC?",
    a: "Зависит от сервиса. В колонке KYC указано: «да», «нет» или «частично».",
  },
  {
    q: "Какие способы пополнения самые быстрые?",
    a: "СБП — мгновенно, но доступен не у всех сервисов. Криптовалюта работает почти везде, но требует опыта.",
  },
  {
    q: "Можно ли оплатить подписку ChatGPT такой картой?",
    a: "Да, если сервис-эмитент поддерживает соответствующего мерчанта. Используйте фильтр «Оплачиваемый сервис».",
  },
  {
    q: "Как долго действует карта?",
    a: "Срок указан в отдельной колонке — от 1 года до 4–5 лет в зависимости от сервиса.",
  },
  {
    q: "Что означает «нет данных» в ячейке?",
    a: "Условие не подтверждено редакцией. Мы не публикуем непроверенные данные.",
  },
  {
    q: "Как формируется оценка сервиса?",
    a: "Оценка — редакционная. Методология публикуется на отдельной странице «Как мы оцениваем».",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mt-20">
      <h2 className="text-[22px] font-medium tracking-tight text-foreground">Частые вопросы</h2>
      <ul className="mt-6 overflow-hidden rounded-xl border border-border/70 bg-card">
        {ITEMS.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="border-b border-border/60 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[14.5px] font-medium tracking-tight text-foreground transition-colors hover:bg-muted/40"
              >
                <span>{it.q}</span>
                <span
                  aria-hidden
                  className={
                    "flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200 " +
                    (isOpen ? "rotate-45" : "")
                  }
                >
                  +
                </span>
              </button>
              <div
                className={
                  "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out " +
                  (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
                }
              >
                <div className="min-h-0">
                  <p className="px-4 pb-4 text-[13.5px] leading-relaxed text-muted-foreground">
                    {it.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}