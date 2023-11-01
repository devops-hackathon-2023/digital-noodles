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
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ dashboardConfigId, layout, onLayoutChange }) => {
    const [editing, setEditing] = useState(false)
    const [draggedStatType, setDraggedStatType] = useState<string | undefined>(undefined)

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
                    w: layoutItem.w,
                    h: layoutItem.h
                }
        ]);
    };

    const handleLayoutChange = (gridLayout: Layout[]) => {
        console.log("Layout change")
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

    const onDelete = (id: string) => {
    }

    return (
        <>
            <button type={"button"} onClick={() => setEditing((editing) => !editing)}>Edit</button>
            <div className={"flex gap-2"}>
            <div
                className="droppable-element"
                style={{ padding: "32px", backgroundColor: "red", width: "120px" }}
                draggable={true}
                unselectable="on"
                // this is a hack for firefox
                // Firefox requires some kind of initialization
                // which we can do by adding this attribute
                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                onDragStart={e => {
                    e.dataTransfer.setData("text/plain", "")
                    setDraggedStatType("STATS_AVG_BUILD_TIME")
                }}
            >
                STATS_AVG_BUILD_TIME
            </div>
                <div
            className="toolbox-item"
            style={{ padding: "32px", backgroundColor: "red", width: "120px" }}
            draggable={true}
            unselectable="on"
            // this is a hack for firefox
            // Firefox requires some kind of initialization
            // which we can do by adding this attribute
            // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
            onDragStart={e => {
                e.dataTransfer.setData("text/plain", "")
                setDraggedStatType("STATS_LAST_DEPLOYMENT_BUILD_TIME")
            }}
        >
                    STATS_LAST_DEPLOYMENT_BUILD_TIME (Does not work)
        </div>
            </div>
            <SizeMe>
                {({ size }) => <GridLayout
                    className="layout"
                    layout={layout.map(cell => ({ i: cell.id, x: cell.x, y: cell.y, w: cell.w, h: cell.h}))}
                    cols={12}
                    rowHeight={30}
                    width={size.width ? size.width : 1200}
                    onDrop={onDrop}
                    onLayoutChange={handleLayoutChange}
                    isDroppable={true}
                >
                    {
                        layout.map((datagridCellConfig) => <div
                            key={datagridCellConfig.id}
                            className={classNames('border bg-white transition-[top] duration-200 relative ease-in-out', {'-top-2 drop-shadow': editing, 'top-0': !editing})}>
                            {
                                editing && <div className={classNames('absolute', 'top-0.5', 'right-0.5')}>Delete</div>
                            }
                            <Cell id={datagridCellConfig.id} w={datagridCellConfig.w} h={datagridCellConfig.h}/>
                            {datagridCellConfig.id}
                        </div>)
                    }
                </GridLayout>
                }
            </SizeMe>
        </>
    );
};

export default DashboardGrid;
