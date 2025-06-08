"use client";
import React from "react";
import { format, getDaysInMonth, startOfMonth, getDay, isToday } from "date-fns";

const Calendar = () => {
  const today = new Date();
  const currentMonth = startOfMonth(today);
  const monthName = format(currentMonth, "MMMM yyyy");
  const totalDays = getDaysInMonth(currentMonth);
  const startWeekday = getDay(currentMonth); // Sunday = 0, Monday = 1...

  const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  // Create leading empty cells for alignment
  const blanks = Array(startWeekday).fill(null);

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-lg">{monthName}</h3>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-slate-500 py-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="py-2" />
        ))}
        {days.map((day) => {
          const dateObj = new Date(today.getFullYear(), today.getMonth(), day);
          const isCurrentDay = isToday(dateObj);
          return (
            <div
              key={day}
              className={`text-center text-sm py-2 cursor-pointer rounded-lg transition-all ${
                isCurrentDay
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-blue-50 text-slate-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
