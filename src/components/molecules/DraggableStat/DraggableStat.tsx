import React from 'react';
import {StatType} from "@/utils/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import chartImg from "@/assets/images/chart.png"
import healthCheck from "@/assets/images/healthCheckWidget.png"
import buildTime from "@/assets/images/buildTimeWidget.png"
import gateWidget from "@/assets/images/gateWidget.png"
import Image from "next/image";

interface DraggableStatProps {
  icon: React.ReactNode,
  statType: StatType,
  label: string,
  onDragStart: (statType: StatType) => void
}

const DraggableStat: React.FC<DraggableStatProps> = ({
                                                       label,
                                                       statType,
                                                       icon,
                                                       onDragStart
                                                     }) => {
  return (
    <>
      <Card className="droppable-element" draggable={true} unselectable="on" onDragStart={e => {
        e.dataTransfer.setData("text/plain", "")
        onDragStart(statType)
      }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
          <CardTitle className="flex justify-between items-center w-full">
            <div className="text-2xl font-bold">{label}</div>
            {icon}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5">
          {statType === StatType.HEALTHCHECK &&
              <Image src={healthCheck} alt={"widget"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>}
          {statType === StatType.SYSTEM_RAM_USAGE &&
              <Image src={chartImg} alt={"widget"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>}
          {statType === StatType.SYSTEM_CPU_USAGE &&
              <Image src={chartImg} alt={"widget"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>}
          {statType === StatType.STATS_AVG_BUILD_TIME &&
              <Image src={buildTime} alt={"widget"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>}
          {statType === StatType.STATS_GATES_FAILED_PASSED &&
              <Image src={gateWidget} alt={"widget"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>}
        </CardContent>
      </Card>
    </>
  );
};

export default DraggableStat;
