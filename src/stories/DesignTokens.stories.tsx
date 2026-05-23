import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Foundation/Design Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visualização dos tokens de design do projeto — cores, tipografia e espaçamento definidos via CSS variables no `src/index.css`.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div className="space-y-2">
        <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Typography Scale
        </p>
        <h1 className="text-foreground text-5xl font-bold tracking-tight">World Cup 2026</h1>
        <h2 className="text-foreground text-3xl font-semibold tracking-tight">Group Stage</h2>
        <h3 className="text-foreground text-xl font-medium">Match Preview</h3>
        <p className="text-muted-foreground text-base">48 teams, 3 host countries, 104 matches.</p>
        <p className="text-muted-foreground text-sm">June 11 – July 19, 2026</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        Color Palette
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "background", css: "bg-background border border-border" },
          { label: "card", css: "bg-card" },
          { label: "primary", css: "bg-primary" },
          { label: "secondary", css: "bg-secondary" },
          { label: "muted", css: "bg-muted" },
          { label: "accent", css: "bg-accent" },
          { label: "destructive", css: "bg-destructive" },
          { label: "border", css: "bg-border" },
        ].map(({ label, css }) => (
          <div key={label} className="space-y-1">
            <div className={`h-12 rounded-md ${css}`} />
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};
