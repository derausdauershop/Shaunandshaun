"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ChevronDown, Gift, Loader2 } from "lucide-react";
import { InfinityMark } from "@/components/brand/infinity-mark";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FALLBACK_VOUCHER, formatEuro } from "@/content/voucher";
import { voucherCheckoutUrl, voucherOrderSchema } from "@/lib/shopify";
import { cn } from "@/lib/utils";

const MAX_MESSAGE = 200;

type FieldErrors = Partial<Record<"variantId" | "recipientEmail" | "recipientName" | "message" | "sendOn", string>>;

function SubmitButton({ amount, pending }: { amount?: number; pending: boolean }) {
  return (
    <Button type="submit" variant="brand" size="lg" disabled={pending || amount === undefined} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden /> Weiter zur Kasse …
        </>
      ) : (
        <>Jetzt kaufen{amount !== undefined && ` · ${formatEuro(amount)}`}</>
      )}
    </Button>
  );
}

/** Live preview of the voucher in the AUSDAUER design. */
function VoucherPreview({ amount, name }: { amount?: number; name?: string }) {
  return (
    <div className="relative aspect-[1.6] w-full max-w-md overflow-hidden rounded-sm bg-brand p-6 text-white shadow-xl [clip-path:polygon(3%_0,100%_0,97%_100%,0_100%)] sm:p-8">
      <InfinityMark variant="track" strokeWidth={4} className="absolute -right-[18%] top-[12%] h-[85%] w-auto text-white/25" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/85">Geschenk-Gutschein</p>
        <p className="mt-auto font-display text-6xl font-black italic leading-none tabular sm:text-7xl" aria-live="polite">
          {amount !== undefined ? formatEuro(amount) : "– €"}
        </p>
        <p className="mt-3 font-display text-xl font-bold uppercase leading-none">
          {name ? `Für ${name}` : "Deine nächsten Kilometer."}
        </p>
      </div>
    </div>
  );
}

export function VoucherForm() {
  const product = FALLBACK_VOUCHER;
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const defaultId = product.variants.find((v) => v.amount === 50)?.id ?? product.variants[0]?.id;
  const [variantId, setVariantId] = useState(defaultId);
  const [gift, setGift] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const amount = product.variants.find((v) => v.id === variantId)?.amount;
  const e = errors;

  // Back from the Shopify checkout (page restored from cache): make the button usable again.
  useEffect(() => {
    const reset = (ev: PageTransitionEvent) => ev.persisted && setPending(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  /** Validates in the browser, creates the Shopify cart and sends the buyer to the Shopify checkout. */
  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const text = (key: string) => {
      const value = data.get(key);
      return typeof value === "string" && value.trim() !== "" ? value : undefined;
    };
    const parsed = voucherOrderSchema.safeParse({
      variantId: text("variantId") ?? "",
      gift,
      recipientName: text("recipientName"),
      recipientEmail: text("recipientEmail"),
      message: text("message"),
      sendOn: text("sendOn"),
    });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0]) as keyof FieldErrors] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setPending(true);
    window.location.href = await voucherCheckoutUrl(parsed.data);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div className="lg:sticky lg:top-24">
        <VoucherPreview amount={amount} name={gift ? name.trim() : undefined} />
      </div>

      <form onSubmit={onSubmit} className="space-y-8" noValidate>
        <fieldset>
          <legend className="font-display text-2xl font-black uppercase">1 · Betrag wählen</legend>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={cn(
                  "flex h-14 cursor-pointer items-center justify-center rounded-sm bg-white font-display text-2xl font-black italic ring-1 ring-border transition-colors tabular",
                  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink",
                  variantId === v.id ? "bg-ink text-paper ring-ink" : "hover:ring-ink",
                )}
              >
                <input type="radio" name="variantId" value={v.id} checked={variantId === v.id} onChange={() => setVariantId(v.id)} className="sr-only" />
                {formatEuro(v.amount)}
              </label>
            ))}
          </div>
          {e.variantId && <p className="mt-2 text-sm text-destructive">{e.variantId}</p>}
        </fieldset>

        <Collapsible open={gift} onOpenChange={setGift}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 rounded-sm bg-white p-4 text-left ring-1 ring-border hover:ring-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span className="flex items-center gap-3">
                <Gift className="size-5 text-brand" aria-hidden />
                <span>
                  <span className="block font-display text-2xl font-black uppercase">2 · Direkt verschenken</span>
                  <span className="text-sm text-muted-foreground">Optional: Wir schicken den Gutschein an die beschenkte Person.</span>
                </span>
              </span>
              <ChevronDown className={cn("size-5 shrink-0 transition-transform", gift && "rotate-180")} aria-hidden />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="recipientName">Name der beschenkten Person</Label>
                <Input id="recipientName" name="recipientName" maxLength={60} value={name} onChange={(ev) => setName(ev.target.value)} autoComplete="off" />
                {e.recipientName && <p className="text-sm text-destructive">{e.recipientName}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="recipientEmail">E-Mail der beschenkten Person *</Label>
                <Input id="recipientEmail" name="recipientEmail" type="email" autoComplete="off" aria-invalid={!!e.recipientEmail} />
                {e.recipientEmail && <p className="text-sm text-destructive">{e.recipientEmail}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <Label htmlFor="message">Persönliche Nachricht</Label>
                <span className="font-mono text-xs text-muted-foreground tabular">
                  {message.length}/{MAX_MESSAGE}
                </span>
              </div>
              <Textarea id="message" name="message" rows={3} maxLength={MAX_MESSAGE} value={message} onChange={(ev) => setMessage(ev.target.value)} />
              {e.message && <p className="text-sm text-destructive">{e.message}</p>}
            </div>
            <div className="space-y-1.5 sm:max-w-xs">
              <Label htmlFor="sendOn">Versanddatum (leer = sofort)</Label>
              <Input id="sendOn" name="sendOn" type="date" />
              {e.sendOn && <p className="text-sm text-destructive">{e.sendOn}</p>}
            </div>
          </CollapsibleContent>
        </Collapsible>


        <div className="space-y-3">
          <SubmitButton amount={amount} pending={pending} />
          <p className="text-sm text-muted-foreground">Bezahlung sicher in der Shopify-Kasse. Den Gutschein bekommst du per E-Mail.</p>
        </div>
      </form>
    </div>
  );
}
