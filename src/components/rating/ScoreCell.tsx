import type { ReviewStats } from "@/lib/types";

// FM-27, FM-31, FM-32. Нейтральное отображение оценки — без финальной
// цветовой палитры (FM-28), см. PROJECT_TODO.md.
export function ScoreCell({ reviews }: { reviews: ReviewStats }) {
  if (reviews.score === null) {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-muted-foreground">Нет оценок</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col text-sm leading-tight">
      <span className="font-medium text-foreground">{reviews.score.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">{reviews.count} отзывов</span>
    </div>
  );
}