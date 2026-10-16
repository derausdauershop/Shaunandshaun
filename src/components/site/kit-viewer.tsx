"use client";

import Image from "next/image";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Kit } from "@/content/teamwear";
import { cn } from "@/lib/utils";

/** Jersey mock-up that turns from front to back (CSS 3D, no WebGL – fast on every phone). */
export function KitViewer({ kit, className }: { kit: Kit; className?: string }) {
  const [back, setBack] = useState(false);
  const side = back ? "Rückseite" : "Vorderseite";
  return (
    <figure className={cn("min-w-0", className)}>
      <button
        type="button"
        onClick={() => setBack((b) => !b)}
        aria-label={`${kit.club}: ${side} – zum Umdrehen tippen`}
        className="group block w-full rounded-sm bg-white p-6 ring-1 ring-border [perspective:1600px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          className={cn(
            "relative aspect-[4/5] transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none",
            back ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(-12deg)]",
          )}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image src={kit.front} alt={`${kit.club} ${kit.title}, Vorderseite`} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-contain" />
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image src={kit.back} alt={`${kit.club} ${kit.title}, Rückseite`} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-contain" />
          </div>
        </div>
      </button>
      <figcaption className="mt-4 flex flex-col items-start gap-3">
        <div className="min-w-0">
          <p className="font-display text-2xl font-black uppercase italic leading-none">{kit.club}</p>
          <p className="mt-1 text-sm text-muted-foreground">{kit.title}</p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
            {kit.prints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setBack((b) => !b)} aria-pressed={back}>
          <RotateCcw aria-hidden /> {back ? "Vorderseite" : "Rückseite"}
        </Button>
      </figcaption>
    </figure>
  );
}
