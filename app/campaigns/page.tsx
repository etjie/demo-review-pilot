"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button, PageHeader, Panel, Select, TextInput } from "@/components/ui";
import { Channel, useDemoData } from "@/lib/demo-data";

export default function CampaignsPage() {
  const { campaignLogs, sendCampaign } = useDemoData();
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [channel, setChannel] = useState<Channel>("SMS");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customer.trim()) return;

    sendCampaign(customer.trim(), channel);
    setCustomer("");
    setPhone("");
    setServiceType("");
    setChannel("SMS");
  };

  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Send mock review request campaigns after a customer visit, then see the activity log update instantly."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,440px)_1fr]">
        <Panel>
          <h2 className="text-lg font-semibold text-ink">New review request</h2>
          <form onSubmit={submit} className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Customer name
              <TextInput
                data-testid="campaign-customer"
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                placeholder="Jordan Miles"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Phone number
              <TextInput data-testid="campaign-phone" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+1 555 0142" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Service type
              <TextInput
                data-testid="campaign-service"
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                placeholder="HVAC maintenance"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Channel
              <Select data-testid="campaign-channel" value={channel} onChange={(event) => setChannel(event.target.value as Channel)}>
                <option>SMS</option>
                <option>WhatsApp</option>
              </Select>
            </label>
            <Button data-testid="send-campaign" type="submit" className="mt-1">
              <Send className="h-4 w-4" />
              Send Mock Review Request
            </Button>
          </form>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold text-ink">Campaign activity</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {campaignLogs.slice(0, 8).map((log) => (
              <div key={log.id} className="py-3">
                <p className="text-sm font-semibold text-ink">{log.message}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {log.agent} · {log.timestamp}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
