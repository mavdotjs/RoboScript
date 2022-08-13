// @ts-ignore
import { parse as pegParse } from './robot.js';
function getVel(dir) {
    const map = {
        north: [0, 1],
        east: [1, 0],
        south: [0, -1],
        west: [-1, 0]
    };
    return map[dir];
}
function getCardinal(angle) {
    if (typeof angle === 'string')
        angle = parseInt(angle);
    if (typeof angle === 'undefined')
        throw new Error('angle is undefines');
    if (angle < 0 || angle > 360)
        angle = mod(angle, 360);
    const directions = ["north", "east", "south", "west"];
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
        if (angle >= (i * degree) && angle < (i + 1) * degree)
            return directions[i];
    }
    return "north";
}
function parseAngle(val) {
    return parseInt(val) % 360;
}
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
function mod(a, b) {
    return ((a % b) + b) % b;
}
function arrayEquality($1, $2) {
    return JSON.stringify($1) === JSON.stringify($2);
}
/**
 * @param {CommandList} commands
 * @param {RobotOptions} options
 * @param {boolean} verbose
 * @returns {Generator<RobotOut>}
 */
function* interpret(commands, options, verbose = true) {
    let direction = 0; // north
    let pos = [0, 0];
    let vel = [0, 1];
    let lastStep = "";
    const { finishLine, obstacles } = options;
    if (obstacles.some(r => arrayEquality(pos, r))) {
        throw new Error("CommandError: Obstacle cannot be (0, 0)");
    }
    else if (arrayEquality(pos, finishLine)) {
        throw new Error("CommandError: Finish line (#fn(point))");
    }
    cmdLoop: for (let cmd of commands) {
        if (Math.sign(cmd) < 0) {
            // Turn command
            switch (cmd) {
                case -2:
                    // left
                    direction -= 90;
                    direction = parseAngle(direction);
                    vel = getVel(getCardinal(direction));
                    lastStep = "turn left.";
                    break;
                case -1:
                    // right
                    direction += 90;
                    direction = parseAngle(direction);
                    vel = getVel(getCardinal(direction));
                    lastStep = "turn right.";
                    break;
            }
        }
        else if (Math.sign(cmd) > 0) {
            // Move command
            lastStep = `(forward ${cmd})`;
            for (const i of range(cmd)) {
                pos[0] += vel[0];
                pos[1] += vel[1];
                lastStep += `\n\tmove 1. (out of ${cmd})`;
                if (obstacles.some(r => arrayEquality(pos, r))) {
                    pos[0] -= vel[0];
                    pos[1] -= vel[1];
                    lastStep += "\n\tRobot hit wall. skipping step.";
                    break;
                }
                else if (arrayEquality(pos, finishLine)) {
                    lastStep += "\nRobot hit finish line!";
                    yield [pos, direction, arrayEquality(pos, finishLine), verbose ? lastStep : ''];
                    break cmdLoop;
                }
            }
        }
        else {
            throw new Error("CommandError");
        }
        yield [pos, direction, arrayEquality(pos, finishLine), verbose ? lastStep : ''];
    }
}
function truncateComments(string) {
    return string.replace(/\/.*/gm, "");
}
function parse(code) {
    return pegParse(truncateComments(code));
}
/**
 * @param {string} code
 * @param {boolean} verbose
 * @returns {Generator<RobotOut>}
 * @description takes the output of the parser and passes it to the interpreter
 */
export default function* parseAndInterpret(code, verbose = false) {
    yield* interpret(...parse(code), verbose);
}
export { parseAndInterpret, parse, interpret };
