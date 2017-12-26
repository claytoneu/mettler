
// Board Setup
export enum LayoutHex {
    Empty,
    Water,
    PortN,
    PortNW,
    PortNE,
    PortS,
    PortSW,
    PortSE,
    Land
}

export const NumLayoutColumns = 8;
export const NumLayoutRows = 9;

export const Layout = [
    [LayoutHex.Empty, LayoutHex.Empty, LayoutHex.PortSE, LayoutHex.Water, LayoutHex.PortNE, LayoutHex.Water, LayoutHex.Empty, LayoutHex.Empty], // Column 0
    [LayoutHex.Empty, LayoutHex.Empty, LayoutHex.Water, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.PortNE, LayoutHex.Empty], // Column 1
    [LayoutHex.Empty, LayoutHex.PortSE, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Water, LayoutHex.Empty], // Column 2
    [LayoutHex.Empty, LayoutHex.Water, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.PortN], // Column 3
    [LayoutHex.PortS, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Water], // Column 4
    [LayoutHex.Empty, LayoutHex.Water, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.PortN], // Column 5
    [LayoutHex.Empty, LayoutHex.PortSW, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.Water, LayoutHex.Empty], // Column 6
    [LayoutHex.Empty, LayoutHex.Empty, LayoutHex.Water, LayoutHex.Land, LayoutHex.Land, LayoutHex.Land, LayoutHex.PortNW, LayoutHex.Empty], // Column 7
    [LayoutHex.Empty, LayoutHex.Empty, LayoutHex.PortSW, LayoutHex.Water, LayoutHex.PortNW, LayoutHex.Water, LayoutHex.Empty, LayoutHex.Empty], // Column 8
];

export const ResourceTokens = {
    "a":2,
    "b":5,
    "c":4,
    "d":6,
    "e":3,
    "f":9,
    "g":8,
    "h":11,
    "i":11,
    "j":10,
    "k":6,
    "l":3,
    "m":8,
    "n":4,
    "o":8,
    "p":10,
    "q":11,
    "r":12,
    "s":10,
    "t":5,
    "u":4,
    "v":9,
    "w":5,
    "x":9,
    "y":12,
    "za":3,
    "zb":2,
    "zc":6
}

export function shuffle(arr: any[]) {
    let shuffled = arr.slice();
    let temp = undefined;

    for(let i=0; i<shuffled.length; i++) {
        let newIndex = Math.floor(Math.random() * shuffled.length);
        temp = shuffled[newIndex];
        shuffled[newIndex] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled;
}