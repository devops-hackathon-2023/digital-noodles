import React from 'react';
import {Layout, Layouts, Responsive, WidthProvider} from "react-grid-layout";
import {DashboardGridCellConfig, StatType} from "@/utils/types";
import {v4 as uuidv4} from 'uuid';
import classNames from "classnames"
import Cell from "@/components/molecules/DashboardGrid/Cell";
import {Button} from "@/components/atoms/button";
import {Trash2} from "lucide-react";

interface DashboardGridProps {
  dashboardConfigId: string
  layout: DashboardGridCellConfig[]
  onLayoutChange: (dashboardConfigId: string, layout: any[]) => void
  onCellDelete: (cellId: string) => void
  draggedStatType: string | undefined
  editing: boolean
}

const MinWMinHDict = {
  [StatType.STATS_AVG_BUILD_TIME]: {
    minW: 1,
    minH: 1,
    maxW: 2,
    maxH: 2
  },
  [StatType.SYSTEM_CPU_USAGE]: {
    minW: 2,
    minH: 2,
    maxW: 6,
    maxH: 3
  },
  [StatType.SYSTEM_RAM_USAGE]: {
    minW: 2,
    minH: 2,
    maxW: 6,
    maxH: 3
  },
  [StatType.HEALTHCHECK]: {
    minW: 2,
    minH: 1,
    maxW: 2,
    maxH: 1
  },
  [StatType.STATS_GATES_FAILED_PASSED]: {
    minW: 2,
    minH: 2,
    maxW: 2,
    maxH: 2
  }
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
                                                       dashboardConfigId,
                                                       layout,
                                                       onLayoutChange,
                                                       draggedStatType,
                                                       editing
                                                     }) => {

  const ResponsiveGridLayout = WidthProvider(Responsive);


  const onDrop = (_: Layout[], item: Layout, e: Event) => {
    const modifiedObject = {
      ...item,
      i: uuidv4()
    };
    onLayoutChange(dashboardConfigId, [
      ...layout,
      {
        statType: draggedStatType,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
        // ...{
        //   //@ts-ignore
        //   w: MinWMinHDict[draggedStatType].minW,
        //   //@ts-ignore
        //   h: MinWMinHDict[draggedStatType].minH
        // }
      }
    ]);
  };

  const handleLayoutChange = (gridLayout: Layout[], layouts: Layouts) => {
    const newLayout: any[] = []
    layouts["lg"].forEach((gridLayoutCell) => {
      if (gridLayoutCell.i !== '__dropping-elem__') {
        const item = layout.find((layoutCell) => layoutCell.id === gridLayoutCell.i)

        newLayout.push({
          id: item?.id,
          statType: item ? item.statType : null,
          x: gridLayoutCell.x,
          y: gridLayoutCell.y,
          w: gridLayoutCell.w,
          h: gridLayoutCell.h
        })
      }
    })

    onLayoutChange(dashboardConfigId, newLayout);
  }

  const onDelete = (dataCellId: string) => {
    onLayoutChange(dashboardConfigId, layout.filter((dashboardCell) => dashboardCell.id !== dataCellId))
  }

  const prepareDatGridCell = (dashboardCell: DashboardGridCellConfig) => {
    return {
      i: dashboardCell.id,
      x: dashboardCell.x,
      y: dashboardCell.y,
      w: dashboardCell.w,
      h: dashboardCell.h,
      static: !editing,
      statType: dashboardCell.statType,
    }
  }


  return (
    <>
      <ResponsiveGridLayout
        // className="layout border-rose-500 border-2"
        layouts={{
          lg: layout.map(prepareDatGridCell)
        }}
        breakpoints={{
          lg: 1200,
          md: 996,
          xxs: 0
        }}
        cols={{
          lg: 3,
          md: 2,
          xxs: 1
        }}
        rowHeight={300}
        width={1000}
        containerPadding={[0, 20]}
        margin={[8, 8]}
        onDrop={onDrop}
        onLayoutChange={handleLayoutChange}
        isDroppable={true}
      >
        {
          layout.map((datagridCellConfig) => <div
            key={datagridCellConfig.id}
            className={classNames({
              '-top-2 drop-shadow': editing,
              'top-0': !editing
            })}>
            <div className={classNames("w-full h-full origin-center transition-all", {
              'animate-shake border-solid border-2 border-sky-500 rounded-lg': editing,
            })}>
              {
                editing && <div onClick={(e) => {
                  e.preventDefault()
                  onDelete(datagridCellConfig.id)
                }} className={classNames('absolute', 'top-3', 'right-3', 'z-999')}>
                      <Button className={"rounded-full"}>
                          <Trash2/>
                      </Button>
                  </div>
              }
              <Cell id={datagridCellConfig.id} w={datagridCellConfig.w} h={datagridCellConfig.h}
                    statType={datagridCellConfig.statType}/>
            </div>
          </div>)
        }
      </ResponsiveGridLayout>
    </>
  );
};

export default DashboardGrid;
