import { toParticipant, type Participant } from "@/types/participant";

const PARTICIPANT_KEY = "participants";

export const getParticipants = (): Participant[] => {
  const data = localStorage.getItem(PARTICIPANT_KEY);
  if (!data) return [];

  const parsed = JSON.parse(data);
  if (!Array.isArray(parsed)) {
    throw new Error("Participants data is not constructed well");
  }

  return parsed.map(toParticipant);
};

export const updateParticipant = (
  id: string,
  data: Partial<Omit<Participant, "id">>,
): void => {
  const participants = getParticipants();
  const target = participants.find((p) => p.id === id);
  if (!target) {
    throw new Error(`Target ${id} not found`);
  }

  for (const [key, value] of Object.entries(data)) {
    target[key as keyof Participant] = value;
  }

  localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(participants));
};

export const addParticipant = (data: Omit<Participant, "id">): void => {
  const newData: Participant = {
    id: crypto.randomUUID(),
    ...data,
  };
  const participants = getParticipants();
  participants.push(newData);
  localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(participants));
};

export const deleteParticipant = (id: string): void => {
  const participants = getParticipants();
  localStorage.setItem(
    PARTICIPANT_KEY,
    JSON.stringify(participants.filter((p) => p.id !== id)),
  );
};
