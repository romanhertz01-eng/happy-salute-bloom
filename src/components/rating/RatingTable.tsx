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
    <div className="mt-5">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground/80">
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap border-b border-border/70 bg-muted/30 px-3 py-2.5 font-medium first:rounded-tl-xl last:rounded-tr-xl"
                >
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    {c.tooltip && (
                      <span
                        title={c.tooltip}
                        aria-label={c.tooltip}
                        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-border/70 text-[10px] text-muted-foreground/80"
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
                  <tr className="group align-middle transition-colors duration-150 hover:bg-muted/40">
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13px] tabular-nums text-muted-foreground/80">{number}</td>
                    <td className="border-b border-border/50 px-3 py-[18px]">
                      <Link
                        to="/cards/$slug"
                        params={{ slug: row.slug }}
                        className="text-[15px] font-medium tracking-tight text-foreground decoration-foreground/30 underline-offset-[3px] transition-colors hover:underline"
                      >
                        {row.name}
                      </Link>
                      <div className="mt-0.5 text-[12px] text-muted-foreground/80">
                        {row.country} · {row.network === "visa" ? "Visa" : "Mastercard"}
                      </div>
                    </td>
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13.5px] text-foreground/85">{formatText(row.issuePrice)}</td>
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13.5px] text-foreground/85">{formatText(row.maintenancePrice)}</td>
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13.5px] text-foreground/85">
                      <span title={row.fundingFeeTooltip ?? undefined}>
                        {formatText(row.fundingFee)}
                      </span>
                    </td>
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13.5px] text-foreground/85">{formatFunding(row.fundingMethods)}</td>
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13.5px] text-foreground/85">{formatKyc(row.kyc)}</td>
                    <td className="border-b border-border/50 px-3 py-[18px] text-[13.5px] text-foreground/85">{formatText(row.validity)}</td>
                    <td className="border-b border-border/50 px-3 py-[18px]">
                      <ServicesCell items={row.payableServices} />
                    </td>
                    <td className="border-b border-border/50 px-3 py-[18px]">
                      <ScoreCell reviews={row.reviews} />
                    </td>
                    <td className="border-b border-border/50 px-3 py-[18px]">
                      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : row.slug)}
                          className="inline-flex h-8 items-center rounded-lg px-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-expanded={isOpen}
                        >
                          {isOpen ? "Скрыть" : "Развернуть"}
                        </button>
                        <Link
                          to="/cards/$slug"
                          params={{ slug: row.slug }}
                          className="inline-flex h-8 items-center rounded-lg border border-border px-2.5 text-[12px] font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          Обзор
                        </Link>
                        <a
                          href={row.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          className="inline-flex h-8 items-center rounded-lg bg-foreground px-3 text-[12px] font-medium text-background transition-opacity hover:opacity-90"
                        >
                          Оформить
                        </a>
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-muted/40">
                      <td colSpan={COLUMNS.length} className="border-b border-border/50 px-3 py-4">
                        <div className="rounded-lg bg-background/60 px-4 py-3 ring-1 ring-inset ring-border/60">
                          <div className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground/80">
                            Полный список оплачиваемых сервисов
                          </div>
                          {row.payableServices.length === 0 ? (
                            <div className="mt-2 text-sm text-muted-foreground">{NO_DATA}</div>
                          ) : (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {row.payableServices.map((s) => (
                                <span
                                  key={s.id}
                                  className="inline-flex h-6 items-center rounded-md border border-border/70 bg-background px-2 text-[12px] text-foreground/85"
                                >
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
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
        <div className="mt-5 flex items-center justify-end gap-1 text-sm">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
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
                "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2.5 text-[13px] font-medium transition-colors " +
                (p === currentPage
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground")
              }
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Следующая страница"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}