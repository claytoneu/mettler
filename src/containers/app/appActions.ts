// Action Constants
export const GRID_CELL_MOUSE_OVER = 'GRID_CELLMOUSE_OVER';
export type GRID_CELL_MOUSE_OVER = typeof GRID_CELL_MOUSE_OVER;

export const GRID_CELL_MOUSE_LEAVE = 'GRID_CELL_MOUSE_LEAVE';
export type GRID_CELL_MOUSE_LEAVE = typeof GRID_CELL_MOUSE_LEAVE;


// Action Interface Definitions
export enum BoardComponentType {
    Hex,
    Edge,
    Vertex
}

export interface CoordGridCellMouseOverAction {
    type: GRID_CELL_MOUSE_OVER;
    boardComponentType: BoardComponentType;
    x: number;
    y: number;
}

// Action Creators
export function hexCellMouseOver(x: number, y: number): CoordGridCellMouseOverAction {
    return {
        type: GRID_CELL_MOUSE_OVER,
        boardComponentType: BoardComponentType.Hex,
        x,
        y
    }
}

export function edgeCellMouseOver(x: number, y: number): CoordGridCellMouseOverAction {
    return {
        type: GRID_CELL_MOUSE_OVER,
        boardComponentType: BoardComponentType.Edge,
        x,
        y
    }
}

export function vertexCellMouseOver(x: number, y: number): CoordGridCellMouseOverAction {
    return {
        type: GRID_CELL_MOUSE_OVER,
        boardComponentType: BoardComponentType.Vertex,
        x,
        y
    }
}
