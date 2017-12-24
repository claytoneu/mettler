import * as React from 'react';
import './hello.css'

export default Hello;

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

function Hello({name, enthusiasmLevel = 1}: Props) {
    if (enthusiasmLevel <= 0) {
        throw new Error("don't be bitch");
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>          
    );
}

function getExclamationMarks(enthusiasmLevel: number) {
    return Array(enthusiasmLevel+ 1).join('!');
}



