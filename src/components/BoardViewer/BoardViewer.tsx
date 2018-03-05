import * as React from 'react';
import { Hex, Edge, Vertex } from '../../models/hexboard';
import { CoordGrid } from '../CoordGrid/CoordGrid';
import './BoardViewer.css'

interface BoardViewerProps {
    hexes: Hex[][];
    edges: Edge[][];
    vertices: Vertex[][];

    highlightedHexes: Hex[];
    highlightedEdges: Edge[];
    highlightedVertices: Vertex[];

    onHexCellMouseOver: (x:number, y:number) => void;
    onEdgeCellMouseOver: (x:number, y:number) => void;
    onVertexCellMouseOver: (x:number, y:number) => void;
}

export function BoardViewer(props: BoardViewerProps) {
    return (
        <div className="boardViewer">
            <div> 
                <h1>Hexes</h1>
                <CoordGrid 
                    coords={props.hexes}
                    highlightedCells={props.highlightedHexes}
                    onCellMouseOver={props.onHexCellMouseOver}
                />
            </div>
            <div> 
                <h1>Edges</h1>
                <CoordGrid 
                    coords={props.edges} 
                    highlightedCells={props.highlightedEdges}
                    onCellMouseOver={props.onEdgeCellMouseOver}
                />
            </div>
            <div> 
                <h1>Vertices</h1>
                <CoordGrid 
                    coords={props.vertices}
                    highlightedCells={props.highlightedVertices}
                    onCellMouseOver={props.onVertexCellMouseOver} 
                />
            </div>
        </div>
    )
}