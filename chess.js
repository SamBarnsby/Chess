window.onload = function() {
    startGame();
}

var whiteimagearray = ["./images/pawn_white.png","./images/rook_white.png","./images/knight_white.png","./images/bishop_white.png","./images/queen_white.png","./images/king_white.png","./images/bishop_white.png","./images/knight_white.png","./images/rook_white.png"];
var blackimagearray = ["./images/pawn_black.png","./images/rook_black.png","./images/knight_black.png","./images/bishop_black.png","./images/queen_black.png","./images/king_black.png","./images/bishop_black.png","./images/knight_black.png","./images/rook_black.png"];

var coloredtiles = [];
var firstclickedpiece = true;
var firstpiece;
var whoturn = true;
var proceed = true;
var whiteDanger = false;
var blackDanger = false;
var callAgain = true;
function startGame() {
    var table = document.createElement("table");
    table.setAttribute('border','1');
    var position = 1;
    for (var i = 1; i < 9; i++) {
        var tr = document.createElement('tr');
        if(i == 8) {
            position = 1;
        }
        for (var j = 1; j < 9; j++) {
            var td = document.createElement('td');
            var tile = [i,j];
            if (i%2 == j%2) {
                td.className = "white";
                td.setAttribute("id", tile.toString() + "white");
            } else {
                td.className = "black";
                td.setAttribute("id", tile.toString() + "black");
            }
            tr.appendChild(td);
            var input = document.createElement("input");
            input.setAttribute("type", "image");
            input.setAttribute("id", tile.toString());
            input.setAttribute("value", "");
            input.setAttribute("class", "image");
            input.setAttribute("onclick", "movePiece(" + tile.toString() + ")");
            if(i == 1) {
                input.setAttribute("src", whiteimagearray[position]);
                position++;
            }
            else if(i == 2) {
                input.setAttribute("src", whiteimagearray[0]);
                position++;
            }
            else if(i == 7) {
                input.setAttribute("src", blackimagearray[0]);
                position++;
            }
            else if(i == 8) {

                input.setAttribute("src", blackimagearray[position]);
                position++;
            }
            else {
                input.setAttribute("src", "");
            }
            td.appendChild(input);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function movePiece(tileRow,tileColumn) {
    callAgain = true;
    if(firstclickedpiece) {
        if(whoturn && document.getElementById(tileRow + "," + tileColumn).src.includes("black")) {
            proceed = false;
        }
        else if(!whoturn && document.getElementById(tileRow + "," + tileColumn).src.includes("white")) {
            proceed = false;
        }
        else if(!document.getElementById(tileRow + "," + tileColumn).src.includes("white") && !document.getElementById(tileRow + "," + tileColumn).src.includes("black")) {
            proceed = false;
        }
    }
    else {
        if(whoturn && document.getElementById(tileRow + "," + tileColumn).src.includes("white")) {
            proceed = false;
        }
        else if(!whoturn && document.getElementById(tileRow + "," + tileColumn).src.includes("black")) {
            proceed = false;
        }
        if(!(document.getElementById(tileRow + "," + tileColumn).parentNode.style.backgroundColor === "yellow")) {
            proceed = false;
        }
    }

    if(proceed) {
        if (!(document.getElementById(tileRow + "," + tileColumn).src.includes("black") || document.getElementById(tileRow + "," + tileColumn).src.includes("white")) && firstpiece == false) {
            clearTiles();
        }
        else if (firstclickedpiece) {
            firstpiece = tileRow + "," + tileColumn;
            firstclickedpiece = false;
            showPath(firstpiece);
        }
        else if (firstpiece === tileRow + "," + tileColumn) {

        }
        else {
            var src = document.getElementById(firstpiece).src;
            if (src.includes("pawn")) {
                if (src.includes("white")) {
                    movePawn(firstpiece, tileRow + "," + tileColumn, true);

                }
                else {
                    movePawn(firstpiece, tileRow + "," + tileColumn, false);
                }
            }
            else if (src.includes("rook")) {
                if (src.includes("white")) {
                    moveRook(firstpiece, tileRow + "," + tileColumn, true);
                }
                else {
                    moveRook(firstpiece, tileRow + "," + tileColumn, false);
                }
            }
            else if (src.includes("knight")) {
                if (src.includes("white")) {
                    moveKnight(firstpiece, tileRow + "," + tileColumn, true);
                }
                else {
                    moveKnight(firstpiece, tileRow + "," + tileColumn, false);
                }
            }
            else if (src.includes("bishop")) {
                if (src.includes("white")) {
                    moveBishop(firstpiece, tileRow + "," + tileColumn, true);
                }
                else {
                    moveBishop(firstpiece, tileRow + "," + tileColumn, false);
                }
            }
            else if (src.includes("king")) {
                if (src.includes("white")) {
                    moveKing(firstpiece, tileRow + "," + tileColumn, true);
                }
                else {
                    moveKing(firstpiece, tileRow + "," + tileColumn, false);
                }
            }
            else if (src.includes("queen")) {
                if (src.includes("white")) {
                    moveQueen(firstpiece, tileRow + "," + tileColumn, true);
                }
                else {
                    moveQueen(firstpiece, tileRow + "," + tileColumn, false);
                }
            }
            firstclickedpiece = true;
            firstpiece = "";
            proceed = true;
            if(whoturn) {
                whoturn = false;
            }
            else {
                whoturn = true;
            }
            if(callAgain) {
                showPath(tileRow + "," + tileColumn);
                clearTiles();
            }
        }
    }
    proceed = true;
}

function showPath(first) {
    var firstsplit = first.split(",");
    //CHECK TO SEE IF PIECE IS A PAWN
    if(document.getElementById(first).src.includes("pawn")) {
        //IF PAWN IS WHITE
        if(document.getElementById(first).src.includes("white")) {
            //CHECK IF ITS FIRST MOVE
            if(firstsplit[0] == 2) {
                for(var i = parseInt(firstsplit[0]) + 1; i<(parseInt(firstsplit[0])+3);i++) {
                    if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                    else {
                        break;
                    }
                }
            }
            // ELSE DEFAULT ONE PIECE MOVE
            else {
                for(var i = parseInt(firstsplit[0]) + 1; i<(parseInt(firstsplit[0])+2);i++) {
                    if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
            //IF ENEMY PIECE ON RIGHT
            try {
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black")) && (document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king"))) {
                    alert("Black is in check!");
                }
            }
            catch (Exception){
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black")) && (document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king"))) {
                    alert("Black is in check!");
                }
            }
            //IF ENEMY ON RIGHT
            try {
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black")) && (document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king"))) {
                    alert("Black is in check!");
                }
            }
            catch(Exception) {
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black")) && (document.getElementById((parseInt(firstsplit[0]) + 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king"))) {
                    alert("Black is in check!");
                }
            }
        }
        //ELSE ITS BLACK PIECE
        else {
            //IF INITIAL PIECE
            if(firstsplit[0] == 7) {
                for(var i = parseInt(firstsplit[0]) - 1; i>(parseInt(firstsplit[0])-3);i--) {
                    if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }

                }
            }
            else {
                for(var i = parseInt(firstsplit[0]) - 1; i>(parseInt(firstsplit[0])-2);i--) {
                    if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
            try {
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white")) && (document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king"))) {
                    alert("White is in check!");
                }
            }
            catch (Exception){
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white")) && (document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king"))) {
                    alert("White is in check!");
                }
            }
            try {
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white")) && (document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king"))) {
                    alert("White is in check!");
                }
            }
            catch(Exception) {
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white"))) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                if ((document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white")) && (document.getElementById((parseInt(firstsplit[0]) - 1) + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king"))) {
                    alert("White is in check!");
                }
            }
        }
    }
    //IF PIECE IS A ROOK
    if (document.getElementById(first).src.includes("rook") || document.getElementById(first).src.includes("queen")) {
        //CHECK ALL DIRECTIONS FOR MOVEMENT
        for(var i = parseInt(firstsplit[0]) + 1; i <=8; i++) {
            if(document.getElementById(first).src.includes("white")) {
                if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                    var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("black") && document.getElementById(i + "," + firstsplit[1]).src.includes("king")) {
                        alert("Black is in Check!");
                    }
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                    var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("white") && document.getElementById(i + "," + firstsplit[1]).src.includes("king")) {
                       alert("White is in Check!");
                    }
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("white")) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        for(var i = parseInt(firstsplit[0]) - 1; i >=1; i--) {
            if(document.getElementById(first).src.includes("white")) {
                if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                    var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("black") && document.getElementById(i + "," + firstsplit[1]).src.includes("king")) {
                        alert("Black is in Check!");
                    }
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                if(!(document.getElementById(i + "," + firstsplit[1]).src.includes("black")) && !(document.getElementById(i + "," + firstsplit[1]).src.includes("white"))) {
                    var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("white") && document.getElementById(i + "," + firstsplit[1]).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if(document.getElementById(i + "," + firstsplit[1]).src.includes("white")) {
                        var tableid = document.getElementById(i+","+firstsplit[1]).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        for(var i = parseInt(firstsplit[1]) + 1; i <=8; i++) {
            if(document.getElementById(first).src.includes("white")) {
                if(!(document.getElementById(firstsplit[0] + "," + i).src.includes("black")) && !(document.getElementById(firstsplit[0] + "," + i).src.includes("white"))) {
                    var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("black") && document.getElementById(firstsplit[0] + "," + i).src.includes("king")) {
                        alert("Black is in Check!");
                    }
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("black")) {
                        var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                if(!(document.getElementById(firstsplit[0] + "," + i).src.includes("black")) && !(document.getElementById(firstsplit[0] + "," + i).src.includes("white"))) {
                    var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("white") && document.getElementById(firstsplit[0] + "," + i).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("white")) {
                        var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        for(var i = parseInt(firstsplit[1]) - 1; i >=1; i--) {
            if(document.getElementById(first).src.includes("white")) {
                if(!(document.getElementById(firstsplit[0] + "," + i).src.includes("black")) && !(document.getElementById(firstsplit[0] + "," + i).src.includes("white"))) {
                    var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("black") && document.getElementById(firstsplit[0] + "," + i).src.includes("king")) {
                        alert("Black is in Check!");
                    }
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("black")) {
                        var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                if(!(document.getElementById(firstsplit[0] + "," + i).src.includes("black")) && !(document.getElementById(firstsplit[0] + "," + i).src.includes("white"))) {
                    var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("white") && document.getElementById(firstsplit[0] + "," + i).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if(document.getElementById(firstsplit[0] + "," + i).src.includes("white")) {
                        var tableid = document.getElementById(firstsplit[0]+","+i).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
    // IF PIECE IS A KNIGHT
    if (document.getElementById(first).src.includes("knight")) {
        var columndown = parseInt(firstsplit[0]) + 2;
        var columnup = parseInt(firstsplit[0]) - 2;
        var rowup = parseInt(firstsplit[1]) - 2;
        var rowdown = parseInt(firstsplit[1]) + 2;
        // LOOK TWO DOWN AND ONE TO THE RIGHT
        if((parseInt(firstsplit[1]) + 1) > 8 || columndown > 8){}
        else {
            if (!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white") && document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                    alert("Black is in Check");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white")) {
                    var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                       alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black")) {
                        var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK TWO DOWN AND ONE TO THE LEFT
        if((parseInt(firstsplit[1]) - 1) < 1 || columndown > 8){}
        else {
            if (!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white") && document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king")) {
                    alert("Black is in Check!");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white")) {
                    var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black")) {
                        var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK TWO UP AND ONE TO THE LEFT
        if(columnup < 1 || (parseInt(firstsplit[1]) + 1) > 8){}
        else {
            if (!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                    alert("Black is in Check!");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white")) {
                    var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black")) {
                        var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK TWO UP AND ONE TO THE RIGHT
        if(columnup < 1 || (parseInt(firstsplit[1]) - 1) < 1){}
        else {
            if (!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king")) {
                    alert("Black is in Check!");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white")) {
                    var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black")) {
                        var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK ONE DOWN AND TWO TO THE LEFT
        if(rowdown > 8 || (parseInt(firstsplit[0]) + 1) > 8){}
        else {
            if (!document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("white")) {
                var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("white") && document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("king")) {
                    alert("Black is in Check!");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("white")) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("black") && document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).src.includes("black")) {
                        var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowdown).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK ONE UP AND TWO TO THE LEFT
        if(rowdown > 8 || (parseInt(firstsplit[0]) - 1) < 1){}
        else {
            if (!document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("white")) {
                var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("white") && document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("king")) {
                    alert("Black is in Check!");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("white")) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("black") && document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).src.includes("black")) {
                        var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowdown).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK ONE DOWN AND TWO TO THE RIGHT
        if(rowup < 1 || (parseInt(firstsplit[0]) + 1) > 8){}
        else {
            if (!document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("white")) {
                var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("white") && document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("king")) {
                    alert("Black is in Check");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("white")) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("black") && document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).src.includes("black")) {
                        var tableid = document.getElementById((parseInt(firstsplit[0]) + 1) + "," + rowup).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
        //LOOK ONE UP AND TOW TO THE RIGTH
        if(rowup < 1 || (parseInt(firstsplit[0]) - 1) < 1){}
        else {
            if (!document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("white")) {
                var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else {
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("white") && document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("king")) {
                   alert("Black is in Check");
                }
                if (document.getElementById(first).src.includes("white") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("white")) {
                    var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
                else {
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("black") && document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("king")) {
                        alert("White is in Check!");
                    }
                    if (document.getElementById(first).src.includes("black") && !document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).src.includes("black")) {
                        var tableid = document.getElementById((parseInt(firstsplit[0]) - 1) + "," + rowup).parentNode;
                        tableid.style.backgroundColor = "yellow";
                        coloredtiles.push(tableid);
                    }
                }
            }
        }
    }
    if (document.getElementById(first).src.includes("bishop")|| document.getElementById(first).src.includes("queen")) {
        var column = parseInt(firstsplit[0]);
        var row = parseInt(firstsplit[1]);
        var intable = true;
        while(intable) {
            column++;
            row++;
            try {
                if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("white")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("black")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("Black is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("White is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
            }
            catch(e) {
                intable = false;
                break;
            }
        }
        column = parseInt(firstsplit[0]);
        row = parseInt(firstsplit[1]);
        intable = true;
        while(intable) {
            column--;
            row--;
            try {
                if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("white")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("black")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("Black is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("White is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
            }
            catch(e) {
                intable = false;
                break;
            }
        }
        column = parseInt(firstsplit[0]);
        row = parseInt(firstsplit[1]);
        intable = true;
        while(intable) {
            column++;
            row--;
            try {
                if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("white")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("black")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("Black is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("White is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
            }
            catch(e) {
                intable = false;
                break;
            }
        }
        column = parseInt(firstsplit[0]);
        row = parseInt(firstsplit[1]);
        intable = true;
        while(intable) {
            column--;
            row++;
            try {
                if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("white")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("black")) {
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("Black is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("black") && document.getElementById(first).src.includes("white")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black") && document.getElementById(column + "," + row).src.includes("king")) {
                    alert("White is in Check!");
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else if(document.getElementById(column + "," + row).src.includes("white") && document.getElementById(first).src.includes("black")) {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                    intable = false;
                    break;
                }
                else {
                    var tableid = document.getElementById(column + "," + row).parentNode;
                    tableid.style.backgroundColor = "yellow";
                    coloredtiles.push(tableid);
                }
            }
            catch(e) {
                intable = false;
                break;
            }
        }
    }
    if (document.getElementById(first).src.includes("king") || document.getElementById(first).src.includes("queen")) {
        var columnup = parseInt(firstsplit[0]) + 1;
        var columndown = parseInt(firstsplit[0]) - 1;
        var rowdown = parseInt(firstsplit[1]) - 1;
        var rowup= parseInt(firstsplit[1]) + 1;
        if(columnup <= 8 && (parseInt(firstsplit[1]) + 1) <=8 ) {
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && document.getElementById(first).src.includes("black") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                alert("Black is in Check!");
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white") && document.getElementById(first).src.includes("white") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                alert("White is in Check!");
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
        if(columnup <= 8 && (parseInt(firstsplit[1]) - 1) >=1 ) {
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black") && document.getElementById(first).src.includes("black") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king")) {
                alert("Black is in Check!");
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white") && document.getElementById(first).src.includes("white") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("king")) {
                alert("White is in Check!");
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
        if(columnup <= 8) {
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).src.includes("black") && document.getElementById(first).src.includes("black") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).src.includes("king")) {
                alert("Black is in Check!");
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).src.includes("white") && document.getElementById(first).src.includes("white") && document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).src.includes("king")) {
                alert("White is in Check!");
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById(columnup + "," + (parseInt(firstsplit[1]))).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
        if(columndown >= 1 && (parseInt(firstsplit[1]) + 1) <=8 ) {
            if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && document.getElementById(first).src.includes("black") && document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                alert("Black is in Check!");
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white") && document.getElementById(first).src.includes("white") && document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("king")) {
                alert("White is in Check!");
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) + 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
        //LEFT OVER HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(columndown >= 1 && (parseInt(firstsplit[1]) - 1) >=1 ) {
            if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]) - 1)).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
        if(columndown >= 1) {
            if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]))).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]))).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else if(!document.getElementById(columndown + "," + (parseInt(firstsplit[1]))).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById(columndown + "," + (parseInt(firstsplit[1]))).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }

        if(rowup <=8) {
            if(!document.getElementById((parseInt(firstsplit[0])) + "," + rowup).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById((parseInt(firstsplit[0])) + "," + rowup).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else if(!document.getElementById((parseInt(firstsplit[0])) + "," + rowup).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById((parseInt(firstsplit[0])) + "," + rowup).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
        if(rowup >=1) {
            if(!document.getElementById((parseInt(firstsplit[0])) + "," + rowdown).src.includes("black") && document.getElementById(first).src.includes("black")) {
                var tableid = document.getElementById((parseInt(firstsplit[0])) + "," + rowdown).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
            else if(!document.getElementById((parseInt(firstsplit[0])) + "," + rowdown).src.includes("white") && document.getElementById(first).src.includes("white")) {
                var tableid = document.getElementById((parseInt(firstsplit[0])) + "," + rowdown).parentNode;
                tableid.style.backgroundColor = "yellow";
                coloredtiles.push(tableid);
            }
        }
    }

}

function clearTiles() {
    for(var i = 0; i < coloredtiles.length; i++) {
        var tile = coloredtiles[i];
        if(tile.className == "white") {
            tile.style.backgroundColor = "white";
        }
        else {
            tile.style.backgroundColor = "black";
        }
    }
}

function movePawn(first, second, color) {
    var firstsplit = first.split(",");
    var secondsplit = second.split(",");
    var bool = true;
    var parent = document.getElementById(second).parentNode;
    if(color) {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    else {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    if(bool && color) {
        document.getElementById(second).src = whiteimagearray[0];
        document.getElementById(first).src = "";
    }
    else if(bool && !color) {
        document.getElementById(second).src = blackimagearray[0];
        document.getElementById(first).src = "";

    }
    clearTiles();
}

function moveRook(first, second, color) {
    var firstsplit = first.split(",");
    var secondsplit = second.split(",");
    var bool = true;
    var parent = document.getElementById(second).parentNode;
    if(color) {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    else {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }

    if(bool && color) {
        document.getElementById(second).src = whiteimagearray[1];
        document.getElementById(first).src = "";
    }
    else if(bool && !color) {
        document.getElementById(second).src = blackimagearray[1];
        document.getElementById(first).src = "";

    }
    clearTiles();
}

function moveKnight(first, second, color) {
    var firstsplit = first.split(",");
    var secondsplit = second.split(",");
    var bool = true;
    var parent = document.getElementById(second).parentNode;
    if(color) {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    else {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    if(bool && color) {
        document.getElementById(second).src = whiteimagearray[2];
        document.getElementById(first).src = "";
    }
    else if(bool && !color) {
        document.getElementById(second).src = blackimagearray[2];
        document.getElementById(first).src = "";

    }
    clearTiles();
}

function moveBishop(first, second, color) {
    var firstsplit = first.split(",");
    var secondsplit = second.split(",");
    var bool = true;
    var parent = document.getElementById(second).parentNode;
    if(color) {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    else {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    if(bool && color) {
        document.getElementById(second).src = whiteimagearray[3];
        document.getElementById(first).src = "";
    }
    else if(bool && !color) {
        document.getElementById(second).src = blackimagearray[3];
        document.getElementById(first).src = "";

    }
    clearTiles();
}

function moveKing(first, second, color) {
    var firstsplit = first.split(",");
    var secondsplit = second.split(",");
    var bool = true;
    var parent = document.getElementById(second).parentNode;
    if(color) {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    else {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    if(bool && color) {
        document.getElementById(second).src = whiteimagearray[5];
        document.getElementById(first).src = "";
    }
    else if(bool && !color) {
        document.getElementById(second).src = blackimagearray[5];
        document.getElementById(first).src = "";

    }
    clearTiles();
}

function moveQueen(first, second, color) {
    var firstsplit = first.split(",");
    var secondsplit = second.split(",");
    var bool = true;
    var parent = document.getElementById(second).parentNode;
    if(color) {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    else {
        if(!(parent.style.backgroundColor == "yellow")) {
            bool = false;
        }
    }
    if(bool && color) {
        document.getElementById(second).src = whiteimagearray[4];
        document.getElementById(first).src = "";
    }
    else if(bool && !color) {
        document.getElementById(second).src = blackimagearray[4];
        document.getElementById(first).src = "";

    }
    clearTiles();
}
