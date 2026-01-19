function LiftArea() {
  // Ukuran viewBox bisa disesuaikan, di sini saya pakai 100x120
  // agar sedikit lebih besar/beda dari slot parkir biasa
  const width = 350;
  const height = 182;
  return (
    <svg width={width} height={height} viewBox="0 0 ${width} ${height}">
      <rect width={width} height={height} fill="#9CA3AF" />
      {/* Teks LIFT */}
      <text
        x={width / 2}
        y={height / 2} // Posisi vertikal (tengah kotak putih)
        textAnchor="middle"
      >
        Area Lift
      </text>
    </svg>
  );
}

export default LiftArea;
