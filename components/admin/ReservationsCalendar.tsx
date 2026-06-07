"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarEvent = Event & { id?: string };

type Props = {
  events: CalendarEvent[];
};

export function ReservationsCalendar({ events }: Props) {
  const router = useRouter();
  const memoEvents = useMemo(() => events, [events]);

  return (
    <div className="h-[700px] rounded-lg border border-border bg-card p-4">
      <Calendar
        localizer={localizer}
        events={memoEvents}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="week"
        onSelectEvent={(event) => {
          if (event.id) router.push(`/reservations/${event.id}`);
        }}
        onSelectSlot={(slot) => {
          const start = format(slot.start, "yyyy-MM-dd'T'HH:mm");
          router.push(`/reservations/new?start=${encodeURIComponent(start)}`);
        }}
        selectable
        popup
      />
    </div>
  );
}
