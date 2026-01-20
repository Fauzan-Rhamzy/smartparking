function LiftArea() {
  const width = 350;
  const height = 182;
  return (
    <svg width={width} height={height} viewBox="0 0 ${width} ${height}">
      <rect width={width} height={height} fill="#9CA3AF" />
      {/* teks lift */}
      <text
        x={width / 2}
        y={height / 2} // posisi vertikal (tengah kotak putih)
        textAnchor="middle"
      >
        Area Lift
      </text>
    </svg>
  );
}

export default LiftArea;
