import {
  dayName,
  listAvailabilityRules,
} from "@/lib/services/availability.service";
import { saveAvailabilityAction } from "@/app/(admin)/actions/availability";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  ShadcnCard,
  ShadcnCardContent,
  ShadcnCardHeader,
  ShadcnCardTitle,
} from "@/components/ui/shadcn/card";

export default async function AvailabilityPage() {
  const rules = await listAvailabilityRules();
  const byDay = new Map(rules.map((r) => [r.dayOfWeek, r]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="text-muted-foreground">Weekly business hours</p>
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 7 }, (_, dayOfWeek) => {
          const rule = byDay.get(dayOfWeek);
          return (
            <ShadcnCard key={dayOfWeek}>
              <ShadcnCardHeader>
                <ShadcnCardTitle className="text-base">{dayName(dayOfWeek)}</ShadcnCardTitle>
              </ShadcnCardHeader>
              <ShadcnCardContent>
                <form action={saveAvailabilityAction} className="flex flex-wrap items-end gap-4">
                  <input type="hidden" name="dayOfWeek" value={dayOfWeek} />
                  <div className="space-y-2">
                    <Label htmlFor={`start-${dayOfWeek}`}>Opens</Label>
                    <Input
                      id={`start-${dayOfWeek}`}
                      name="startTime"
                      defaultValue={rule?.startTime || "10:00"}
                      pattern="^\d{2}:\d{2}$"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-${dayOfWeek}`}>Closes</Label>
                    <Input
                      id={`end-${dayOfWeek}`}
                      name="endTime"
                      defaultValue={rule?.endTime || "18:00"}
                      pattern="^\d{2}:\d{2}$"
                      required
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm pb-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      defaultChecked={rule?.isActive ?? true}
                    />
                    Open
                  </label>
                  <Button type="submit">Save</Button>
                </form>
              </ShadcnCardContent>
            </ShadcnCard>
          );
        })}
      </div>
    </div>
  );
}
