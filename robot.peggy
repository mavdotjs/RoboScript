{
    function directionToInt(text) {
        return text === "left"? -2 : -1
    }

    function log(any, thing) {
        console.log(any, thing)
        return any
    }
}

Program = Head:Headers? Cmds:Commands { return [ Cmds, Head || {} ] }
Headers = fin:Finish obs:Obstacles? { return {
    finishLine: fin,
    obstacles: obs || []
} }
Finish = "#fn" "(" c:coord ");" n__ { return c }
Obstacles = head:Obstacle lines:Obstacle* { return [ head, ...lines ] }
Obstacle = "#ob" "(" c:coord ");" n__ { return c }
Commands = head:line lines:(line)* { return [ head, ...lines ] }
line = c:Command "." n__ { return c }
Command = v:(turn / go) { return v }
turn = "turn" __ d:lr { return d }
go = "forward" __ a:integer { return a }

lr "Direction" = ("left" / "right") { return directionToInt(text()) }
integer "integer" = digits:[0-9]+ { return parseInt(digits.join(""), 10) }

coord "Point" = __ $1:integer __ "," __ $2:integer __ { return [ $1, $2 ] }
n__ "optional whitespace / linebreak" = $n_*
n_ "whitespace / linebreak" = $_ 
    / "\n"
__ "optional whitespace" = $_*
_ "whitespace" = $[ \t]