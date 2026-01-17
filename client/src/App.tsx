// import Header from "./components/Header";

import { useEffect, useState } from "react";
import EmptySlotsInfo from "./components/EmptySlotInfo.tsx";
import ParkingSlotVertical from "./components/ParkingSlotVertical.tsx";
import Pillar from "./components/Pillar.tsx";
import type { ParkingSlotData } from "./types.ts";
import StairsArea from "./components/StairsArea.tsx";
import LiftArea from "./components/LiftArea.tsx";

// Place this outside the App function or in a separate file
function RoadArrow({ dir }: { dir: "up" | "down" | "left" | "right" }) {
  const rotation = {
    up: "rotate(-90deg)",
    down: "rotate(90deg)",
    left: "rotate(180deg)",
    right: "rotate(0deg)",
  };

  return (
    <div
      className="flex items-center justify-center w-full h-full opacity-50"
      style={{ transform: rotation[dir] }}
    >
      {/* Simple Arrow SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-600"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );
}

const RAW_MAP = [
  // ROW 1
  [
    "X",
    "X",
    "X",
    "X",
    "T",
    "P",
    "P",
    "T",
    "P",
    "P",
    "P",
    "T",
    "P",
    "X",
    "P",
    "T",
    "P",
    "P",
    "P",
    "T",
    "P",
    "P",
    "P",
    "X",
  ],

  // ROW 2
  [
    "X",
    "_",
    "_",
    "_",
    "_",
    "_",
    ">",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ">",
    "_",
    "_",
    "_",
    "_",
    "_",
    "X",
  ],

  // ROW 3
  [
    "X",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "X",
  ],

  // ROW 4
  [
    "X",
    "^",
    "_",
    "T",
    "P",
    "P",
    "P",
    "T",
    "P",
    "P",
    "L",
    "L",
    "L",
    "L",
    "L",
    "L",
    "L",
    "P",
    "P",
    "T",
    "P",
    "_",
    "V",
    "X",
  ],

  // ROW 5
  [
    "X",
    "_",
    "_",
    "T",
    "P",
    "P",
    "P",
    "T",
    "P",
    "P",
    "L",
    "L",
    "L",
    "L",
    "L",
    "L",
    "L",
    "P",
    "P",
    "T",
    "P",
    "_",
    "_",
    "X",
  ],

  // ROW 6
  [
    "X",
    "_",
    "_",
    "_",
    "_",
    "_",
    "<",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "<",
    "_",
    "_",
    "_",
    "_",
    "_",
    "X",
  ],

  // ROW 7
  [
    "X",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "X",
  ],

  // ROW 8
  [
    "X",
    "^",
    "_",
    "T",
    "V",
    "_",
    "P",
    "T",
    "P",
    "P",
    "P",
    "S",
    "S",
    "S",
    "S",
    "S",
    "P",
    "P",
    "P",
    "T",
    "P",
    "P",
    "P",
    "X",
  ],
];

function App() {
  const [slots, setSlots] = useState<ParkingSlotData[]>([]);
  const [emptySlots, setEmptySlots] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        // from local
        // const response = await fetch("http://localhost:3000/api/sensors");
        // from actual server
        const response = await fetch("http://34.50.93.23:3000/api/sensors");
        const dataJson = await response.json();

        setSlots(dataJson);
        setEmptySlots(
          dataJson.filter((s: ParkingSlotData) => s.status === "empty").length
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unknown error", error);
        }
      }
    };
    getData();
  });
  // const [slots, setSlots] = useState<ParkingSlotData[]>([
  // { id: 1, status: "empty" },
  // { id: 2, status: "occupied" },
  // { id: 3, status: "inactive" },
  // { id: 4, status: "empty" },
  // { id: 5, status: "occupied" },
  // { id: 6, status: "empty" },
  // { id: 7, status: "inactive" },
  // { id: 8, status: "empty" },
  // { id: 9, status: "occupied" },
  // { id: 10, status: "empty" },
  // { id: 11, status: "inactive" },
  // { id: 12, status: "empty" },
  // { id: 13, status: "occupied" },
  // { id: 14, status: "empty" },
  // { id: 15, status: "occupied" },
  // { id: 16, status: "inactive" },
  // { id: 17, status: "empty" },
  // { id: 18, status: "occupied" },
  // { id: 19, status: "empty" },
  // { id: 20, status: "occupied" },
  // { id: 21, status: "inactive" },
  // { id: 22, status: "empty" },
  // { id: 23, status: "empty" },
  // { id: 24, status: "occupied" },
  // { id: 25, status: "inactive" },
  // { id: 26, status: "empty" },
  // { id: 27, status: "occupied" },
  // { id: 28, status: "empty" },
  // { id: 29, status: "occupied" },
  // { id: 30, status: "inactive" },
  // { id: 31, status: "empty" },
  // { id: 32, status: "occupied" },
  // ]);

  let slotCounter = 1;
  const renderGrid = () => {
    const gridItems: React.ReactNode[] = [];

    for (let r = 0; r < RAW_MAP.length; r++) {
      for (let c = 0; c < RAW_MAP[r].length; c++) {
        const type = RAW_MAP[r][c];

        if (
          c > 0 &&
          type === RAW_MAP[r][c - 1] &&
          (type === "L" || type === "S")
        ) {
          continue;
        }

        if (r === 4 && type === "L") {
          continue;
        }

        let colSpan = 1;
        let rowSpan = 1;
        if (type === "L" || type === "S") {
          let tempC = c + 1;
          while (tempC < RAW_MAP[r].length && RAW_MAP[r][tempC] === type) {
            colSpan++;
            tempC++;
          }
        }

        if (type === "L" && r === 3) {
          rowSpan = 2;
        }

        let content = null;
        let className = "relative flex items-center justify-center";
        const key = `${r}-${c}`;

        if (type === "X") {
          content = <div />;
        } else if (type === "_") {
          content = <div className="w-full h-full opacity-10" />;
        } else if (type === ">") {
          content = <RoadArrow dir="right" />;
        } else if (type === "<") {
          content = <RoadArrow dir="left" />;
        } else if (type === "^") {
          content = <RoadArrow dir="up" />;
        } else if (type === "V") {
          content = <RoadArrow dir="down" />;
        } else if (type === "T") {
          content = <Pillar />;
        } else if (type === "P") {
          const id = slotCounter++;
          content = <ParkingSlotVertical id={id} slots={slots} />;
        } else if (type === "L") {
          className +=
            " bg-gray-700 rounded-md border border-gray-600 text-white font-bold overflow-hidden";
          content = (
            <div className="scale-125 transform p-4">
              <LiftArea />
            </div>
          );
        } else if (type === "S") {
          className +=
            " bg-gray-300 rounded-md border border-gray-400 overflow-hidden";
          content = (
            <div className="scale-110 transform">
              <StairsArea />
            </div>
          );
        }

        gridItems.push(
          <div
            key={key}
            className={className}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
            }}
          >
            {content}
          </div>
        );
      }
    }
    return gridItems;
  };

  return (
    <>
      <div className="fixed top-6 left-6 z-50">
        <EmptySlotsInfo empty={emptySlots} />
      </div>

      <div className="min-h-screen bg-gray-200 p-8 mx-auto overflow-auto">
        <div
          className="grid gap-2 bg-blue-100 border-4 border-blue-200 p-4 rounded-xl shadow-2xl"
          style={{
            gridTemplateColumns: "repeat(24, minmax(40px, 1fr))",
            gridTemplateRows: `
              minmax(120px, auto)  /* Row 1: Top Parking */
              30px                 /* Row 2: Road */
              30px                 /* Row 3: Road */
              minmax(120px, auto)  /* Row 4: Mid Top */
              minmax(120px, auto)  /* Row 5: Mid Bottom */
              30px                 /* Row 6: Road */
              30px                 /* Row 7: Road */
              minmax(120px, auto)  /* Row 8: Bot Parking */
            `,
            minWidth: "1200px",
          }}
        >
          {renderGrid()}
        </div>
      </div>
    </>
  );
}

export default App;
