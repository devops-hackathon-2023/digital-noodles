import React from 'react';
import {SizeMe} from "react-sizeme";
import GridLayout, {Layout} from "react-grid-layout";
import {DashboardGridCellConfig} from "@/utils/types";
import { v4 as uuidv4 } from 'uuid';

interface DashboardGridProps {
    layout: DashboardGridCellConfig[]
    onLayoutChanged: (layout: Layout[]) => void
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ layout, onLayoutChanged }) => {

    const onDrop = (layout, layoutItem, _event) => {
        alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);

        const last = layout[layout.length - 1];
        const modifiedObject = { ...layoutItem, i: uuidv4() };

        onLayoutChanged([
            ...layout.slice(0, layout.length - 1),
            modifiedObject
        ]);
    };

    return (
        <>
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
                    layout={layout.map(cell => cell.layout)}
                    cols={12}
                    rowHeight={30}
                    width={size.width ? size.width : 1200}
                    onDrop={onDrop}
                    onLayoutChange={(layout) => console.log(layout)}
                    isDroppable={true}
                >
                    {
                        layout.map((datagridCellConfig) => <div key={datagridCellConfig.layout.i}>{datagridCellConfig.layout.i}</div>)
                    }
                </GridLayout>
                }
            </SizeMe>
        </>
    );
};

export default DashboardGrid;
