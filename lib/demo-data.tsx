"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type Platform = "Google" | "Yelp" | "Facebook";
export type ReviewStatus = "New" | "Reply Drafted" | "Replied" | "Escalated";
export type Channel = "SMS" | "WhatsApp";

export type Review = {
  id: number;
  customer: string;
  platform: Platform;
  rating: number;
  text: string;
  date: string;
  status: ReviewStatus;
  reply?: string;
};

export type Activity = {
  id: number;
  agent: string;
  message: string;
  timestamp: string;
  type: "review" | "campaign" | "agent" | "analytics";
};

const initialReviews: Review[] = [
  {
    id: 1,
    customer: "Maya Thompson",
    platform: "Google",
    rating: 5,
    text: "The booking was easy and the team followed up right away. Very professional experience.",
    date: "2026-06-08",
    status: "Replied"
  },
  {
    id: 2,
    customer: "Noah Patel",
    platform: "Yelp",
    rating: 2,
    text: "Service started late and I had to call twice for an update. The final work was okay, but communication was poor.",
    date: "2026-06-07",
    status: "Escalated"
  },
  {
    id: 3,
    customer: "Sofia Martinez",
    platform: "Facebook",
    rating: 4,
    text: "Friendly staff and fair pricing. I would recommend them to neighbors.",
    date: "2026-06-06",
    status: "New"
  },
  {
    id: 4,
    customer: "Ethan Brooks",
    platform: "Google",
    rating: 1,
    text: "Nobody showed up during the arrival window and I lost the afternoon waiting.",
    date: "2026-06-05",
    status: "New"
  },
  {
    id: 5,
    customer: "Ava Chen",
    platform: "Google",
    rating: 5,
    text: "Fast, tidy, and explained everything clearly before leaving.",
    date: "2026-06-03",
    status: "Reply Drafted",
    reply: "Hi Ava, thank you for the kind review. We are glad the team delivered a clear and tidy experience."
  },
  {
    id: 6,
    customer: "Liam Walker",
    platform: "Yelp",
    rating: 3,
    text: "The result was fine, but I expected a clearer invoice breakdown.",
    date: "2026-05-30",
    status: "New"
  },
  {
    id: 7,
    customer: "Grace Wilson",
    platform: "Facebook",
    rating: 5,
    text: "Loved the reminders and the technician was very respectful of our home.",
    date: "2026-05-28",
    status: "Replied"
  },
  {
    id: 8,
    customer: "Daniel Kim",
    platform: "Google",
    rating: 4,
    text: "Solid service and quick turnaround. Scheduling could be a little smoother.",
    date: "2026-05-26",
    status: "New"
  }
];

const initialActivities: Activity[] = [
  {
    id: 1,
    agent: "Review Collector Agent",
    message: "Synced 3 new reviews from Google and Yelp",
    timestamp: "Today, 9:12 AM",
    type: "review"
  },
  {
    id: 2,
    agent: "Negative Review Detector Agent",
    message: "Escalated Noah Patel's 2-star Yelp review",
    timestamp: "Today, 9:14 AM",
    type: "agent"
  },
  {
    id: 3,
    agent: "Reply Generator Agent",
    message: "Drafted response for Ava Chen",
    timestamp: "Today, 9:18 AM",
    type: "agent"
  },
  {
    id: 4,
    agent: "Campaign Sender Agent",
    message: "Review request sent to Harper Lee via SMS",
    timestamp: "Yesterday, 4:42 PM",
    type: "campaign"
  },
  {
    id: 5,
    agent: "Campaign Sender Agent",
    message: "Review request sent to Omar Hassan via WhatsApp",
    timestamp: "Yesterday, 3:20 PM",
    type: "campaign"
  },
  {
    id: 6,
    agent: "Campaign Sender Agent",
    message: "Review request sent to Priya Shah via SMS",
    timestamp: "Jun 8, 11:05 AM",
    type: "campaign"
  },
  {
    id: 7,
    agent: "Campaign Sender Agent",
    message: "Review request sent to Marcus Green via WhatsApp",
    timestamp: "Jun 7, 2:31 PM",
    type: "campaign"
  },
  {
    id: 8,
    agent: "Campaign Sender Agent",
    message: "Review request sent to Lena Ortiz via SMS",
    timestamp: "Jun 6, 10:16 AM",
    type: "campaign"
  }
];

type DemoDataContextValue = {
  reviews: Review[];
  activities: Activity[];
  campaignLogs: Activity[];
  metrics: {
    totalReviews: number;
    averageRating: string;
    newReviewsThisMonth: number;
    pendingReplies: number;
    negativeReviews: number;
    reviewRequestsSent: number;
  };
  generateReply: (reviewId: number) => void;
  sendCampaign: (customer: string, channel: Channel) => void;
  runOrchestration: () => void;
};

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

export function DemoDataProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [activities, setActivities] = useState(initialActivities);

  const addActivities = useCallback((items: Omit<Activity, "id">[]) => {
    setActivities((current) => {
      const nextId = current.length + 1;
      const withIds = items.map((item, index) => ({ ...item, id: nextId + index }));
      return [...withIds, ...current];
    });
  }, []);

  const generateReply = useCallback((reviewId: number) => {
    const review = reviews.find((item) => item.id === reviewId);
    if (!review) return;

    const reply =
      review.rating <= 2
        ? `Hi ${review.customer}, thank you for sharing this. We are sorry the experience fell short and would like to make it right. Our team will reach out directly to learn more.`
        : `Hi ${review.customer}, thank you for the thoughtful review. We appreciate you choosing us and are glad the experience was a positive one.`;

    setReviews((current) =>
      current.map((item) => (item.id === reviewId ? { ...item, status: "Reply Drafted", reply } : item))
    );

    addActivities([
      {
        agent: "Reply Generator Agent",
        message: `Drafted polite reply for ${review.customer}'s ${review.platform} review`,
        timestamp: "Just now",
        type: "agent"
      }
    ]);
  }, [addActivities, reviews]);

  const sendCampaign = useCallback((customer: string, channel: Channel) => {
    addActivities([
      {
        agent: "Campaign Sender Agent",
        message: `Review request sent to ${customer} via ${channel}`,
        timestamp: "Just now",
        type: "campaign"
      }
    ]);
  }, [addActivities]);

  const runOrchestration = useCallback(() => {
    addActivities([
      {
        agent: "Review Collector Agent",
        message: "Review Collector Agent synced new reviews",
        timestamp: "Just now",
        type: "review"
      },
      {
        agent: "Negative Review Detector Agent",
        message: "Negative Review Detector Agent flagged low rating review",
        timestamp: "Just now",
        type: "agent"
      },
      {
        agent: "Reply Generator Agent",
        message: "Reply Generator Agent drafted replies",
        timestamp: "Just now",
        type: "agent"
      },
      {
        agent: "Analytics Agent",
        message: "Analytics Agent refreshed dashboard metrics",
        timestamp: "Just now",
        type: "analytics"
      }
    ]);
  }, [addActivities]);

  const metrics = useMemo(() => {
    const totalReviews = reviews.length;
    const average = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const newReviewsThisMonth = reviews.filter((review) => review.date.startsWith("2026-06")).length;
    const pendingReplies = reviews.filter((review) => review.status === "New" || review.status === "Reply Drafted").length;
    const negativeReviews = reviews.filter((review) => review.rating <= 2).length;
    const reviewRequestsSent = activities.filter((activity) => activity.type === "campaign").length;

    return {
      totalReviews,
      averageRating: average.toFixed(1),
      newReviewsThisMonth,
      pendingReplies,
      negativeReviews,
      reviewRequestsSent
    };
  }, [activities, reviews]);

  const value = useMemo(
    () => ({
      reviews,
      activities,
      campaignLogs: activities.filter((activity) => activity.type === "campaign"),
      metrics,
      generateReply,
      sendCampaign,
      runOrchestration
    }),
    [activities, generateReply, metrics, reviews, runOrchestration, sendCampaign]
  );

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error("useDemoData must be used within DemoDataProvider");
  }
  return context;
}
