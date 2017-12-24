import { Board as Board } from '../models/board';
import { Hex as Hex } from '../models/board';
import { Edge as Edge } from '../models/board';
import { Vertex as Vertex } from '../models/board';

let b = new Board(9, 8);

function intersection(left: any[], right: any[]): any[] {
    return left.filter(function(element){
        return right.indexOf(element) > -1;
    });
}

describe("Board Hex Queries", () => {
    it('should return 6 correct adjacent hexes', () => {
        let neighbours = b.hexesAdjacentTo(b.hexes[4][3]);

        expect(neighbours.length).toEqual(6);
        expect(neighbours).toContain(b.hexes[4][2]);
        expect(neighbours).toContain(b.hexes[5][3]);
        expect(neighbours).toContain(b.hexes[5][4]);
        expect(neighbours).toContain(b.hexes[4][4]);
        expect(neighbours).toContain(b.hexes[3][4]);
        expect(neighbours).toContain(b.hexes[3][3]);       
    });

    it('should return 6 correct vertices of a hex', () => {
        let hexVertices = b.verticesOfHex(b.hexes[6][3]);
        expect(hexVertices.length).toEqual(6);

        // Get neighbouring hexes and make sure there are only 2 shared vertices
        let neighbours = b.hexesAdjacentTo(b.hexes[6][3]);
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

    it('should correctly return all 6 edges between a hex and its neighbours', () => {
        let edges = b.edgesOfHex(b.hexes[4][3]);
        let neighbourHexEdges = [
            b.edgesOfHex(b.hexes[3][3]),
            b.edgesOfHex(b.hexes[3][4]),
            b.edgesOfHex(b.hexes[4][2]),
            b.edgesOfHex(b.hexes[4][4]),
            b.edgesOfHex(b.hexes[5][3]),
            b.edgesOfHex(b.hexes[5][4])
        ];

        for(let neighbourEdges of neighbourHexEdges) {
            expect(intersection(edges, neighbourEdges).length).toEqual(1);
        }
    });

    it('should return 1 intersecting vertex for 3 adjacent hexes', () => {
        // For vertex(4, 6)
        let verticesA = b.verticesOfHex(b.hexes[4][3]);
        let verticesB = b.verticesOfHex(b.hexes[4][4]);
        let verticesC = b.verticesOfHex(b.hexes[5][4]);

        let commonVertices: Array<Vertex> = intersection(verticesA, verticesB);
        commonVertices = intersection(commonVertices, verticesC);

        expect(commonVertices.length).toEqual(1);
    });
});

describe("Board Vertex Queries", () => {
    it('should return the 3 correct adjoining hexes of a vertex', () => {
        let evenXevenY = b.vertices[4][8];        
        expect(b.hexesOfVertex(evenXevenY)).toContain(b.hexes[4][3]);
        expect(b.hexesOfVertex(evenXevenY)).toContain(b.hexes[3][4]);
        expect(b.hexesOfVertex(evenXevenY)).toContain(b.hexes[4][4]);

        let oddXevenY = b.vertices[5][8];
        expect(b.hexesOfVertex(oddXevenY)).toContain(b.hexes[4][3]);
        expect(b.hexesOfVertex(oddXevenY)).toContain(b.hexes[4][4]);
        expect(b.hexesOfVertex(oddXevenY)).toContain(b.hexes[5][4]);

        let evenXoddY = b.vertices[6][7];
        expect(b.hexesOfVertex(evenXoddY)).toContain(b.hexes[5][3]);
        expect(b.hexesOfVertex(evenXoddY)).toContain(b.hexes[5][4]);
        expect(b.hexesOfVertex(evenXoddY)).toContain(b.hexes[6][3]);
        
        let oddXoddY = b.vertices[5][7];
        expect(b.hexesOfVertex(oddXoddY)).toContain(b.hexes[5][3]);
        expect(b.hexesOfVertex(oddXoddY)).toContain(b.hexes[4][3]);
        expect(b.hexesOfVertex(oddXoddY)).toContain(b.hexes[5][4]);
    });

    it('should return the correct edge between a vertex and its 3 adjacent vertices', () => {
        let edges = b.edgesOfVertex(b.vertices[5][7]);

        let neighbourEdgesA = b.edgesOfVertex(b.vertices[6][7]);
        let neighbourEdgesB = b.edgesOfVertex(b.vertices[5][6]);
        let neighbourEdgesC = b.edgesOfVertex(b.vertices[5][8]);

        expect(intersection(edges, neighbourEdgesA).length).toEqual(1);
        expect(intersection(edges, neighbourEdgesB).length).toEqual(1);
        expect(intersection(edges, neighbourEdgesC).length).toEqual(1);
    });
});

describe("Board Edge Queries", () => {
    it('should return the correct vertices given an edge when comparing to the vertices given a hex', () => {
        let hexVertices = b.verticesOfHex(b.hexes[4][3]);
        let hexEdges = b.edgesOfHex(b.hexes[4][3]);

        let foundVertices = new Array<Vertex>(0);        
        for(let edge of hexEdges) {
            let vertices = b.verticesOfEdge(edge);
            expect(intersection(vertices, hexVertices).length).toEqual(2);

            vertices.forEach(vertex => {
                if(foundVertices.indexOf(vertex) < 0) {
                    foundVertices.push(vertex);
                }
            });
        }
        expect(foundVertices.length).toEqual(6);
        expect(intersection(foundVertices, hexVertices).length).toEqual(hexVertices.length);
    });

});
