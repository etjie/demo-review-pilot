"use client";

import { BarChart3, Bot, Megaphone, MessageSquareText, Radar, ShieldAlert, Workflow } from "lucide-react";
import { Badge, Button, PageHeader, Panel } from "@/components/ui";
import { useDemoData } from "@/lib/demo-data";

const agents = [
  {
    name: "Review Collector Agent",
    description: "Pulls new review events into the queue.",
    icon: Radar,
    status: "Ready"
  },
  {
    name: "Reply Generator Agent",
    description: "Drafts polite, on-brand replies for review cards.",
    icon: MessageSquareText,
    status: "Ready"
  },
  {
    name: "Negative Review Detector Agent",
    description: "Flags 1 and 2-star reviews for urgent attention.",
    icon: ShieldAlert,
    status: "Monitoring"
  },
  {
    name: "Campaign Sender Agent",
    description: "Creates post-service review request activity.",
    icon: Megaphone,
    status: "Ready"
  },
  {
    name: "Analytics Agent",
    description: "Refreshes metrics shown in the dashboard.",
    icon: BarChart3,
    status: "Ready"
  }
];

export default function AgentsPage() {
  const { activities, runOrchestration } = useDemoData();

  return (
    <>
      <PageHeader
        title="Agents"
        description="A simple mock orchestration view showing how ReviewPilot could coordinate specialized review-management agents."
        action={
          <Button data-testid="run-orchestration" onClick={runOrchestration}>
            <Workflow className="h-4 w-4" />
            Run Demo Orchestration
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => {
          const Icon = agent.icon;

          return (
            <Panel key={agent.name} className="p-4">
              <div className="flex items-start gap-4">
                <span className="rounded-lg bg-cyan-50 p-3 text-cyan-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-ink">{agent.name}</h2>
                    <Badge tone={agent.status === "Monitoring" ? "amber" : "green"}>{agent.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{agent.description}</p>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="h-5 w-5 text-cyan-700" />
          <h2 className="text-lg font-semibold text-ink">Orchestration log</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.slice(0, 10).map((activity) => (
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
