import {PageResponseQualityGateResponse, qualityGateRatings} from "@/utils/types";
import {NextPage} from "next";
import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from "recharts";
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {calculateRatingsCount} from "@/utils/helpers";
import {Skeleton} from "@/components/atoms/skeleton";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface QualityChartProps {
  last100QualityGates: PageResponseQualityGateResponse,
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        Rating: {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={5} textAnchor={textAnchor} fill="#999">
        {value}
      </text>
    </g>
  );
};

const QualityGateRatingChart: NextPage<QualityChartProps> = ({
                                                               last100QualityGates
                                                             }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [data, setData] = useState<any>([])
  const pathname = usePathname()

  useEffect(() => {
    if (last100QualityGates) {
      const countRatings = calculateRatingsCount(last100QualityGates.page);
      const data = Object.entries(countRatings).map(([name, value]) => ({
        name,
        value,
      }));
      setData(data)
    }
  }, [last100QualityGates]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center w-full">
          <Link href={`${pathname}/quality-rates`} className="text-2xl font-bold text-center w-full">Last 20 Quality
            Ratings</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{
          width: '100%',
          height: 300
        }}>
          <ResponsiveContainer>
            <PieChart className={"mx-auto"}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#5183f1"
                dataKey="value"
                onMouseEnter={(_, index) => {
                  setActiveIndex(index)
                }}
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={qualityGateRatings.filter(q => q.value === entry.name)[0].color}/>
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default QualityGateRatingChart