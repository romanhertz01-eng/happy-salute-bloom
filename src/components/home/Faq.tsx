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
    <section className="mt-16">
      <h2 className="text-xl font-semibold text-foreground">Частые вопросы</h2>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {ITEMS.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm text-foreground hover:text-foreground"
              >
                <span>{it.q}</span>
                <span className="text-muted-foreground">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}