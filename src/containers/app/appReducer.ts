import { Hex, Edge, Vertex } from '../../models/hexboard';
import { CoordGridCellMouseOverAction, BoardComponentType, GRID_CELL_MOUSE_OVER } from './appActions';
import { RootState } from '../state';

export function coordGridCellMouseOver(state: RootState, action: CoordGridCellMouseOverAction): RootState {
    switch (action.type) {
        case GRID_CELL_MOUSE_OVER:
            return calculateHighlightedGridsState(state, action.boardComponentType, action.x, action.y);
    }
    return state;
}

function calculateHighlightedGridsState(state: RootState, selectedComponentType: BoardComponentType, x:number, y:number) : RootState {
    const hexBoard = state.board;

    switch (selectedComponentType) {
        case BoardComponentType.Hex:
            const hex = new Hex(x, y);
            return {
                ...state,
                highlightedHexes: hexBoard.hexesAdjacentTo(hex),
                highlightedEdges: hexBoard.edgesOfHex(hex),
                highlightedVertices: hexBoard.verticesOfHex(hex),
            }

        case BoardComponentType.Edge:
            const edge = new Edge(x, y);
            return {
                ...state,
                highlightedHexes: [], // TODO: make a board query that returns edges
                highlightedEdges: [edge], 
                highlightedVertices: hexBoard.verticesOfEdge(edge),
            }

        case BoardComponentType.Vertex:
            const vertex = new Vertex(x, y);
            return {
                ...state,
                highlightedHexes: hexBoard.hexesOfVertex(vertex),
                highlightedEdges: hexBoard.edgesOfVertex(vertex),
                highlightedVertices: [vertex],
            }

        default:
            return state;
    }
}