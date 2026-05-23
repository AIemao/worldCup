import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { GroupLetter } from "../../types/groups.types";
import { GroupTabs } from "./GroupTabs";

const meta: Meta<typeof GroupTabs> = {
  title: "Groups/GroupTabs",
  component: GroupTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof GroupTabs>;

export const Default: Story = {
  args: { activeGroup: "A", onGroupChange: () => undefined },
};

export const GroupC: Story = {
  args: { activeGroup: "C", onGroupChange: () => undefined },
};

function InteractiveGroupTabs() {
  const [active, setActive] = useState<GroupLetter>("A");
  return (
    <div className="space-y-4">
      <GroupTabs activeGroup={active} onGroupChange={setActive} />
      <p className="text-muted-foreground text-sm">Selected: Group {active}</p>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveGroupTabs />,
};
