"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { Reveal } from "@/app/components/ui/Reveal";
import { DURATION, EASE_OUT } from "@/app/lib/motion";
import type { TestimonialClient, TestimonialsData } from "@/app/types/portfolio";

const INITIAL_COUNT = 9;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasPartial ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="size-3.5 fill-amber-300 text-amber-300" />
      ))}
      {hasPartial && <Star className="size-3.5 fill-amber-300/50 text-amber-300" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="size-3.5 text-border" />
      ))}
    </div>
  );
}

function TestimonialCard({ client, idx }: { client: TestimonialClient; idx: number }) {
  const [reviewIndex, setReviewIndex] = useState(0);
  const review = client.reviews[reviewIndex];
  const hasMultiple = client.reviews.length > 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.slow, delay: (idx % 6) * 0.04, ease: EASE_OUT }}
      className="surface-card mb-4 w-full break-inside-avoid rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">{client.name}</p>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted">
            <Icon
              icon={`circle-flags:${client.countryCode.toLowerCase()}`}
              className="shrink-0 text-base"
              aria-hidden
            />
            <span className="truncate">{client.country}</span>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <div className="relative mt-4">
        <Quote className="absolute -left-1 -top-1 size-5 text-border" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={`${client.id}-${reviewIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            className="relative pl-5 text-sm leading-relaxed text-muted"
          >
            {review.text}
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {hasMultiple && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
            Review {reviewIndex + 1} / {client.reviews.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setReviewIndex((reviewIndex - 1 + client.reviews.length) % client.reviews.length)
              }
              className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-foreground"
              aria-label="Previous review"
            >
              <ChevronLeft className="size-4" strokeWidth={1.75} />
            </button>
            <div className="flex gap-1">
              {client.reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReviewIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === reviewIndex ? "w-4 bg-foreground" : "w-1.5 bg-border hover:bg-muted"
                  }`}
                  aria-label={`Show review ${i + 1}`}
                  aria-current={i === reviewIndex ? "true" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setReviewIndex((reviewIndex + 1) % client.reviews.length)}
              className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-foreground"
              aria-label="Next review"
            >
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      )}
    </motion.article>
  );
}

interface TestimonialsProps {
  data: TestimonialsData;
}

export function Testimonials({ data }: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);

  const shuffledClients = useMemo(
    () => shuffle(data.clients),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const visibleClients = showAll ? shuffledClients : shuffledClients.slice(0, INITIAL_COUNT);
  const hasMore = shuffledClients.length > INITIAL_COUNT;
  const remainingCount = shuffledClients.length - INITIAL_COUNT;

  return (
    <section id="testimonials" className="section-padding relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <SectionHeader label="Social Proof" title={data.title} description={data.subtitle} />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visibleClients.map((client, idx) => (
            <TestimonialCard key={client.id} client={client} idx={idx} />
          ))}
        </div>

        {hasMore && (
          <Reveal className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="cursor-pointer rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-muted transition-colors duration-200 hover:border-border-hover hover:bg-surface-hover hover:text-foreground"
            >
              {showAll ? "Show fewer reviews" : `+${remainingCount} more reviews`}
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
