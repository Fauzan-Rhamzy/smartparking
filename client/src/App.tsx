// import Header from "./components/Header";

import { useEffect, useState } from "react";
import EmptySlotsInfo from "./components/EmptySlotInfo.tsx";
import ParkingSlotHorizontal from "./components/ParkingSlotHorizontal.tsx";
import ParkingSlotVertical from "./components/ParkingSlotVertical.tsx";
import Pillar from "./components/Pillar.tsx";
import RoadVertical from "./components/RoadVertical.tsx";
import type { ParkingSlotData } from "./types.ts";
import StairsArea from "./components/StairsArea.tsx";
import LiftArea from "./components/LiftArea.tsx";

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
  return (
    <>
      <div className="fixed top-6 left-6 z-50">
        <EmptySlotsInfo empty={emptySlots} />
      </div>

      <div className="relative min-h-screen items-center flex justify-center bg-blue-100">
        {/* area parkir */}
        <div className=" bg-red-300 flex flex-col">
          {/* atas */}
          <div className="flex items-center gap-2"></div>

          {/* tengah */}
          <div className="flex items-center gap-2">
            {/* kiri lift */}
            <div>
              <Pillar />
            </div>
            <div>
              <div className="flex gap-2">
                <ParkingSlotVertical />
                <ParkingSlotVertical />
                <ParkingSlotVertical />
                <Pillar />
                <ParkingSlotVertical />
                <ParkingSlotVertical />
              </div>
              <div className="flex gap-2 items-baseline-last">
                <ParkingSlotVertical />
                <ParkingSlotVertical />
                <ParkingSlotVertical />
                <Pillar />
                <ParkingSlotVertical />
                <ParkingSlotVertical />
              </div>
            </div>

            {/* lift */}
            <div className="">
              <LiftArea />
            </div>

            {/* kanan lift */}
            <div>
              <div className="flex gap-2">
                <ParkingSlotVertical />
                <ParkingSlotVertical />
                <Pillar />
                <ParkingSlotVertical />
              </div>
              <div className="flex gap-2 items-baseline-last">
                <ParkingSlotVertical />
                <ParkingSlotVertical />
                <Pillar />
                <ParkingSlotVertical />
              </div>
            </div>
          </div>

          {/* bagian bawah */}
          <div className="flex gap-2 mt-20">
            <div className="mr-23">
              <Pillar />
              <Pillar />
            </div>

            <div>
              <ParkingSlotVertical />
            </div>

            <div>
              <Pillar />
            </div>

            <div>
              <ParkingSlotVertical />
            </div>
            <div>
              <ParkingSlotVertical />
            </div>
            <div>
              <ParkingSlotVertical />
            </div>

            <div>
              <StairsArea />
            </div>

            <div>
              <ParkingSlotVertical />
            </div>
            <div>
              <ParkingSlotVertical />
            </div>
            <div>
              <ParkingSlotVertical />
            </div>

            <div>
              <Pillar />
            </div>

            <div>
              <ParkingSlotVertical />
            </div>
            <div>
              <ParkingSlotVertical />
            </div>
            <div>
              <ParkingSlotVertical />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
