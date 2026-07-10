import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { SiteHeader } from "@/components/nhcard/Header";
import { SiteFooter } from "@/components/nhcard/Footer";
import { Hero } from "@/components/nhcard/Hero";
import { RatingSection } from "@/components/nhcard/Rating";
import { cardsQueryOptions } from "@/lib/cards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NHcard — независимый рейтинг зарубежных виртуальных карт 2026" },
      {
        name: "description",
        content:
          "Сравнение 15 зарубежных виртуальных карт для россиян: тарифы, лимиты, способы пополнения. Проверено редакцией.",
      },
      { property: "og:title", content: "NHcard — рейтинг зарубежных виртуальных карт 2026" },
      {
        property: "og:description",
        content: "Мы не продаём карты. Мы проверяем, сравниваем и помогаем выбрать.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(cardsQueryOptions),
  component: HomePage,
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-sm text-muted-foreground">Не удалось загрузить рейтинг: {error.message}</div>
  ),
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Suspense fallback={<div className="p-10 text-center text-sm text-muted-foreground">Загрузка…</div>}>
          <HomeContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

function HomeContent() {
  const { data: cards } = useSuspenseQuery(cardsQueryOptions);
  return (
    <>
      <Hero total={cards.length} />
      <RatingSection cards={cards} />
    </>
  );
}