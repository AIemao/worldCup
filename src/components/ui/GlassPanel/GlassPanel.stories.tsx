import type { Meta, StoryObj } from "@storybook/react";
import { GlassPanel } from "./GlassPanel";

const meta = {
  title: "UI/GlassPanel",
  component: GlassPanel,
  parameters: { layout: "centered" },
  args: { children: null },
} satisfies Meta<typeof GlassPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex h-56 w-80 items-center justify-center overflow-hidden rounded-xl">
    <div className="from-brand/30 via-background to-background/60 absolute inset-0 bg-gradient-to-br" />
    <div className="bg-brand/20 absolute top-4 right-4 h-20 w-20 rounded-full blur-2xl" />
    <div className="bg-brand/15 absolute bottom-4 left-4 h-16 w-16 rounded-full blur-xl" />
    <div className="relative z-10 w-64">{children}</div>
  </div>
);

export const Low: Story = {
  render: () => (
    <Demo>
      <GlassPanel intensity="low" className="p-4">
        <p className="text-sm font-medium">Low intensity glass</p>
        <p className="text-muted-foreground text-xs">backdrop-blur-sm</p>
      </GlassPanel>
    </Demo>
  ),
};

export const Medium: Story = {
  render: () => (
    <Demo>
      <GlassPanel intensity="medium" className="p-4">
        <p className="text-sm font-medium">Medium intensity glass</p>
        <p className="text-muted-foreground text-xs">backdrop-blur-md</p>
      </GlassPanel>
    </Demo>
  ),
};

export const High: Story = {
  render: () => (
    <Demo>
      <GlassPanel intensity="high" className="p-4">
        <p className="text-sm font-medium">High intensity glass</p>
        <p className="text-muted-foreground text-xs">backdrop-blur-xl</p>
      </GlassPanel>
    </Demo>
  ),
};

export const WithGlow: Story = {
  render: () => (
    <Demo>
      <GlassPanel intensity="high" glow="md" className="p-4">
        <p className="text-brand text-sm font-medium">Glow effect</p>
        <p className="text-muted-foreground text-xs">shadow-glow</p>
      </GlassPanel>
    </Demo>
  ),
};
