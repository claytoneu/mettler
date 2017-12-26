import { Hex as Hex, BoardState } from '../models/boardstate';
import { Edge as Edge } from '../models/boardstate';
import { Vertex as Vertex } from '../models/boardstate';
import { Layout as Layout } from './boardsetup';
import { LayoutHex as LayoutHex } from './boardsetup';
import * as BoardSetup from './boardsetup';

export enum Player {
    Blue = "BLUE",
    Red = "RED",
    White = "WHITE",
    Green = "GREEN",
    Yellow = "YELLOW",
    Brown = "BROWN"
}

export enum ResourceType {
    Wheat = "WHEAT",
    Brick = "BRICK",
    Sheep = "SHEEP",
    Ore = "ORE",
    Wood = "WOOD",
    Desert = "DESERT",
};

const ResourceHexCounts = {};
ResourceHexCounts[ResourceType.Wheat] = 6;
ResourceHexCounts[ResourceType.Brick] = 5;
ResourceHexCounts[ResourceType.Sheep] = 6;
ResourceHexCounts[ResourceType.Ore] = 5;
ResourceHexCounts[ResourceType.Wood] = 6;
ResourceHexCounts[ResourceType.Desert] = 2;

export enum PortType {
    ThreeForOne = "THREE_FOR_ONE",
    Wheat = "WHEAT",
    Brick = "BRICK",
    Sheep = "SHEEP",
    Ore = "ORE",
    Wood = "WOOD",
}

const PortHexCounts = {};
PortHexCounts[PortType.ThreeForOne] = 5;
PortHexCounts[PortType.Wheat] = 1;
PortHexCounts[PortType.Brick] = 1;
PortHexCounts[PortType.Sheep] = 2;
PortHexCounts[PortType.Ore] = 1;
PortHexCounts[PortType.Wood] = 1;

export enum PortDirection {
    N = "N",
    NW = "NW",
    NE = "NE",
    S = "S",
    SW = "SW",
    SE = "SE"
}

// Hexes
export class ResourceHex extends Hex {
    resourceType: ResourceType;
    resourceNumber?: number;

    constructor(x:number, y:number, resourceType:ResourceType) {
        super(x, y);
        this.resourceType = resourceType;
        this.resourceNumber = undefined;
    }
}

export class PortHex extends Hex {
    portType: PortType;
    direction: PortDirection;

    constructor(x:number, y:number, portType:PortType, direction: PortDirection) {
        super(x, y);
        this.portType = portType;
        this.direction = direction;
    }
}

// Roads
export class Road extends Edge {
    owner: Player;

    constructor(edge: Edge, owner: Player) {
        super(edge.x, edge.y);
        this.owner = owner;
    }
}

// Nodes
export class Node extends Vertex {
    building?: Building;
    port?: PortType;

    constructor(x:number, y:number) {
        super(x, y);
        this.building = undefined;
        this.port = undefined;
    }
}

export interface Building {
    owner: Player;
}

export class Settlement implements Building {
    owner: Player;

    constructor(owner: Player) {
        this.owner = owner;
    }
}

export class City implements Building {    
    owner: Player;

    constructor(owner: Player) {
        this.owner = owner;
    }
}

// The Board
export class Board {

}

function initResourceOrder(): ResourceType[] {
    let resourceOrder: ResourceType[] = [];

    for(let resourceType in ResourceHexCounts) {
        let numHexes = ResourceHexCounts[resourceType];
        for(let i = 0; i < numHexes; i++) {
            resourceOrder.push(resourceType as ResourceType);
        }
    }
    return BoardSetup.shuffle(resourceOrder);
}

function initPortOrder(): PortType[] {
    let portOrder: PortType[] = [];

    for(let portType in PortHexCounts) {
        let numHexes = ResourceHexCounts[portType];
        for(let i = 0; i < numHexes; i++) {
            portOrder.push(portType as PortType);
        }
    }
    return BoardSetup.shuffle(portOrder);
}

/*
   Returns a 2D array of randomized port and resource hexes according to the Layout.
*/
function setupBoard(boardState: BoardState) {
   let resourceOrder = initResourceOrder();
    let portOrder = initPortOrder();
    
    // Iterate through Layout, generating hexes and linking ports to vertices as needed
    for(let x=0; x<Layout.length; x++) {
        let layoutCol = Layout[x];
        for(let y=0; y>layoutCol.length; y++) {
            let layoutHex = Layout[x][y];

            switch(layoutHex) {
                case LayoutHex.Land: {
                    let resourceType = resourceOrder.pop() as ResourceType;
                    boardState.setHexes[x][y] = new ResourceHex(x, y, resourceType);
                    break;
                }

                case LayoutHex.PortN: {
                    // Add the new port to hex matrix
                    let portType = portOrder.pop() as PortType;
                    hexes[x][y] = new PortHex(x, y, portType, PortDirection.N);

                    // Create new trading port nodes and update vertices matrix

                }

                default: {
                    hexes[x][y] = new Hex(x, y);
                    break;
                }
            }

        }
    }

    return hexes;
}