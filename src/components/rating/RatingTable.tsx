import { Fragment, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { CardService } from "@/lib/types";
import { ScoreCell } from "./ScoreCell";
import { ServicesCell } from "./ServicesCell";
import { formatFunding, formatKyc, formatText, NO_DATA } from "./formatters";

// Б4. Таблица (FM-10..36). Колонка «В РФ» (FM-22) не создаётся по решению владельца.
// Бейдж «Лучшее предложение» (FM-14) — также вне MVP.
// TODO(mobile): мобильная трансформация таблицы — Д-14, см. PROJECT_TODO.md.

const PAGE_SIZE = 10; // FM-36

const COLUMNS: { key: string; label: string; tooltip?: string }[] = [
  { key: "n", label: "№" },
  { key: "name", label: "Сервис" },
  { key: "issue", label: "Выпуск" },
  { key: "maintenance", label: "Обслуживание" },
  {
    key: "fee",
    label: "Комиссия",
    tooltip: "Комиссия за пополнение карты. Зависит от способа.",
  },
  { key: "funding", label: "Пополнение" },
  { key: "kyc", label: "KYC" },
  { key: "validity", label: "Срок" },
  { key: "services", label: "Оплачиваемые сервисы" },
  { key: "score", label: "Оценка" },
  { key: "actions", label: "" },
];

interface Props {
  rows: CardService[];
  onReset: () => void;
}

export function RatingTable({ rows, onReset }: Props) {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  if (rows.length === 0) {
    return (
      <div className="mt-6 rounded-md border border-dashed border-border p-10 text-center">
        <p className="text-sm text-foreground">Ничего не найдено</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Попробуйте изменить условия поиска или сбросить фильтры.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-muted"
        >
          Сбросить фильтры
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              {COLUMNS.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-3 py-3 font-normal">
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    {c.tooltip && (
                      <span
                        title={c.tooltip}
                        aria-label={c.tooltip}
                        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground"
                      >
                        i
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => {
              const number = start + idx + 1;
              const isOpen = expanded === row.slug;
              return (
                <Fragment key={row.slug}>
                  <tr className="border-b border-border align-middle hover:bg-muted/40">
                    <td className="px-3 py-4 text-muted-foreground">{number}</td>
                    <td className="px-3 py-4">
                      <Link
                        to="/cards/$slug"
                        params={{ slug: row.slug }}
                        className="font-medium text-foreground hover:underline"
                      >
                        {row.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        {row.country} · {row.network === "visa" ? "Visa" : "Mastercard"}
                      </div>
                    </td>
                    <td className="px-3 py-4">{formatText(row.issuePrice)}</td>
                    <td className="px-3 py-4">{formatText(row.maintenancePrice)}</td>
                    <td className="px-3 py-4">
                      <span title={row.fundingFeeTooltip ?? undefined}>
                        {formatText(row.fundingFee)}
                      </span>
                    </td>
                    <td className="px-3 py-4">{formatFunding(row.fundingMethods)}</td>
                    <td className="px-3 py-4">{formatKyc(row.kyc)}</td>
                    <td className="px-3 py-4">{formatText(row.validity)}</td>
                    <td className="px-3 py-4">
                      <ServicesCell items={row.payableServices} />
                    </td>
                    <td className="px-3 py-4">
                      <ScoreCell reviews={row.reviews} />
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : row.slug)}
                          className="rounded-md border border-border px-2.5 py-1.5 text-xs text-foreground hover:bg-muted"
                          aria-expanded={isOpen}
                        >
                          {isOpen ? "Скрыть" : "Развернуть"}
                        </button>
                        <Link
                          to="/cards/$slug"
                          params={{ slug: row.slug }}
                          className="rounded-md border border-border px-2.5 py-1.5 text-xs text-foreground hover:bg-muted"
                        >
                          Обзор
                        </Link>
                        <a
                          href={row.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          className="rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background hover:opacity-90"
                        >
                          Оформить
                        </a>
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-border bg-muted/30">
                      <td colSpan={COLUMNS.length} className="px-3 py-4">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                          Полный список оплачиваемых сервисов
                        </div>
                        {row.payableServices.length === 0 ? (
                          <div className="mt-2 text-sm text-muted-foreground">{NO_DATA}</div>
                        ) : (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {row.payableServices.map((s) => (
                              <span
                                key={s.id}
                                className="rounded border border-border bg-background px-2 py-0.5 text-xs text-foreground"
                              >
                                {s.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-1 text-sm">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-md border border-border px-2 py-1 text-muted-foreground hover:text-foreground disabled:opacity-40"
            aria-label="Предыдущая страница"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={
                "rounded-md border px-3 py-1 " +
                (p === currentPage
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:bg-muted")
              }
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md border border-border px-2 py-1 text-muted-foreground hover:text-foreground disabled:opacity-40"
            aria-label="Следующая страница"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}