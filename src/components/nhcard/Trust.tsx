const STATS: { value: string; label: string }[] = [
  { value: "38", label: "кандидатов изучили" },
  { value: "15", label: "в финальном рейтинге" },
  { value: "142", label: "платежа сделали лично" },
  { value: "₽86 000", label: "потратили своих денег" },
];

export function TrustSection() {
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-xl border border-border bg-background p-8 shadow-sm sm:p-10 lg:p-14">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Прозрачность
          </div>
          <h2 className="max-w-3xl font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Не верьте на слово — мы оплатили своими деньгами
          </h2>

          <dl className="mt-10 grid grid-cols-2 gap-y-8 border-t border-border pt-10 lg:grid-cols-4 lg:gap-x-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-sm text-muted-foreground">{s.label}</dt>
                <dd className="order-1 font-serif text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-[72px] lg:leading-none">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground sm:text-sm">
            Партнёрские ссылки помечены <code className="font-mono text-foreground/80">rel="sponsored"</code>. Мы не продаём карты и не берём плату за место в рейтинге.
          </p>
        </div>
      </div>
    </section>
  );
}