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
    <div className="flex flex-wrap items-center gap-1 text-sm">
      {shown.map((s) => (
        <span
          key={s.id}
          className="inline-flex h-[22px] items-center rounded-md border border-border/70 bg-muted/40 px-2 text-[11.5px] font-medium text-foreground/85"
        >
          {s.name}
        </span>
      ))}
      {rest > 0 && (
        <span className="text-[11.5px] font-medium text-muted-foreground/80">+{rest}</span>
      )}
    </div>
  );
}