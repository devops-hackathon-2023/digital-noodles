import {Draggable} from "react-beautiful-dnd";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import Image from "next/image";
import chartImg from "@/assets/images/chart.png";
import React from "react";
import {Blocks} from "lucide-react";
import {DraggableWidgetProps} from "@/components/organisms/widgets/type";

const HealthCheckWidget: React.FC<DraggableWidgetProps> = ({
                                                             id,
                                                             index,
                                                             isDragDisabled = false
                                                           }) => {
  return (
        <Card
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
            <CardTitle className="flex justify-between items-center w-full">
              <div className="text-2xl font-bold">Healthcheck</div>
              <Blocks className={"mr-2 h-6 w-6"}/>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-5">
            <Image src={chartImg} alt={"chart"} style={{maxWidth: "300px"}} className={"hidden md:block"}/>
          </CardContent>
        </Card>
  )
}

export default HealthCheckWidget