import { cn } from "@/lib/utils";

interface StartNumberProps {
  number: string;
  label?: string;
  sublabel?: string;
  variant?: "paper" | "signal" | "ink";
  size?: "md" | "sm";
  className?: string;
}

const variants = {
  paper: "bg-white text-ink border-ink/10",
  signal: "bg-signal text-signal-foreground border-transparent",
  ink: "bg-ink text-paper border-paper/10",
};

/** Bib-style badge for offers, course starts and events. */
export function StartNumber({ number, label, sublabel, variant = "paper", size = "md", className }: StartNumberProps) {
  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center rounded-sm border pb-3 pt-2 text-center shadow-sm",
        size === "md" ? "min-w-40 px-8" : "min-w-28 px-5",
        variants[variant],
        className,
      )}
    >
      {/* Safety-pin holes */}
      {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span key={pos} aria-hidden className={cn("absolute size-2 rounded-full bg-current opacity-25", pos)} />
      ))}
      {label && <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em]">{label}</span>}
      <span className={cn("font-display font-black italic leading-none tabular", size === "md" ? "text-6xl" : "text-4xl")}>{number}</span>
      {sublabel && <span className="mt-1 font-display text-sm font-bold uppercase tracking-wide">{sublabel}</span>}
    </div>
  );
}
