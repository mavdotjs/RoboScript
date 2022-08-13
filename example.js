import { parse, interpret } from "./index.js";
const code = `#fn(3, 4); / Required at the start of every file
#ob(0, 5); / Not required but if its there it must be before any actions
#ob(4, 4); / Creates a list of obstacles
forward 5. / Since there is an obstacle at (0, 5) the robot can only move 5 spaces north
turn right. / turn command
forward 4.
`

const robot = parse(code)
console.log(`ROBOT #874, moving towards (${robot[1].finishLine.join(', ')})`)

for(const state of interpret(...robot, true)) {
    // const [position, angle, finished, log] = state
    const [ position /* position the robot is at */, angle /* angle the robot is facing */, finished /* if the robot has reached the finish line */, log /* messages from interpreter, only shows if verbose is true */ ] = state
}