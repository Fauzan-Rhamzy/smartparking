// import Header from "./components/Header";

import { useEffect, useState } from "react";
import EmptySlotsInfo from "./components/EmptySlotInfo.tsx";
import ParkingSlotHorizontal from "./components/ParkingSlotHorizontal.tsx";
import ParkingSlotVertical from "./components/ParkingSlotVertical.tsx";
import Pillar from "./components/Pillar.tsx";
import RoadVertical from "./components/RoadVertical.tsx";
import type { ParkingSlotData } from "./types.ts";

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

      <div className="relative min-h-screen items-center flex justify-center">
        {/* <div className="flex flex-col w-fit"> */}
        <div className="flex flex-col w-fit mt-10">
          {/* atas */}
          <div className="ml-1 mb-10 flex">
            <div className="m-3">
              <ParkingSlotHorizontal id={1} slots={slots} />
            </div>
            <div className="m-3">
              <ParkingSlotHorizontal id={2} slots={slots} />
            </div>
            <div className="m-3">
              <ParkingSlotHorizontal id={3} slots={slots} />
            </div>
            <div className="m-3">
              <ParkingSlotHorizontal id={4} slots={slots} />
            </div>
          </div>

          {/* tengah */}
          <div className="flex gap-20 ml-1">
            {/* kiri */}
            <div className="flex gap-2">
              {/* kiri A */}
              <div className="kiri-A ml-1">
                <div className="">
                  <Pillar />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={5} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={6} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={7} slots={slots} />
                </div>

                <div className="">
                  <Pillar />
                </div>

                <div className="">
                  <ParkingSlotHorizontal id={8} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={9} slots={slots} />
                </div>

                <div className="">
                  <Pillar />
                </div>

                <div className="">
                  <ParkingSlotHorizontal id={10} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={11} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={12} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={13} slots={slots} />
                </div>

                <div className="">
                  <Pillar />
                </div>

                <div className="">
                  <ParkingSlotHorizontal id={14} slots={slots} />
                </div>
              </div>

              {/* kiri B */}
              <div className="kiri-B flex flex-col items-end">
                <div className="">
                  <Pillar />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={15} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={16} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={17} slots={slots} />
                </div>

                <div className="">
                  <Pillar />
                </div>

                <div className="">
                  <ParkingSlotHorizontal id={18} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={19} slots={slots} />
                </div>

                <div className="">
                  <Pillar />
                </div>

                <div className="">
                  <ParkingSlotHorizontal id={20} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={21} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={22} slots={slots} />
                </div>
                <div className="">
                  <ParkingSlotHorizontal id={23} slots={slots} />
                </div>

                <div className="">
                  <Pillar />
                </div>

                <div className="">
                  <ParkingSlotHorizontal id={24} slots={slots} />
                </div>
              </div>
            </div>

            {/* kanan */}
            <div className="flex gap-2">
              {/* parkir */}
              <div className="flex flex-col gap-2 items-end mt-3">
                <ParkingSlotVertical id={25} slots={slots} />
                <ParkingSlotVertical id={26} slots={slots} />
                <ParkingSlotVertical id={27} slots={slots} />
                <ParkingSlotVertical id={28} slots={slots} />
                <ParkingSlotVertical id={29} slots={slots} />
                <Pillar />
              </div>

              {/* jalan naik */}
              <div className="flex">
                <RoadVertical way="up" />
                <RoadVertical way="down" />
              </div>
            </div>
          </div>

          {/* bawah kanan */}
          <div className="flex gap-2 items-end ml-auto mt-10 self-end mr-3">
            <ParkingSlotVertical id={30} slots={slots} />
            <ParkingSlotVertical id={31} slots={slots} />
            <ParkingSlotVertical id={32} slots={slots} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
