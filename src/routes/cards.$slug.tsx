import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/layout/Layout";
import { ScoreCell } from "@/components/rating/ScoreCell";
import { getServiceBySlug } from "@/data/services";
import { formatText } from "@/components/rating/formatters";
import type { CardService } from "@/lib/types";

export const Route = createFileRoute("/cards/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Сервис не найден — Мониторинг карт" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    const title = `${service.name} — обзор и тарифы 2026`;
    const description = `Демонстрационный обзор сервиса ${service.name}: тарифы, инструкция выпуска, поддерживаемые сервисы.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: CardPage,
});

function NotFound() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Сервис не найден</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Возможно, страница была удалена или адрес указан неверно.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-muted"
        >
          К рейтингу
        </Link>
      </div>
    </Layout>
  );
}

function CardPage() {
  const { service } = Route.useLoaderData() as { service: CardService };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{service.name}</span>
        </nav>

        <section className="mt-6 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {service.name}
            </h1>
            <div className="mt-2 text-sm text-muted-foreground">
              {service.country} · {service.network === "visa" ? "Visa" : "Mastercard"}
            </div>
            <div className="mt-3 flex items-center gap-4">
              <ScoreCell reviews={service.reviews} />
              <span
                aria-disabled="true"
                className="cursor-not-allowed text-sm text-muted-foreground opacity-60"
                title="Страница отзывов появится позже"
              >
                Отзывы →
              </span>
            </div>
          </div>
          <a
            href={service.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="rounded-md bg-foreground px-5 py-2.5 text-sm text-background hover:opacity-90"
          >
            Оформить
          </a>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Обзор</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            {service.description}
          </p>

          <div className="mt-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Где платить
            </div>
            {service.payableServices.length === 0 ? (
              <div className="mt-2 text-sm text-muted-foreground">нет данных</div>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {service.payableServices.map((s) => (
                  <span
                    key={s.id}
                    className="rounded border border-border px-2 py-0.5 text-xs text-foreground"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-border p-4">
              <div className="text-sm font-medium text-foreground">Плюсы</div>
              {service.pros.length === 0 ? (
                <div className="mt-2 text-sm text-muted-foreground">нет данных</div>
              ) : (
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {service.pros.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-md border border-border p-4">
              <div className="text-sm font-medium text-foreground">Минусы</div>
              {service.cons.length === 0 ? (
                <div className="mt-2 text-sm text-muted-foreground">нет данных</div>
              ) : (
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {service.cons.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Итог</div>
            <p className="mt-2 text-sm text-foreground">{service.verdict}</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Тарифы</h2>
          {service.tariffs.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">нет данных</p>
          ) : (
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {service.tariffs.map((t, i) => (
                <li key={i} className="grid grid-cols-3 gap-4 py-3 text-sm">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span className="text-foreground">{formatText(t.price)}</span>
                  <span className="text-muted-foreground">{formatText(t.conditions)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Как выпустить</h2>
          {service.issueSteps.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">нет данных</p>
          ) : (
            <ol className="mt-3 space-y-2 text-sm text-foreground">
              {service.issueSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-muted-foreground">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <div className="mt-12">
          <Link
            to="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Вернуться к рейтингу
          </Link>
        </div>
      </div>
    </Layout>
  );
}