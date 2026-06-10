"use client";

import { MessageSquarePlus, Star } from "lucide-react";
import { Badge, Button, PageHeader, Panel } from "@/components/ui";
import { ReviewStatus, useDemoData } from "@/lib/demo-data";

const statusTone: Record<ReviewStatus, "blue" | "green" | "amber" | "red"> = {
  New: "blue",
  "Reply Drafted": "amber",
  Replied: "green",
  Escalated: "red"
};

export default function ReviewsPage() {
  const { reviews, generateReply } = useDemoData();

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Review queue with mock reply generation and urgent routing for low-rating customer feedback."
      />

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Panel key={review.id} className="p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1" data-testid={`review-card-${review.id}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-ink">{review.customer}</h2>
                  <Badge tone="slate">{review.platform}</Badge>
                  <Badge tone={statusTone[review.status]}>{review.status}</Badge>
                  {review.rating <= 2 && <Badge tone="red">Urgent</Badge>}
                </div>

                <div className="mt-3 flex items-center gap-1 text-amber-500" aria-label={`${review.rating} star rating`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={index < review.rating ? "h-4 w-4 fill-current" : "h-4 w-4 text-slate-300"} />
                  ))}
                  <span className="ml-2 text-sm font-medium text-slate-500">{review.date}</span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-700">{review.text}</p>

                {review.reply && (
                  <div className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">Draft reply</p>
                    <p className="mt-2 text-sm leading-6 text-cyan-950">{review.reply}</p>
                  </div>
                )}
              </div>

              <Button data-testid={`generate-reply-${review.id}`} onClick={() => generateReply(review.id)} className="w-full lg:w-auto">
                <MessageSquarePlus className="h-4 w-4" />
                Generate AI Reply
              </Button>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
