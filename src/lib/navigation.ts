import type { NavigationItem } from "@/types/api";

export function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function badgeClass(item: Pick<NavigationItem, "badge_variant" | "badge_animation">) {
  const variant = {
    accent: "bg-accent/10 text-accent ring-accent/20",
    primary: "bg-primary/10 text-primary ring-primary/20",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    info: "bg-sky-50 text-sky-700 ring-sky-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    danger: "bg-red-50 text-red-700 ring-red-200",
    purple: "bg-purple-50 text-purple-700 ring-purple-200",
    dark: "bg-slate-900 text-slate-50 ring-slate-700",
  }[item.badge_variant ?? "accent"] ?? "bg-accent/10 text-accent ring-accent/20";

  const animation = {
    none: "",
    pulse: "animate-pulse",
    blink: "animate-[navBlink_1.1s_steps(2,start)_infinite]",
    bounce: "animate-bounce",
    ping: "after:absolute after:-right-1 after:-top-1 after:h-2 after:w-2 after:rounded-full after:bg-accent after:animate-ping",
    shake: "animate-[navShake_1.2s_ease-in-out_infinite]",
    glow: "animate-[navGlow_1.8s_ease-in-out_infinite]",
    slide: "overflow-hidden before:absolute before:inset-y-0 before:-left-full before:w-full before:bg-white/30 before:skew-x-[-20deg] before:animate-[navShine_2s_ease-in-out_infinite]",
  }[item.badge_animation ?? "none"] ?? "";

  return `relative inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ring-1 ${variant} ${animation}`;
}
