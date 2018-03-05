import { HexBoard as HexBoard } from '../../models/hexboard';
import { Hex as Hex } from '../../models/hexboard';
import { Edge as Edge } from '../../models/hexboard';
import { Vertex as Vertex } from '../../models/hexboard';
import { intersectArrays as intersectArrays } from '../../common/util';

// Create empty array of hexes
let numColumns = 9;
let numRows = 9
let hexes = new Array<Array<Hex>>();

for(let col=0; col<numColumns; col++){
    hexes[col] = Array(numRows).fill(null);
    for(let row=0; row<numRows; row++) {
        hexes[col][row] = new Hex(col, row);
    }
};
let b = new HexBoard(hexes);

describe("Queries returning Hexes", () => {
    it('should return 6 correct adjacent hexes', () => {
        let neighbours = b.hexesAdjacentTo(b.hex(4, 3));

        expect(neighbours.length).toEqual(6);
        expect(neighbours).toContain(b.hex(4, 2));
        expect(neighbours).toContain(b.hex(5, 3));
        expect(neighbours).toContain(b.hex(5, 4));
        expect(neighbours).toContain(b.hex(4, 4));
        expect(neighbours).toContain(b.hex(3, 4));
        expect(neighbours).toContain(b.hex(3, 3));       
    });

    it('should return the 3 correct adjoining hexes of a vertex', () => {
        let evenXevenY = b.vertex(4, 8);        
        expect(b.hexesOfVertex(evenXevenY)).toContain(b.hex(4, 3));
        expect(b.hexesOfVertex(evenXevenY)).toContain(b.hex(3, 4));
        expect(b.hexesOfVertex(evenXevenY)).toContain(b.hex(4, 4));

        let oddXevenY = b.vertex(5, 8);
        expect(b.hexesOfVertex(oddXevenY)).toContain(b.hex(4, 3));
        expect(b.hexesOfVertex(oddXevenY)).toContain(b.hex(4, 4));
        expect(b.hexesOfVertex(oddXevenY)).toContain(b.hex(5, 4));

        let evenXoddY = b.vertex(6, 7);
        expect(b.hexesOfVertex(evenXoddY)).toContain(b.hex(5, 3));
        expect(b.hexesOfVertex(evenXoddY)).toContain(b.hex(5, 4));
        expect(b.hexesOfVertex(evenXoddY)).toContain(b.hex(6, 3));
        
        let oddXoddY = b.vertex(5, 7);
        expect(b.hexesOfVertex(oddXoddY)).toContain(b.hex(5, 3));
        expect(b.hexesOfVertex(oddXoddY)).toContain(b.hex(4, 3));
        expect(b.hexesOfVertex(oddXoddY)).toContain(b.hex(5, 4));
    });

    it('should return the correct north hex', () => {
        let hex = b.hex(4,4);
        let northHex = b.hexNorthOf(hex);

        expect(northHex.x).toEqual(4);
        expect(northHex.y).toEqual(3);
    });

    it('should return the correct northwest hex', () => {
        // Even X
        let evenXhex = b.hex(4, 4);
        let northWestEvenXHex = b.hexNorthWestOf(evenXhex);
        expect(northWestEvenXHex.x).toEqual(3);
        expect(northWestEvenXHex.y).toEqual(4);

        // Odd X
        let oddXhex = b.hex(5, 4);
        let northWestOddXHex = b.hexNorthWestOf(oddXhex);
        expect(northWestOddXHex.x).toEqual(4);
        expect(northWestOddXHex.y).toEqual(3);
    });

    it('should return the correct northeast hex', () => {
         // Even X
         let evenXhex = b.hex(4, 4);
         let northEastEvenXHex = b.hexNorthEastOf(evenXhex);
         expect(northEastEvenXHex.x).toEqual(5);
         expect(northEastEvenXHex.y).toEqual(4);
 
         // Odd X
         let oddXhex = b.hex(5, 4);
         let northEastOddXHex = b.hexNorthEastOf(oddXhex);
         expect(northEastOddXHex.x).toEqual(6);
         expect(northEastOddXHex.y).toEqual(3);
    });

    it('should return the correct south hex', () => {
        let hex = b.hex(4,4);
        let southHex = b.hexSouthOf(hex);

        expect(southHex.x).toEqual(4);
        expect(southHex.y).toEqual(5);
    });

    it('should return the correct southwest hex', () => {
        // Even X
        let evenXhex = b.hex(4, 4);
        let southWestEvenXHex = b.hexSouthWestOf(evenXhex);
        expect(southWestEvenXHex.x).toEqual(3);
        expect(southWestEvenXHex.y).toEqual(5);

        // Odd X
        let oddXhex = b.hex(5, 4);
        let southWestOddXHex = b.hexSouthWestOf(oddXhex);
        expect(southWestOddXHex.x).toEqual(4);
        expect(southWestOddXHex.y).toEqual(4);
    });

    it('should return the correct southeast hex', () => {
        // Even X
        let evenXhex = b.hex(4, 4);
        let southEastEvenXHex = b.hexSouthEastOf(evenXhex);
        expect(southEastEvenXHex.x).toEqual(5);
        expect(southEastEvenXHex.y).toEqual(5);

        // Odd X
        let oddXhex = b.hex(5, 4);
        let southEastOddXHex = b.hexSouthEastOf(oddXhex);
        expect(southEastOddXHex.x).toEqual(6);
        expect(southEastOddXHex.y).toEqual(4);
    });
});

describe("Queries returning Vertices", () => {
    it('should return 1 intersecting vertex for 3 adjacent hexes', () => {
        // For vertex(4, 6)
        let verticesA = b.verticesOfHex(b.hex(4, 3));
        let verticesB = b.verticesOfHex(b.hex(4, 4));
        let verticesC = b.verticesOfHex(b.hex(5, 4));

        let commonVertices: Array<Vertex> = intersectArrays(verticesA, verticesB);
        commonVertices = intersectArrays(commonVertices, verticesC);

        expect(commonVertices.length).toEqual(1);
    });

    it('should return 6 correct vertices of a hex', () => {
        let hexVertices = b.verticesOfHex(b.hex(6, 3));
        expect(hexVertices.length).toEqual(6);

        // Get neighbouring hexes and make sure there are only 2 shared vertices
        let neighbours = b.hexesAdjacentTo(b.hex(6, 3));
        for(let neighbour of neighbours) {
            let neighbourVertices = b.verticesOfHex(neighbour);
            let numCommonVertices = 0;
            hexVertices.forEach(vertex => {
                neighbourVertices.forEach(neighbourVertex => {
                    if (vertex.x == neighbourVertex.x && vertex.y == neighbourVertex.y) {
                        numCommonVertices++;
                    }
                });
            });
            expect(numCommonVertices).toEqual(2);
        }
    });

    it('should return the correct vertices given an edge when comparing to the vertices given a hex', () => {
        let hexVertices = b.verticesOfHex(b.hex(4, 3));
        let hexEdges = b.edgesOfHex(b.hex(4, 3));

        let foundVertices = new Array<Vertex>(0);        
        for(let edge of hexEdges) {
            let vertices = b.verticesOfEdge(edge);
            expect(intersectArrays(vertices, hexVertices).length).toEqual(2);

            vertices.forEach(vertex => {
                if(foundVertices.indexOf(vertex) < 0) {
                    foundVertices.push(vertex);
                }
            });
        }
        expect(foundVertices.length).toEqual(6);
        expect(intersectArrays(foundVertices, hexVertices).length).toEqual(hexVertices.length);
    });
});

describe("Queries returning Edges", () => {
    it('should correctly return all 6 edges between a hex and its neighbours', () => {
        let edges = b.edgesOfHex(b.hex(4, 3));
        let neighbourHexEdges = [
            b.edgesOfHex(b.hex(3, 3)),
            b.edgesOfHex(b.hex(3, 4)),
            b.edgesOfHex(b.hex(4, 2)),
            b.edgesOfHex(b.hex(4, 4)),
            b.edgesOfHex(b.hex(5, 3)),
            b.edgesOfHex(b.hex(5, 4))
        ];

        for(let neighbourEdges of neighbourHexEdges) {
            expect(intersectArrays(edges, neighbourEdges).length).toEqual(1);
        }
    });

    it('should return the correct edge between a vertex and its 3 adjacent vertices', () => {
        let edges = b.edgesOfVertex(b.vertex(5, 7));

        let neighbourEdgesA = b.edgesOfVertex(b.vertex(6, 7));
        let neighbourEdgesB = b.edgesOfVertex(b.vertex(5, 6));
        let neighbourEdgesC = b.edgesOfVertex(b.vertex(5, 8));

        expect(intersectArrays(edges, neighbourEdgesA).length).toEqual(1);
        expect(intersectArrays(edges, neighbourEdgesB).length).toEqual(1);
        expect(intersectArrays(edges, neighbourEdgesC).length).toEqual(1);
    });

    it('should return the correct edge common to 2 adjacent hexes', () => {
        let commonEdge = b.edgeCommonToHexes(b.hex(5,3), b.hex(5,4));
        
        expect(commonEdge).toBeTruthy();
        expect((commonEdge as Edge).x).toEqual(11);
        expect((commonEdge as Edge).y).toEqual(7);
    });
});
