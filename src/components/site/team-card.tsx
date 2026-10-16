import Image from "next/image";
import type { TeamMember } from "@/content/team";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

/** Portrait card for the team grids (Über uns, store pages). */
export function TeamCard({ member, detail, size = "md" }: { member: TeamMember; detail?: string; size?: "md" | "lg" }) {
  return (
    <li className="bg-ink">
      <div className="relative aspect-square overflow-hidden bg-stone-dark/30">
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-6xl font-black italic text-paper/30">
            {initials(member.name)}
          </span>
        )}
      </div>
      <div className={cn(size === "lg" ? "p-6" : "p-5")}>
        <p className={cn("font-display font-black uppercase", size === "lg" ? "text-2xl italic" : "text-xl")}>{member.name}</p>
        <p className={cn(size === "lg" ? "mt-1 font-mono text-xs uppercase tracking-[0.2em] text-brand" : "text-sm text-muted-foreground")}>
          {detail ?? member.role}
        </p>
      </div>
    </li>
  );
}
