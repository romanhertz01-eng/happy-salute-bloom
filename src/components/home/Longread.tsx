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
    <section className="mt-16 space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Кому подходит зарубежная виртуальная карта</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Пять типовых сценариев, ради которых пользователи из России выпускают карту за рубежом.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <li key={s.title} className="rounded-md border border-border p-4">
              <div className="text-sm font-medium text-foreground">{s.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.services}</div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Как оформить карту</h2>
        <ol className="mt-4 space-y-2 text-sm text-foreground">
          {ISSUE_STEPS.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-muted-foreground">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Как пополнить карту</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {FUNDING.map((f) => (
            <div key={f.method} className="rounded-md border border-border p-4">
              <div className="text-sm font-medium text-foreground">{f.method}</div>
              <div className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">Плюсы</div>
              <ul className="mt-1 space-y-1 text-sm text-foreground">
                {f.pros.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
              <div className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">Минусы</div>
              <ul className="mt-1 space-y-1 text-sm text-foreground">
                {f.cons.map((c, i) => <li key={i}>• {c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}