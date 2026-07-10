import type { ReviewStats } from "@/lib/types";

// FM-27, FM-31, FM-32. FM-28 реализована как 3 семантических уровня
// (высокая/средняя/низкая) без выбора конкретной палитры (Wireframes §6.3 п.2).
// Палитра утверждается владельцем позже — см. PROJECT_TODO.md.
function level(score: number): "high" | "medium" | "low" {
  if (score >= 4.5) return "high";
  if (score >= 3.5) return "medium";
  return "low";
}

export function ScoreCell({ reviews }: { reviews: ReviewStats }) {
  if (reviews.score === null) {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-muted-foreground">Нет оценок</span>
      </div>
    );
  }
  const lvl = level(reviews.score);
  const scoreCls =
    lvl === "high"
      ? "font-semibold text-foreground"
      : lvl === "medium"
        ? "font-medium text-foreground"
        : "font-medium text-muted-foreground";
  return (
    <div className="flex flex-col text-sm leading-tight" data-score-level={lvl}>
      <span className={scoreCls}>{reviews.score.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">{reviews.count} отзывов</span>
    </div>
  );
}