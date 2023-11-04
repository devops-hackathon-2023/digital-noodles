import React from 'react';
import {StatType} from "@/utils/types";
import {Hand} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import Link from "next/link";
import {Button} from "@/components/atoms/button";
import {Progress} from "@/components/atoms/progress";
import chartImg from "@/assets/images/chart.png"
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
          <Image src={chartImg} alt={"chart"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>
        </CardContent>
      </Card>
    </>
  );
};

export default DraggableStat;
