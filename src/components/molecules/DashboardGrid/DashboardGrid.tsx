import React, {useState} from 'react';
import {SizeMe} from "react-sizeme";
import GridLayout, {Layout} from "react-grid-layout";
import {DashboardGridCellConfig} from "@/utils/types";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames"
import Cell from "@/components/molecules/DashboardGrid/Cell";

interface DashboardGridProps {
    layout: DashboardGridCellConfig[]
    onLayoutChange: (layout: Layout[]) => void
    onCellDelete: (cellId: string) => void
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ layout, onLayoutChange }) => {
    const [editing, setEditing] = useState(false)

    const onDrop = (layout, layoutItem, _event) => {
        const modifiedObject = { ...layoutItem, i: uuidv4() };

        onLayoutChange([
            ...layout.slice(0, layout.length - 1),
            modifiedObject
        ]);
    };

    const onDelete = (id: string) => {
    }

    return (
        <>
            <button type={"button"} onClick={() => setEditing((editing) => !editing)}>Edit</button>
            <div
                className="droppable-element"
                style={{ padding: "32px", backgroundColor: "red", width: "120px" }}
                draggable={true}
                unselectable="on"
                // this is a hack for firefox
                // Firefox requires some kind of initialization
                // which we can do by adding this attribute
                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                onDragStart={e => e.dataTransfer.setData("text/plain", "")}
            >
                Droppable Element (Drag me!)
            </div>
            <SizeMe>
                {({ size }) => <GridLayout
                    className="layout"
                    layout={layout.map(cell => ({ i: cell.id, x: cell.x, y: cell.y, w: cell.w, h: cell.h}))}
                    cols={12}
                    rowHeight={30}
                    width={size.width ? size.width : 1200}
                    onDrop={onDrop}
                    onLayoutChange={(layout) => console.log(layout)}
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
