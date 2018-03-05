import { intersectArrays as intersectArrays } from '../common/util';

// Hexes
export interface Coord {
    x: number;
    y: number;
}

export class Hex implements Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Edge implements Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Vertex implements Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class HexBoard {
    private _numColumns: number;
    private _numRows: number;
    private _hexes: Array<Array<Hex>>;
    private _edges: Array<Array<Edge>>;
    private _vertices: Array<Array<Vertex>>;

    constructor(hexes: Array<Array<Hex>>) {
        this._hexes = hexes;
        this._numColumns = hexes.length;
        this._numRows = hexes[0].length;

        // Initialize the edge and vertex matrices
        let numEdgeMatrixCols = this._numColumns * 2 + 2;
        let numEdgeMatrixRows = this._numRows * 2 + 2;

        this._edges = Array(numEdgeMatrixCols).fill(null);
        this._vertices = Array(numEdgeMatrixCols).fill(null);

        for (let x = 0; x < numEdgeMatrixCols; x++) {
            this._edges[x] = Array(numEdgeMatrixRows).fill(null);
            this._vertices[x] = Array(numEdgeMatrixRows).fill(null);

            for (let y = 0; y < numEdgeMatrixRows; y++) {
                this._edges[x][y] = new Edge(x, y);
                this._vertices[x][y] = new Vertex(x, y);
            }
        }
    }

    // Getters
    get hexes() {
        return this._hexes;
    }

    get edges() {
        return this._edges;
    }

    get vertices() {
        return this._vertices;
    }

    hex(x: number, y: number): Hex {
        return this._hexes[x][y];
    }

    edge(x: number, y: number): Edge {
        return this._edges[x][y];
    }

    vertex(x: number, y: number): Hex {
        return this._vertices[x][y];
    }

    // Setters
    setHex(x: number, y: number, hex: Hex) {
        this._hexes[x][y] = hex;
    }

    // Queries that return a Hex
    hexesAdjacentTo(hex: Hex): Array<Hex> {
        let x = hex.x;
        let y = hex.y;
        let offset = (x % 2 === 0) ? 1 : -1;

        let neighbours: Array<Hex> = [
            this._hexes[x][y + 1],
            this._hexes[x][y - 1],
            this._hexes[x + 1][y],
            this._hexes[x - 1][y],
            this._hexes[x + 1][y + offset],
            this._hexes[x - 1][y + offset]
        ];
        return neighbours;
    }

    hexNorthOf(hex: Hex): Hex {
        return this._hexes[hex.x][hex.y - 1];
    }

    hexNorthWestOf(hex: Hex): Hex {
        let yOffset = hex.x % 2;
        return this._hexes[hex.x - 1][hex.y - yOffset];
    }

    hexNorthEastOf(hex: Hex): Hex {
        let yOffset = hex.x % 2;
        return this._hexes[hex.x + 1][hex.y - yOffset];
    }

    hexSouthOf(hex: Hex): Hex {
        return this._hexes[hex.x][hex.y + 1];
    }

    hexSouthWestOf(hex: Hex): Hex {
        let xIsEven = hex.x % 2 === 0;
        if (xIsEven) {
            return this._hexes[hex.x - 1][hex.y + 1];
        } else {
            return this._hexes[hex.x - 1][hex.y];
        }
    }

    hexSouthEastOf(hex: Hex): Hex {
        let xIsEven = hex.x % 2 === 0;
        if (xIsEven) {
            return this._hexes[hex.x + 1][hex.y + 1];    
        } else {
            return this._hexes[hex.x + 1][hex.y];
        }
    }

    hexesOfVertex(vertex: Vertex): Array<Hex> {
        let x = vertex.x;
        let y = vertex.y;
        let xOffset = x % 2;
        let yOffset = y % 2;
                
        if (yOffset === 0) {
            // (Odd X, Even Y) || ( Even X, Even Y)
            return [
                this._hexes[x - xOffset][y / 2 - 1],
                this._hexes[x - 1][y / 2],
                this._hexes[x - 0][y / 2]
            ];    
        } else if (xOffset === 1) {
            // (Odd X, Odd Y)
            return [
                this._hexes[x - 0][(y - 1) / 2],
                this._hexes[x - 1][(y - 1) / 2],
                this._hexes[x - 0][(y + 1) / 2]
            ];
        } else {
            // (Even X, Odd Y)
            return [
                this._hexes[x - 1][(y - 1) / 2],
                this._hexes[x - 1][(y + 1) / 2],
                this._hexes[x - 0][(y - 1) / 2]
            ];
        }
    }

    // Queries that return Vertices
    verticesOfHex(hex: Hex): Array<Vertex> {
        let x = hex.x;
        let y = hex.y;
        let offset = -(x % 2);
            
        let vertices: Array<Vertex> = [
            this._vertices[x][2 * y + offset],
            this._vertices[x][2 * y + 1 + offset],
            this._vertices[x][2 * y + 2 + offset],
            this._vertices[x + 1][2 * y + offset],
            this._vertices[x + 1][2 * y + 1 + offset],
            this._vertices[x + 1][2 * y + 2 + offset]
        ];
        return vertices;
    }

    verticesOfEdge(edge: Edge): Array<Vertex> {
        let x = edge.x;
        let y = edge.y;
        let xOffset = x % 2;
        
        if (xOffset === 0) {
            return [
                this._vertices[x / 2][y],
                this._vertices[x / 2][y + 1]
            ];
        } else {
            return [
                this._vertices[(x - 1) / 2][y],
                this._vertices[(x + 1) / 2][y]
            ];
        }
    }

    // Queries that return Edges
    edgesOfHex(hex: Hex): Array<Edge> {
        let x = hex.x;
        let y = hex.y;
        let offset = -(x % 2);
        
        let edges: Array<Edge> = [
            this._edges[2 * x][2 * y + offset],
            this._edges[2 * x][2 * y + 1 + offset],
            this._edges[2 * x + 1][2 * y + offset],
            this._edges[2 * x + 1][2 * y + 2 + offset],
            this._edges[2 * x + 2][2 * y + offset],
            this._edges[2 * x + 2][2 * y + 1 + offset]
        ];
        return edges;
    }

    edgesOfVertex(vertex: Vertex): Array<Edge> {
        let x = vertex.x;
        let y = vertex.y;
        let offset = (x % 2 === y % 2) ? 1 : -1;
    
        return [
            this._edges[x * 2][y - 1],
            this._edges[x * 2][y],
            this._edges[x * 2 + offset][y],
        ];
    }

    edgeCommonToHexes(hex1: Hex, hex2: Hex): Edge | null {
        let commonEdges = intersectArrays(this.edgesOfHex(hex1), this.edgesOfHex(hex2)) as Edge[];

        if (commonEdges.length === 0) {
            return null;
        } else {
            return commonEdges[0];
        }
    }
}