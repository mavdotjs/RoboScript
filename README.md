see [leetcode problem #874](https://leetcode.com/problems/walking-robot-simulation/)

example of robot intstruction language
```
/ (<- Comment) Set grid size*
@grid(10);
/ Set finish line*
#fn(3, 4);
/ Create obstacle(s)
#ob(0, 5);
#ob(0, 6);
/ Start commands
forward 4.
```
\* Required

see [The example](./example.js) for how to parse 

see [Railroad diagram](./robot.md) to understand the parser a bit better