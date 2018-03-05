import { BoardViewer } from '../../components/BoardViewer/BoardViewer';
import { RootState } from '../state';
import { connect, Dispatch } from 'react-redux';
import * as actions from './appActions';

export function mapStateToProps({hexes, edges, vertices, highlightedHexes, highlightedEdges, highlightedVertices}: RootState) {
    return {
        hexes,
        edges,
        vertices,
        highlightedHexes,
        highlightedEdges,
        highlightedVertices,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.CoordGridCellMouseOverAction>) {
    return {
        onHexCellMouseOver: (x:number, y:number) => dispatch(actions.hexCellMouseOver(x, y)),
        onEdgeCellMouseOver: (x:number, y:number) => dispatch(actions.edgeCellMouseOver(x, y)),
        onVertexCellMouseOver: (x:number, y:number) => dispatch(actions.vertexCellMouseOver(x, y)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardViewer);