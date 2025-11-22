export default function RoadVertical({ way }: { way?: "up" | "down" }) {
  const color = way === "up" ? "#808080" : "#606060";
  const height = 572;
  return (
    <svg width="40" height={height} viewBox={`0 0 40 ${height}`}>
      <rect width="40" height={height} fill={color} />
    </svg>
  );
}
