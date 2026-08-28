import { Monitor, UserCheck, FolderKanban, Award } from "lucide-react";
import type { ReactNode } from "react";

/* ── Floating card icon + accent colour maps ──
   Each card gets its own icon tint + soft bg, matching the reference
   (purple / pink alternating). */

type CardMeta = { icon: ReactNode; bg: string };

export const CARD_META: Record<string, CardMeta> = {
  "Live Classes": {
    icon: <Monitor size={14} className="text-blue-500" />,
    bg: "bg-blue-500/10",
  },
  "Mentor Support": {
    icon: <UserCheck size={14} className="text-emerald-500" />,
    bg: "bg-emerald-500/10",
  },
  "Real Projects": {
    icon: <FolderKanban size={14} className="text-amber-500" />,
    bg: "bg-amber-500/10",
  },
  Certificate: {
    icon: <Award size={14} className="text-purple-500" />,
    bg: "bg-purple-500/10",
  },
};

/* ── Floating card position presets ── */
export const CARD_POSITIONS: Record<string, string> = {
  "top-left":
    "-top-4 -left-4 sm:-left-8 lg:-left-16",
  right:
    "top-4 -right-4 sm:-right-8 lg:-right-16",
  "bottom-left":
    "-bottom-8 -left-4 sm:-left-8 lg:-left-16",
  "bottom-right":
    "-bottom-12 -right-4 sm:-right-8 lg:-right-16",
};

