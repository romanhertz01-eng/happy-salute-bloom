import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout/Layout";
import {
  DEFAULT_FILTERS,
  FilterPanel,
  type FiltersState,
} from "@/components/rating/FilterPanel";
import { RatingTable } from "@/components/rating/RatingTable";
import { SERVICES, getAllPayableServices } from "@/data/services";
import { Longread } from "@/components/home/Longread";
import { Faq } from "@/components/home/Faq";
import { LinkHub } from "@/components/home/LinkHub";

const YEAR = 2026;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Зарубежные виртуальные карты — рейтинг ${YEAR}` },
      {
        name: "description",
        content:
          "Независимый мониторинг зарубежных виртуальных карт для пользователей из России. Сравнение условий, тарифов и поддерживаемых сервисов.",
      },
      {
        property: "og:title",
        content: `Зарубежные виртуальные карты — рейтинг ${YEAR}`,
      },
      {
        property: "og:description",
        content:
          "Независимый мониторинг зарубежных виртуальных карт для пользователей из России. Сравнение условий, тарифов и поддерживаемых сервисов.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const payableServices = useMemo(() => getAllPayableServices(), []);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return SERVICES.filter((s) => s.segment === filters.segment)
      .filter((s) => (q ? s.name.toLowerCase().includes(q) : true))
      .filter((s) =>
        filters.serviceId
          ? s.payableServices.some((p) => p.id === filters.serviceId)
          : true,
      );
  }, [filters]);

  const reset = () => setFilters(DEFAULT_FILTERS);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Зарубежные виртуальные карты — рейтинг {YEAR}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Независимый мониторинг сервисов, выпускающих зарубежные виртуальные карты
            для пользователей из России. Мы собираем условия в одну таблицу, чтобы вы
            могли выбрать подходящую карту за пару минут.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <span>В рейтинге: {SERVICES.length} сервисов</span>
            <span>Мониторинг, а не эмитент: мы не выпускаем и не продаём карты.</span>
          </div>
        </section>

        <section className="mt-8">
          <FilterPanel
            value={filters}
            onChange={setFilters}
            onReset={reset}
            payableServices={payableServices}
          />

          <RatingTable rows={filtered} onReset={reset} />

          <p className="mt-3 text-xs text-muted-foreground">
            Оценка — редакционная.{" "}
            <a
              href="/methodology"
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
              className="cursor-not-allowed underline underline-offset-2 opacity-70"
            >
              Как мы оцениваем
            </a>
            .
          </p>
        </section>

        {/* Б5 Лонгрид · Б6 FAQ · Б7 Перелинковка-хаб (MASTER_PRD §6.1). */}
        <Longread />
        <Faq />
        <LinkHub title="Смотрите также" />
      </div>
    </Layout>
  );
}
