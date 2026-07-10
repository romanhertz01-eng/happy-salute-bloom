import type { Segment } from "@/lib/types";

// Б3. Фильтр-панель: табы сегмента (FM-39), поиск (FM-40),
// дропдаун оплачиваемых сервисов (FM-41), сброс (FM-42).

export interface FiltersState {
  segment: Segment;
  query: string;
  serviceId: string; // "" == все
}

export const DEFAULT_FILTERS: FiltersState = {
  segment: "international",
  query: "",
  serviceId: "",
};

interface Props {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  onReset: () => void;
  payableServices: { id: string; name: string }[];
}

export function FilterPanel({ value, onChange, onReset, payableServices }: Props) {
  const dirty =
    value.segment !== DEFAULT_FILTERS.segment ||
    value.query !== "" ||
    value.serviceId !== "";

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-1.5 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
      <div className="inline-flex h-9 overflow-hidden rounded-lg bg-muted/60 p-0.5">
        {(["international", "russian"] as Segment[]).map((seg) => {
          const active = value.segment === seg;
          return (
            <button
              key={seg}
              type="button"
              onClick={() => onChange({ ...value, segment: seg })}
              className={
                "rounded-md px-3 text-[13px] font-medium transition-all duration-150 " +
                (active
                  ? "bg-background text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {seg === "international" ? "Международные" : "Российские"}
            </button>
          );
        })}
      </div>

      <input
        type="search"
        value={value.query}
        onChange={(e) => onChange({ ...value, query: e.target.value })}
        placeholder="Поиск по названию"
        className="h-9 min-w-[220px] flex-1 rounded-lg border border-transparent bg-muted/50 px-3 text-[13.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 hover:bg-muted focus:border-border-strong focus:bg-background"
      />

      <select
        value={value.serviceId}
        onChange={(e) => onChange({ ...value, serviceId: e.target.value })}
        className="h-9 rounded-lg border border-transparent bg-muted/50 px-3 pr-8 text-[13.5px] text-foreground outline-none transition-colors hover:bg-muted focus:border-border-strong focus:bg-background"
      >
        <option value="">Оплачиваемый сервис — все</option>
        {payableServices.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onReset}
        disabled={!dirty}
        className="ml-auto h-9 rounded-lg px-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}