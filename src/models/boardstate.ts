import { intersection as intersection } from '../util';

// Hexes
export class Hex {
    x: number;
    y: number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
};

export class Edge {
    x:number;
    y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
};

export class Vertex {
    x: number;
    y: number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
};

export class BoardState {
    private numColumns: number;
    private numRows: number;
    private hexes: Array<Array<Hex>>;
    private edges: Array<Array<Edge>>;
    private vertices: Array<Array<Vertex>>;

    constructor(hexes: Array<Array<Hex>>) {
        this.hexes = hexes;
        this.numColumns = hexes.length;
        this.numRows = hexes[0].length;

        // Initialize the edge and vertex matrices
        let numEdgeMatrixCols = this.numColumns*2+2;
        let numEdgeMatrixRows = this.numRows*2+2;

        this.edges = Array(numEdgeMatrixCols).fill(null);
        this.vertices = Array(numEdgeMatrixCols).fill(null);

        for(let x=0; x<numEdgeMatrixCols; x++) {
            this.edges[x] = Array(numEdgeMatrixRows).fill(null);
            this.vertices[x] = Array(numEdgeMatrixRows).fill(null);

            for(let y=0; y<numEdgeMatrixRows; y++) {
                this.edges[x][y] = new Edge(x, y);
                this.vertices[x][y] = new Vertex(x, y);
            }
        }

        // Initialize the board with all the pieces
    };

    // Getters
    hex(x: number, y: number): Hex {
        return this.hexes[x][y];
    }

    edge(x: number, y: number): Edge {
        return this.edges[x][y];
    }

    vertex(x: number, y: number): Hex {
        return this.vertices[x][y];
    }

    // Queries that return a Hex
    hexesAdjacentTo(hex: Hex): Array<Hex> {
        let x = hex.x;
        let y = hex.y;
        let offset = (x % 2 == 0) ? 1 : -1;

        let neighbours: Array<Hex> = [
            this.hexes[x][y+1],
            this.hexes[x][y-1],
            this.hexes[x+1][y],
            this.hexes[x-1][y],
            this.hexes[x+1][y+offset],
            this.hexes[x-1][y+offset]
        ];
        return neighbours;
    };

    hexNorthOf(hex: Hex): Hex {
        return this.hexes[hex.x][hex.y-1];
    }

    hexNorthWestOf(hex: Hex): Hex {
        let yOffset = hex.x % 2;
        return this.hexes[hex.x-1][hex.y-yOffset];
    }

    hexNorthEastOf(hex: Hex): Hex {
        let yOffset = hex.x % 2;
        return this.hexes[hex.x+1][hex.y-yOffset];
    }

    hexSouthOf(hex: Hex): Hex {
        return this.hexes[hex.x][hex.y+1];
    }

    hexSouthWestOf(hex: Hex): Hex {
        let xIsEven = hex.x % 2 == 0;
        if (xIsEven) {
            return this.hexes[hex.x-1][hex.y+1];    
        } else {
            return this.hexes[hex.x-1][hex.y];
        };
    }

    hexSouthEastOf(hex: Hex): Hex {
        let xIsEven = hex.x % 2 == 0;
        if (xIsEven) {
            return this.hexes[hex.x+1][hex.y+1];    
        } else {
            return this.hexes[hex.x+1][hex.y];
        };
    }

    hexesOfVertex(vertex: Vertex): Array<Hex> {
        let x = vertex.x;
        let y = vertex.y;
        let xOffset = x % 2;
        let yOffset = y % 2;
                
        if(yOffset == 0) {
            // (Odd X, Even Y) || ( Even X, Even Y)
            return [
                this.hexes[x-xOffset][y/2-1],
                this.hexes[x-1][y/2],
                this.hexes[x-0][y/2]
            ];    
        } else if (xOffset == 1) {
            // (Odd X, Odd Y)
            return [
                this.hexes[x-0][(y-1)/2],
                this.hexes[x-1][(y-1)/2],
                this.hexes[x-0][(y+1)/2]
            ];
        } else {
            // (Even X, Odd Y)
            return [
                this.hexes[x-1][(y-1)/2],
                this.hexes[x-1][(y+1)/2],
                this.hexes[x-0][(y-1)/2]
            ]
        };
    }


    // Queries that return Vertices
    verticesOfHex(hex: Hex): Array<Vertex> {
        let x = hex.x;
        let y = hex.y;
        let offset = -(x % 2);
            
        let vertices: Array<Vertex> = [
            this.vertices[x][2*y+offset],
            this.vertices[x][2*y+1+offset],
            this.vertices[x][2*y+2+offset],
            this.vertices[x+1][2*y+offset],
            this.vertices[x+1][2*y+1+offset],
            this.vertices[x+1][2*y+2+offset]
        ]
        return vertices;
    }

    verticesOfEdge(edge: Edge): Array<Vertex> {
        let x = edge.x;
        let y = edge.y;
        let xOffset = x % 2;
        
        if(xOffset == 0) {
            return [
                this.vertices[x/2][y],
                this.vertices[x/2][y+1]
            ];
        } else {
            return [
                this.vertices[(x-1)/2][y],
                this.vertices[(x+1)/2][y]
            ]
        };
    }

    // Queries that return Edges
    edgesOfHex(hex: Hex): Array<Edge> {
        let x = hex.x;
        let y = hex.y;
        let offset = -(x % 2);
        
        let edges: Array<Edge> = [
            this.edges[2*x][2*y+offset],
            this.edges[2*x][2*y+1+offset],
            this.edges[2*x+1][2*y+offset],
            this.edges[2*x+1][2*y+2+offset],
            this.edges[2*x+2][2*y+offset],
            this.edges[2*x+2][2*y+1+offset]
        ];
        return edges;
    };

    edgesOfVertex(vertex: Vertex): Array<Edge> {
        let x = vertex.x;
        let y = vertex.y;
        let offset = (x % 2 == y % 2)? 1 : -1;
    
        return [
            this.edges[x*2][y-1],
            this.edges[x*2][y],
            this.edges[x*2+offset][y],
        ];
    };

    edgeCommonToHexes(hex1: Hex, hex2: Hex): Edge | null {
        let commonEdges = intersection(this.edgesOfHex(hex1), this.edgesOfHex(hex2)) as Edge[];

        if (commonEdges.length == 0) {
            return null;
        } else {
            return commonEdges[0];
        }
    }
}

