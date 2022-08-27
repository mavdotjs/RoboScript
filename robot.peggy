{
    function directionToInt(text) {
        return text === "left"? -2 : -1
    }

    function log(any, thing) {
        console.log(any, thing)
        return any
    }
}

Program = Grid:Grid Head:Headers Cmds:Commands { return [ Grid, Cmds, Head || {} ] }
Grid "Grid header" = "@grid" "(" v:integer ")" semicolon n__ { return v }
Headers = fin:Finish obs:Obstacles? { return {
    finishLine: fin,
    obstacles: obs || []
} }
Finish "Finish line header" = "#fn" "(" c:coord ")" semicolon n__ { return c }
Obstacles = head:Obstacle lines:Obstacle* { return [ head, ...lines ] }
Obstacle "Obstacle header" = "#ob" "(" c:coord ")" semicolon n__ { return c }
Commands = head:line lines:(line)* { return [ head, ...lines ] }
line = c:Command dot n__ { return c }
Command = v:(turn / go) { return v }
turn = "turn" __ d:lr { return d }
go = "forward" __ a:integer { return a }

lr "Direction" = ("left" / "right") { return directionToInt(text()) }
integer "integer" = negate:negate digits:[0-9]+ { return parseInt(negate + digits.join(""), 10) }
negate = "-"? { return text() }

semicolon "Header end" = ";"
dot "Line end" = "."

coord "Point" = __ $1:integer __ "," __ $2:integer __ { return [ $1, $2 ] }
n__ "optional whitespace / linebreak" = $n_*
n_ "whitespace / linebreak" = $_ 
    / "\n"
__ "optional whitespace" = $_*
_ "whitespace" = $[ \t]