import { Hex, Edge, Vertex, HexBoard } from '../models/hexboard';

export interface RootState {
    board: HexBoard;
    hexes: Hex[][];   
    edges: Edge[][];
    vertices: Vertex[][];

    highlightedHexes: Hex[];
    highlightedEdges: Edge[];
    highlightedVertices: Vertex[];
}

export function initState(numColumns: number, numRows: number): RootState {
    let boardHexes = new Array<Array<Hex>>();
  
    // Init hexes to pass to HexBoard
    for (let col = 0; col < numColumns; col++) {
        boardHexes[col] = Array(numRows).fill(null);
        for (let row = 0; row < numRows; row++) {
            boardHexes[col][row] = new Hex(col, row);
        }
    }
  
    let b = new HexBoard(boardHexes);
    
    return {
        board: b,
        hexes: b.hexes,
        edges: b.edges,
        vertices: b.vertices,

        highlightedHexes: [],
        highlightedEdges: [],
        highlightedVertices: [],
    }
}