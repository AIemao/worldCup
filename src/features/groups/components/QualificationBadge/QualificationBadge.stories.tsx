import type { Meta, StoryObj } from "@storybook/react";
import { QualificationBadge } from "./QualificationBadge";

const meta: Meta<typeof QualificationBadge> = {
  title: "Groups/QualificationBadge",
  component: QualificationBadge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof QualificationBadge>;

export const Qualified: Story = { args: { status: "qualified" } };
export const Playoff: Story = { args: { status: "playoff" } };
export const Eliminated: Story = { args: { status: "eliminated" } };
export const Pending: Story = { args: { status: "pending" } };
export const CompactMode: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <QualificationBadge status="qualified" compact />
      <QualificationBadge status="playoff" compact />
      <QualificationBadge status="eliminated" compact />
      <QualificationBadge status="pending" compact />
    </div>
  ),
};
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <QualificationBadge status="qualified" />
      <QualificationBadge status="playoff" />
      <QualificationBadge status="eliminated" />
      <QualificationBadge status="pending" />
    </div>
  ),
};
