import { parse, interpret } from "./index.js";
const code = `@grid(10);
#fn(-3, 4);
forward 20.`

const robot = parse(code)
console.log(`ROBOT #874, moving towards (${robot[2].finishLine.join(', ')})`)

for(const state of interpret(...robot, true)) {
    // const [position, angle, finished, log] = state
    const [ position /* position the robot is at */, angle /* angle the robot is facing */, finished /* if the robot has reached the finish line */, log /* messages from interpreter, only shows if verbose is true */ ] = state
    console.log(!finished?`\tRobot is at (${position.join(', ')}), facing ${angle} degrees`:"Robot reached finish line")
}