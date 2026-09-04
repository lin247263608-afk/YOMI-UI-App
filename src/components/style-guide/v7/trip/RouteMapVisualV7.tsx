import type { ReactNode } from "react";
import { Navigation2 } from "lucide-react";

export function RouteMapVisualV7({ children }: { children?: ReactNode }) {
  return (
    <div className="relative h-[300px] overflow-hidden bg-[#F1F4F2]">
      <svg
        aria-hidden="true"
        viewBox="0 0 375 300"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <rect width="375" height="300" fill="#F1F4F2" />
        <path
          d="M-20 82 C48 62 85 96 143 78 S250 40 400 66"
          fill="none"
          stroke="#DCE5E0"
          strokeWidth="18"
        />
        <path
          d="M-25 230 C62 204 89 235 151 217 S262 182 405 204"
          fill="none"
          stroke="#DDE6EA"
          strokeWidth="24"
        />
        <path
          d="M-25 230 C62 204 89 235 151 217 S262 182 405 204"
          fill="none"
          stroke="#C8DDE5"
          strokeWidth="8"
        />
        <g fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round">
          <path d="M24 -10 L74 310" />
          <path d="M119 -20 L108 316" />
          <path d="M225 -12 L204 316" />
          <path d="M326 -16 L284 318" />
          <path d="M-18 32 L398 126" />
          <path d="M-14 151 L397 112" />
          <path d="M-11 278 L394 239" />
        </g>
        <g fill="none" stroke="#D7DEDA" strokeWidth="2.5" strokeLinecap="round">
          <path d="M52 -10 L177 307" />
          <path d="M174 -10 L349 310" />
          <path d="M-10 118 L386 22" />
          <path d="M-10 186 L388 282" />
          <path d="M28 290 C91 240 113 159 165 112 C214 67 279 62 356 15" />
        </g>
        <path
          d="M78 236 C93 195 118 190 143 173 C176 151 170 115 209 102 C241 91 271 108 305 70"
          fill="none"
          stroke="#F27835"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 9"
        />
        <circle cx="78" cy="236" r="7" fill="#F27835" stroke="#FFFFFF" strokeWidth="4" />
        <circle cx="305" cy="70" r="7" fill="#1B2A40" stroke="#FFFFFF" strokeWidth="4" />
        <g fill="#D7DFDB">
          <rect x="15" y="20" width="34" height="18" rx="4" />
          <rect x="136" y="92" width="29" height="17" rx="4" />
          <rect x="257" y="134" width="41" height="20" rx="4" />
          <rect x="313" y="231" width="36" height="18" rx="4" />
          <rect x="66" y="128" width="27" height="15" rx="4" />
        </g>
      </svg>

      <span className="absolute left-[49%] top-[47%] flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-ink text-white shadow-card">
        <Navigation2 className="size-4.5 rotate-[18deg]" fill="currentColor" strokeWidth={1.8} />
      </span>
      <span className="absolute bottom-3 right-3 rounded-lg bg-card/95 px-2 py-1 font-mono text-[9px] text-ink-soft shadow-sm ring-1 ring-ink/[0.05]">
        LIVE ROUTE
      </span>
      {children}
    </div>
  );
}
