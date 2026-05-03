'use client'
/**
 * LogoMark — the WealthLedger icon shown in the dashboard header and auth pages.
 *
 * It is a purely visual SVG inside a floating indigo-to-violet gradient box.
 * No props, no Redux, no logic — just the brand mark.
 */

export function LogoMark() {
  return (
    <div className="animate-float w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-xl shadow-blue-500/30">
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
        {/* Rising line chart — symbolises growing wealth */}
        <polyline
          points="3,22 10,13 16,17 23,8 29,10"
          stroke="white" strokeWidth="2.4"
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Dot at the latest data point */}
        <circle cx="29" cy="10" r="2" fill="white" />
        {/* Baseline */}
        <line
          x1="3" y1="26" x2="29" y2="26"
          stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
