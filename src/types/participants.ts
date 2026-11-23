import { z } from "zod";

const ParticipantSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Participant = z.infer<typeof ParticipantSchema>;

export const toParticipant = (data: unknown): Participant => {
  return ParticipantSchema.parse(data);
};
