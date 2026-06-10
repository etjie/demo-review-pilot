"use client";

import { Activity, AlertTriangle, MailCheck, MessageCircle, Star, TrendingUp } from "lucide-react";
import { Badge, PageHeader, Panel } from "@/components/ui";
import { useDemoData } from "@/lib/demo-data";

const metricIcons = [MessageCircle, Star, TrendingUp, MailCheck, AlertTriangle, Activity];

export default function DashboardPage() {
  const { metrics, activities } = useDemoData();
  const cards = [
    { label: "Total reviews", value: metrics.totalReviews, helper: "Across Google, Yelp, and Facebook" },
    { label: "Average rating", value: metrics.averageRating, helper: "Current blended score" },
    { label: "New reviews this month", value: metrics.newReviewsThisMonth, helper: "Collected in June" },
    { label: "Pending replies", value: metrics.pendingReplies, helper: "Needs human review or send" },
    { label: "Negative reviews", value: metrics.negativeReviews, helper: "Rated 1 or 2 stars" },
    { label: "Review requests sent", value: metrics.reviewRequestsSent, helper: "Mock campaign messages" }
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick operating view of review volume, customer sentiment, pending responses, and agent activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = metricIcons[index];
          const isRisk = card.label === "Negative reviews";

          return (
            <Panel key={card.label} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-normal text-ink">{card.value}</p>
                </div>
                <span className={isRisk ? "rounded-lg bg-red-50 p-2 text-red-600" : "rounded-lg bg-cyan-50 p-2 text-cyan-700"}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">{card.helper}</p>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recent agent activity</h2>
          <Badge tone="cyan">{activities.length} logs</Badge>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.slice(0, 8).map((activity) => (
            <div key={activity.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">{activity.message}</p>
                <p className="mt-1 text-xs text-slate-500">{activity.agent}</p>
              </div>
              <span className="text-xs font-medium text-slate-500">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
