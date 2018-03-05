import * as React from 'react';
import './CoordGrid.css';
import { Coord as Coord } from '../../models/hexboard';
// import { transposeArray as transposeArray } from '../../common/util';

export interface CoordGridProps {
    coords: Coord[][];
    highlightedCells: Coord[];
    onCellMouseOver: (x:number, y:number) => void;
    onCellMouseLeave?: (x:number, y:number) => void;
}

function getHighlightedClassName(highlightedCells: Coord[], x:number, y:number) {
    const found = highlightedCells.find((cell) => {
        if (cell)
            return cell.x == x && cell.y == y;
        else
            return false;
    })

    return found ? "coordgrid-cell highlighted" : "coordgrid-cell";
}

export function CoordGrid(props: CoordGridProps) {
    // The matrix is a transposed version of what we expect (matrix is column major),
    // so transpose matrix and then render
    let transMatrix = props.coords;//transposeArray(props.coords);
    
    let rows = transMatrix.map((row, x) => {
        let col = row.map((cell, y) => {
            return (
                <div
                    className={getHighlightedClassName(props.highlightedCells, x, y)}
                    key={cell.x + ', ' + cell.y}
                    onMouseOver={() => props.onCellMouseOver(cell.x, cell.y)}
                >
                    {cell.x + ', ' + cell.y}
                </div>
            );
        });
        return (
            <div 
                className="coordgrid-row"
                key={x}
            >
                {col}
            </div>
        );
    });           
    
    return (
        <div>
            <div className="coordgrid-table">
                <div className="coordgrid-body">
                    {rows}
                </div>
            </div>
        </div>
    );
}