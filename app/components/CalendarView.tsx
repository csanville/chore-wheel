"use client";

import { useMemo, useState } from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarView() {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));

  const { title, cells } = useMemo(() => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const first = new Date(y, m, 1);
    const leading = first.getDay();
    const count = daysInMonth(y, m);
    const cellList: { day: number | null; inMonth: boolean }[] = [];
    for (let i = 0; i < leading; i++) {
      cellList.push({ day: null, inMonth: false });
    }
    for (let d = 1; d <= count; d++) {
      cellList.push({ day: d, inMonth: true });
    }
    const remainder = cellList.length % 7;
    if (remainder !== 0) {
      for (let i = 0; i < 7 - remainder; i++) {
        cellList.push({ day: null, inMonth: false });
      }
    }
    const monthTitle = new Intl.DateTimeFormat(undefined, {
      month: "long",
      year: "numeric",
    }).format(first);
    return { title: monthTitle, cells: cellList };
  }, [viewDate]);

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-2 py-4 sm:px-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg border border-foreground/15 bg-background px-4 text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:opacity-80"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg border border-foreground/15 bg-background px-4 text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:opacity-80"
          >
            Next
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1 text-center text-base font-medium text-foreground/70">
        {weekdays.map((w) => (
          <div key={w} className="min-h-10 py-2">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => (
          <div
            key={i}
            className={`flex min-h-14 items-center justify-center rounded-lg border text-base ${
              c.inMonth
                ? "border-foreground/10 bg-foreground/5 text-foreground"
                : "border-transparent text-foreground/25"
            }`}
          >
            {c.day ?? "\u00a0"}
          </div>
        ))}
      </div>
    </div>
  );
}
