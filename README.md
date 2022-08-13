see [leetcode problem #874](https://leetcode.com/problems/walking-robot-simulation/)

example of robot intstruction language
```
#fn(3, 4); / Required at the start of every file
#ob(0, 5); / Not required but if its there it must be before any actions
#ob(0, 6); / Creates a list of obstacles
forward 4. / a dot here works as like a semicolon does in java
```

see [The example](./example.js) for how to parse 

see [Railroad diagram](./robot.md) to understand the parser a bit better