import type { SlotStatus } from "@/types";

function ParkingSlotVertical({
  id,
  slots,
  status = "inactive",
}: {
  id?: number;
  slots?: any[];
  status?: SlotStatus;
}) {
  const slot = slots?.find((s: any) => s.id === id);
  status = slot?.status ?? status ?? "inactive";

  const color = {
    empty: "#A5D68A",
    occupied: "#E57373",
    inactive: "#BDBDBD",
  };

  return (
    <>
      <svg width="40" height="100" viewBox="0 0 50 100">
        <rect width="50" height="100" fill={color[status]} />
        <text
          x="25"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fill="#000"
          fontWeight="bold"
        >
          {id}
        </text>
      </svg>
    </>
  );
}

export default ParkingSlotVertical;
