import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  service: z.string().trim().min(1).max(120),
  date: z.string().trim().min(4).max(40),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

