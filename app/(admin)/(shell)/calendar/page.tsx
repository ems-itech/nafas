import { listReservations, toCalendarEvents } from "@/lib/services/reservation.service";
import { ReservationsCalendar } from "@/components/admin/ReservationsCalendar";

export default async function CalendarPage() {
  const rows = await listReservations();
  const events = toCalendarEvents(rows);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">Click a slot to create, an event to edit</p>
      </div>
      <ReservationsCalendar events={events} />
    </div>
  );
}
