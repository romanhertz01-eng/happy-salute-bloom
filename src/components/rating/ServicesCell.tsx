import type { PayableService } from "@/lib/types";
import { NO_DATA } from "./formatters";

// FM-23: 2 названия + «+N». Иконки не создаются в MVP — используем текст.
export function ServicesCell({ items }: { items: PayableService[] }) {
  if (items.length === 0) {
    return <span className="text-sm text-muted-foreground">{NO_DATA}</span>;
  }
  const shown = items.slice(0, 2);
  const rest = items.length - shown.length;
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
      {shown.map((s) => (
        <span
          key={s.id}
          className="rounded border border-border px-1.5 py-0.5 text-xs text-foreground"
        >
          {s.name}
        </span>
      ))}
      {rest > 0 && (
        <span className="text-xs text-muted-foreground">+{rest}</span>
      )}
    </div>
  );
}