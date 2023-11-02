import React, {useState} from 'react';
import {SizeMe} from "react-sizeme";
import GridLayout, {Layout} from "react-grid-layout";
import {DashboardGridCellConfig} from "@/utils/types";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames"
import Cell from "@/components/molecules/DashboardGrid/Cell";

interface DashboardGridProps {
    dashboardConfigId: string
    layout: DashboardGridCellConfig[]
    onLayoutChange: (dashboardConfigId: string, layout: any[]) => void
    onCellDelete: (cellId: string) => void
    draggedStatType: string | undefined
    editing: boolean
}

const MinWMinHDict = {
    "STATS_AVG_BUILD_TIME": { minW: 2, minH: 2, maxW: 2, maxH: 2 }
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ dashboardConfigId, layout, onLayoutChange, draggedStatType, editing }) => {
    const onDrop = (_, layoutItem, _event) => {
        const modifiedObject = { ...layoutItem, i: uuidv4() };
        console.log(_event);
        console.log(draggedStatType)
        onLayoutChange(dashboardConfigId, [
                ...layout,
                {
                    statType: draggedStatType,
                    x: layoutItem.x,
                    y: layoutItem.y,
                    ...{
                        //@ts-ignore
                        w: MinWMinHDict[draggedStatType].minW,
                        //@ts-ignore
                        h: MinWMinHDict[draggedStatType].minH
                    }
                }
        ]);
    };

    const handleLayoutChange = (gridLayout: Layout[]) => {
        const newLayout: any[] = []
        gridLayout.forEach((gridLayoutCell) => {
            console.log(gridLayout)
            if(gridLayoutCell.i !== '__dropping-elem__') {
                const item = layout.find((layoutCell) => layoutCell.id === gridLayoutCell.i)
                newLayout.push({
                    id: item?.id,
                    statType: item?.statType,
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
        return { i: dashboardCell.id, x: dashboardCell.x, y: dashboardCell.y, w: dashboardCell.w, h: dashboardCell.h, static: !editing, ...MinWMinHDict["STATS_AVG_BUILD_TIME"] }
    }

    return (
        <>
            <SizeMe>
                {({ size }) => <GridLayout
                    className="layout"
                    layout={layout.map(prepareDatGridCell)}
                    cols={12}
                    containerPadding={[0, 0]}
                    margin={[ 8, 8 ]}
                    rowHeight={size.width ? (size.width - 11 * 8) / 12 : 30}
                    width={size.width ? size.width : 1200}
                    onDrop={onDrop}
                    onLayoutChange={handleLayoutChange}
                    isDroppable={true}
                >
                    {
                        layout.map((datagridCellConfig) => <div
                            key={datagridCellConfig.id}
                            className={classNames({'-top-2 drop-shadow': editing, 'top-0': !editing})}>
                            {
                                editing && <div onClick={() => onDelete(datagridCellConfig.id)} className={classNames('absolute', 'top-0.5', 'right-0.5')}>Delete</div>
                            }
                            <Cell id={datagridCellConfig.id} w={datagridCellConfig.w} h={datagridCellConfig.h}/>
                        </div>)
                    }
                </GridLayout>
                }
            </SizeMe>
        </>
    );
};

export default DashboardGrid;
