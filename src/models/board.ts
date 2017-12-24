export const ResourceType = {
    Wheat: "WHEAT",
    Brick: "BRICK",
    Sheep: "SHEEP",
    Ore: "ORE",
    Wood: "WOOD",
    Desert: "DESERT",
};

export class Building {
    color: string;

    constructor(color: string) {
        this.color = color;
    }
}

export class Hex {
    x: number;
    y: number;
    resourceType?: string;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.resourceType = undefined;
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
    building?: Building; 

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.building = undefined;
    }
};

export class Board {
    numColumns: number;
    numRows: number;
    hexes: Array<Array<Hex>>;
    edges: Array<Array<Edge>>;
    vertices: Array<Array<Vertex>>;

    constructor(numColumns: number, numRows: number) {    
        this.numColumns = numColumns;
        this.numRows = numRows;

        // Create matrices for hexes, edges and vertices
        this.hexes = Array(this.numColumns);

        for(let col=0; col<this.numColumns; col++){
            this.hexes[col] = Array(this.numRows).fill(null);
            for(let row=0; row<this.numRows; row++) {
                this.hexes[col][row] = new Hex(col, row);
            }
        };

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
    };

    // Hex Queries
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

    // Vertex Queries
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

    // Edge Queries
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
}

