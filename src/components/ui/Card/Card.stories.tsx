import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Match Preview</CardTitle>
        <CardDescription>Group Stage — June 14, 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Brazil vs Argentina</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Watch</Button>
      </CardFooter>
    </Card>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="relative p-8">
      <div className="from-brand/20 to-background absolute inset-0 rounded-xl bg-gradient-to-br" />
      <Card variant="glass" className="relative w-80">
        <CardHeader>
          <Badge variant="success" className="w-fit">
            ● Live
          </Badge>
          <CardTitle>Group A — Match 4</CardTitle>
          <CardDescription>MetLife Stadium · New Jersey</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Brazil 2 – 1 Argentina</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <CardHeader>
        <CardTitle>Top Scorer</CardTitle>
        <CardDescription>Tournament Golden Boot</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">6 goals in 5 matches</p>
      </CardContent>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div className="flex gap-4">
      {["Brazil", "Argentina", "France"].map((team) => (
        <Card key={team} hoverable className="w-40">
          <CardContent className="pt-6">
            <p className="text-center font-semibold">{team}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="h-40">
          <CardContent className="flex h-full items-center justify-center pt-6">
            <span className="text-muted-foreground text-sm">Match {i + 1}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
