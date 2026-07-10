// Б5. Лонгрид: FM-51 (структура H2), FM-52 (5 сценариев), FM-53 (3 шага
// оформления), FM-54/55 (способы пополнения с Плюсы/Минусы). Тексты —
// плейсхолдеры реалистичной структуры (Wireframes §6.3 п.4), содержательная
// редактура — вне этой итерации.

const SCENARIOS: { title: string; services: string }[] = [
  { title: "Оплата ИИ-сервисов", services: "ChatGPT, Claude, Midjourney" },
  { title: "Стриминг и медиа", services: "Netflix, Spotify, YouTube Premium" },
  { title: "Игры и цифровые магазины", services: "Steam, App Store, Google Play" },
  { title: "Рабочие инструменты", services: "Figma, Notion, GitHub" },
  { title: "Покупки и путешествия", services: "AliExpress, Booking, Uber" },
];

const ISSUE_STEPS: string[] = [
  "Выбрать сервис в рейтинге и перейти по кнопке «Оформить».",
  "Пройти регистрацию и, при необходимости, KYC на стороне сервиса.",
  "Выпустить виртуальную карту и получить реквизиты в личном кабинете.",
];

const FUNDING: { method: string; pros: string[]; cons: string[] }[] = [
  {
    method: "СБП",
    pros: ["Мгновенное зачисление", "Привычный способ для РФ"],
    cons: ["Доступен не у всех сервисов", "Возможны лимиты"],
  },
  {
    method: "Криптовалюта / USDT",
    pros: ["Работает почти везде", "Без банковских ограничений"],
    cons: ["Нужен кошелёк и опыт", "Курсовые издержки"],
  },
  {
    method: "Банковский перевод",
    pros: ["Подходит для крупных сумм"],
    cons: ["Долгое зачисление", "Комиссии банков"],
  },
];

export function Longread() {
  return (
    <section className="mt-20 space-y-14">
      <div>
        <h2 className="text-[22px] font-medium tracking-tight text-foreground">
          Кому подходит зарубежная виртуальная карта
        </h2>
        <p className="mt-2 max-w-[42rem] text-[14px] leading-relaxed text-muted-foreground">
          Пять типовых сценариев, ради которых пользователи из России выпускают карту за рубежом.
        </p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <li
              key={s.title}
              className="rounded-xl border border-border/70 bg-card px-4 py-3.5 transition-colors hover:border-border-strong"
            >
              <div className="text-[14.5px] font-medium tracking-tight text-foreground">{s.title}</div>
              <div className="mt-0.5 text-[12.5px] text-muted-foreground/85">{s.services}</div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-[22px] font-medium tracking-tight text-foreground">Как оформить карту</h2>
        <ol className="mt-5 grid gap-2 sm:grid-cols-3">
          {ISSUE_STEPS.map((step, i) => (
            <li
              key={i}
              className="rounded-xl border border-border/70 bg-card px-4 py-3.5"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/80">
                Шаг {i + 1}
              </div>
              <div className="mt-1.5 text-[14px] leading-snug text-foreground">{step}</div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-[22px] font-medium tracking-tight text-foreground">Как пополнить карту</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {FUNDING.map((f) => (
            <div key={f.method} className="rounded-xl border border-border/70 bg-card p-4">
              <div className="text-[14.5px] font-medium tracking-tight text-foreground">{f.method}</div>
              <div className="mt-3 text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground/80">Плюсы</div>
              <ul className="mt-1 space-y-0.5 text-[13px] text-foreground/85">
                {f.pros.map((p, i) => <li key={i}>— {p}</li>)}
              </ul>
              <div className="mt-3 text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground/80">Минусы</div>
              <ul className="mt-1 space-y-0.5 text-[13px] text-foreground/85">
                {f.cons.map((c, i) => <li key={i}>— {c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}