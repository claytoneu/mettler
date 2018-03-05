// import { ResourceType as ResourceType, PortType, Board } from  './board';

// Init
class GameState {
    // board: Board;

    constructor() {
    //     // Generate unrandomized resource deck
    //     this.resourceTiles = this.generateResourceTiles();
    //     shuffleArray(this.resourceTiles);

    //     // Place resource tiles on the board
    //     this.placeResourceTilesOnBoard(this.resourceTiles, this.board);

    //     // Place resource tokens on the board
    //     this.placeResourceTokensOnBoard(this.board);

    //     // Overlay game state Edges and Nodes
        
    //     console.log(this.board);
    // };
    // generateResourceTiles() {
    //     let resourceTiles = [];

    //     for(let resourceType in resourceTileCounts) {
    //         let numTiles = resourceTileCounts[resourceType];
    //         for(let i = 0; i < numTiles; i++) {
    //             resourceTiles.push(new ResourceTile(resourceType));
    //         }
    //     }

    //     return resourceTiles;
    // }

    // placeResourceTilesOnBoard(resourceTiles, board) {
    //     let resourceIndex = 0;
    //     for(let col=0; col<BOARD_TILE_LAYOUT.length; col++) {
    //         let numRows = BOARD_TILE_LAYOUT[col];
    //         board[col] = [];

    //         for(let row=0; row<numRows; row++) {
    //             board[col].push(resourceTiles[resourceIndex]);
    //             resourceIndex++;
    //         }            
    //     }
    // }

    // placeResourceTokensOnBoard(board) {
    //     // Create shuffled resource tokens from the BOARD_RESOURCE_TOKENS definition
    //     let resourceTokens = [];
    //     for(let resourceLetter in BOARD_RESOURCE_TOKENS) {
    //         let resourceToken = {
    //             "number":BOARD_RESOURCE_TOKENS[resourceLetter],
    //             "letter":resourceLetter
    //         };
    //         resourceTokens.push(resourceToken);
    //     }
    //     shuffleArray(resourceTokens);

    //     // Place shuffled resource tokens on the board column-by-column
    //     // TO DO: Place resource tokens in spiral pattern as per traditional setup
    //     for(let col=0; col<board.length; col++) {
    //         let rowSize = board[col].length;

    //         for(let row=0; row<rowSize; row++) {
    //             let tile = board[col][row];
                
    //             if(tile.resourceType=="desert")
    //                 continue;
                
    //             let resourceToken = resourceTokens.pop()
    //             tile.number = resourceToken.number;
    //             tile.letter = resourceToken.letter;
    //         }
    //     }
    }
}