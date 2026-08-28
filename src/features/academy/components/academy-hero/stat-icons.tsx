import { Users, Briefcase, TrendingUp, Star } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Map stat icon keys (from content config) to rendered Lucide icons.
 */
export const STAT_ICONS: Record<string, ReactNode> = {
  users: <Users size={22} className="text-primary" />,
  briefcase: <Briefcase size={22} className="text-pink-500" />,
  trending: <TrendingUp size={22} className="text-emerald-500" />,
  star: <Star size={22} className="text-amber-500" />,
};
