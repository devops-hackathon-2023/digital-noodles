import {PageResponseQualityGateResponse} from "@/utils/types";
import {NextPage} from "next";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import Link from "next/link";
import {usePathname} from "next/navigation";
import CountUp from "react-countup";

interface QualityChartProps {
  last100QualityGates: PageResponseQualityGateResponse,
}

const QualityGateAveragePercentChart: NextPage<QualityChartProps> = ({
                                                                       last100QualityGates
                                                                     }) => {
  const pathname = usePathname()

  const sumOfPercentages = last100QualityGates.page.reduce((acc, qualityGate) => {
    // @ts-ignore
    return acc + qualityGate.percent ?? 0;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center w-full">
          <Link href={`${pathname}/quality-rates`} className="text-2xl font-bold text-center w-full">Last 20 Quality
            Average
            Percents</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex justify-center items-center w-full h-[250px] text-6xl font-bold"}>
          <CountUp end={sumOfPercentages / 20} decimals={2} duration={1}/>%
        </div>
      </CardContent>
    </Card>
  )
}

export default QualityGateAveragePercentChart