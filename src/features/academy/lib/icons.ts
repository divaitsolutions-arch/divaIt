import {
  Code2,
  Megaphone,
  Palette,
  Film,
  Briefcase,
  Brain,
  LineChart,
  Wallet,
  Banknote,
  type LucideIcon
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Megaphone,
  Palette,
  Film,
  Briefcase,
  Brain,
  LineChart,
  Wallet,
  Banknote,
};

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Code2;
}
