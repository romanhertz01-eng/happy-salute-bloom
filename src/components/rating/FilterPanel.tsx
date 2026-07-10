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
    <div className="flex flex-wrap items-center gap-3 border-b border-border pb-4">
      <div className="inline-flex overflow-hidden rounded-md border border-border">
        {(["international", "russian"] as Segment[]).map((seg) => {
          const active = value.segment === seg;
          return (
            <button
              key={seg}
              type="button"
              onClick={() => onChange({ ...value, segment: seg })}
              className={
                "px-3 py-1.5 text-sm transition-colors " +
                (active
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground")
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
        className="h-9 min-w-[220px] flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
      />

      <select
        value={value.serviceId}
        onChange={(e) => onChange({ ...value, serviceId: e.target.value })}
        className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
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
        className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}