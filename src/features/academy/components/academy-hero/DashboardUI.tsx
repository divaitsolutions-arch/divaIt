"use client";

import { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  BarChart3,
  FolderKanban,
  UserCheck,
  Award,
  Users2,
  Settings,
} from "lucide-react";

/* ── Sidebar navigation config ── */
const sidebarItems = [
  { icon: <BarChart3 size={10} />, label: "Dashboard", active: true },
  { icon: <BookOpen size={10} />, label: "My Courses", active: false },
  { icon: <FolderKanban size={10} />, label: "Projects", active: false },
  { icon: <UserCheck size={10} />, label: "Mentors", active: false },
  { icon: <Award size={10} />, label: "Certificates", active: false },
  { icon: <Users2 size={10} />, label: "Community", active: false },
  { icon: <Settings size={10} />, label: "Settings", active: false },
];

/* ── Constants ── */
const DONUT_RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;
const TARGET_PROGRESS = 79;
const TARGET_PROJECTS = 12;
const TARGET_CERTIFICATES = 5;
const PROGRESS_DELAY_MS = 1800;
const COUNT_DELAY_MS = 1900;
const COUNT_DURATION_MS = 1400;

/**
 * Miniature LMS dashboard rendered inside the hero laptop mockup.
 * Self-contained component — owns its own animation state.
 */
export default function DashboardUI() {
  const [progress, setProgress] = useState(0);
  const [counts, setCounts] = useState({ projects: 0, certificates: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(TARGET_PROGRESS), PROGRESS_DELAY_MS);

    const t2 = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const ratio = Math.min(elapsed / COUNT_DURATION_MS, 1);
        const ease = 1 - Math.pow(1 - ratio, 3);
        setCounts({
          projects: Math.round(TARGET_PROJECTS * ease),
          certificates: Math.round(TARGET_CERTIFICATES * ease),
        });
        if (ratio < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, COUNT_DELAY_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col bg-panel text-ink">
      {/* ── Top bar ── */}
      <div className="flex h-8 items-center justify-between border-b border-ink/10 bg-white px-3 sm:h-10 sm:px-4">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded bg-primary text-[7px] font-bold text-white sm:h-5 sm:w-5">
            D
          </div>
          <span className="text-[13px] font-semibold text-ink sm:text-[13px]">
            Diva Academy
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Search size={10} className="text-steel" />
          <UserCheck size={10} className="text-steel" />
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-white sm:h-6 sm:w-6">
            S
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <div className="hidden w-[22%] flex-col border-r border-ink/10 bg-white p-2 sm:flex sm:p-3">
          <div className="space-y-1.5">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-medium ${item.active
                    ? "bg-primary/10 text-primary"
                    : "text-steel hover:bg-ink/5"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 overflow-hidden p-2.5 sm:p-4">
          <div className="mb-0.5 text-[13px] font-semibold text-ink sm:text-[13px]">
            Welcome back, Alex👋
          </div>
          <div className="mb-3 text-[7px] text-steel sm:text-[13px]">
            Let&apos;s continue your learning journey
          </div>

          {/* ── Stats row ── */}
          <div className="mb-2.5 grid grid-cols-3 gap-1.5 sm:gap-2">
            {/* Continue Learning */}
            <div className="rounded-lg border border-ink/10 bg-white p-2">
              <div className="mb-1.5 text-[6.5px] font-semibold text-steel sm:text-[13px]">
                Continue Learning
              </div>
              <div className="mb-1.5 text-[7px] font-bold leading-snug text-ink sm:text-[13px]">
                Full Stack Web Development
              </div>
              <div className="mb-1.5 h-1 w-full overflow-hidden rounded-full bg-ink/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-pink-500 transition-all duration-[1.5s] ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="rounded-md bg-primary py-1 text-center text-[6.5px] font-bold text-white sm:text-[7.5px]">
                Continue
              </div>
            </div>

            {/* Progress donut */}
            <div className="flex flex-col items-center justify-center rounded-lg border border-ink/10 bg-white p-2">
              <div className="mb-1 text-[6.5px] font-semibold text-steel sm:text-[13px]">
                Your Progress
              </div>
              <svg viewBox="0 0 60 60" className="h-9 w-9 -rotate-90 sm:h-11 sm:w-11">
                <circle cx="30" cy="30" r={DONUT_RADIUS} fill="none" stroke="#00000010" strokeWidth="6" />
                <circle
                  cx="30"
                  cy="30"
                  r={DONUT_RADIUS}
                  fill="none"
                  stroke="url(#donutGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
                  style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                />
                <defs>
                  <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="mt-1 text-[13px] font-bold text-primary sm:text-[13px]">
                {progress}%
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-lg border border-ink/10 bg-white p-2">
              <div className="mb-1.5 text-[6.5px] font-semibold text-steel sm:text-[13px]">
                Achievements
              </div>
              <div className="mb-1">
                <div className="text-[13px] font-bold text-primary sm:text-[13px]">
                  {counts.projects}
                </div>
                <div className="text-[6px] text-steel sm:text-[7px]">
                  Projects Completed
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-pink-500 sm:text-[13px]">
                  {counts.certificates}
                </div>
                <div className="text-[6px] text-steel sm:text-[7px]">
                  Certificates Earned
                </div>
              </div>
            </div>
          </div>

          {/* ── Upcoming Classes ── */}
          <div className="rounded-lg border border-ink/10 bg-white p-2">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[6.5px] font-semibold text-ink sm:text-[13px]">
                Upcoming Classes
              </span>
              <span className="text-[6px] font-semibold text-primary sm:text-[7px]">
                View All
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-md bg-primary/5 p-1.5">
                <div>
                  <div className="text-[7px] font-medium text-ink">
                    React Advanced Concepts
                  </div>
                  <div className="text-[6px] text-steel">
                    Mentor: John Doe · Today, 7:00 PM
                  </div>
                </div>
                <div className="h-1 w-8 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-md p-1.5">
                <div>
                  <div className="text-[7px] font-medium text-ink">
                    Node.js &amp; Express
                  </div>
                  <div className="text-[6px] text-steel">
                    Mentor: Sarah Wilson · Tomorrow, 11:00 AM
                  </div>
                </div>
                <div className="h-1 w-8 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full w-1/4 rounded-full bg-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
