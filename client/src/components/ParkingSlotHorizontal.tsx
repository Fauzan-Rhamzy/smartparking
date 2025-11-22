import type { SlotStatus } from "@/types";

function ParkingSlotHorizontal({
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
      <svg width="70" height="50" viewBox="0 0 100 50">
        <rect width="100" height="50" fill={color[status]} />
        <text
          x="50"
          y="25"
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
export default ParkingSlotHorizontal;
