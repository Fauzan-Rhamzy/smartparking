export type SlotStatus = "empty" | "occupied" | "inactive";

export interface ParkingSlotData {
  id: number;
  status: SlotStatus;
}