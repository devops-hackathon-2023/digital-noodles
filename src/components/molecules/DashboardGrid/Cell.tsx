import React from 'react';

interface CellProps {
    cellId: string,
    w: number,
    h: number
}

const Cell: React.FC<CellProps> = ({ cellId, w, h}) => {
    return (
        <div>

        </div>
    );
};

export default Cell;
