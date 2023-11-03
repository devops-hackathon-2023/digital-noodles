import React from 'react';
import {StatType} from "@/utils/types";
import {Hand} from "lucide-react";

interface DraggableStatProps {
    icon: React.ReactNode,
    statType: StatType,
    label: string,
    onDragStart: (statType: StatType) => void
}

const DraggableStat : React.FC<DraggableStatProps> = ({ label, statType, icon, onDragStart }) => {
    return (
        <>
            { icon }
            <div
                className="droppable-element"
                draggable={true}
                unselectable="on"
                // this is a hack for firefox
                // Firefox requires some kind of initialization
                // which we can do by adding this attribute
                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                onDragStart={e => {
                    e.dataTransfer.setData("text/plain", "")
                    onDragStart(statType)
                }}
            >
                { label }
            </div>
            <Hand className={"ml-6 h-4 w-4"}/>
        </>
    );
};

export default DraggableStat;
