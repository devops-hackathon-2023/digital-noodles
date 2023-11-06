import {PageResponseQualityGateResponse} from "@/utils/types";
import {NextPage} from "next";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";

interface QualityChartProps {
  last100QualityGates: PageResponseQualityGateResponse,
}

const QualityGatePercentChart: NextPage<QualityChartProps> = ({
                                                                last100QualityGates
                                                              }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center w-full">
          <div className="text-2xl font-bold text-center w-full"> Last 20 Quality Percents</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{
          width: '100%',
          height: 300
        }}>
          <ResponsiveContainer>
            <LineChart
              className={"mx-auto"}
              data={last100QualityGates.page}
              margin={{
                top: 5,
                right: 50,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="createdAt"/>
              <YAxis/>
              <Tooltip/>
              <Line connectNulls type="monotone" dataKey="percent" stroke="#5183f1" strokeWidth={4}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default QualityGatePercentChart