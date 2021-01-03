async function printGamelist(res) {
    function createBoard() {
        const array = new Array(13);
        for (let i = 0; i < 13; i++) {
            array[i] = new Array(13);
        }
        return array;
    }

    function printBoard(board) {
        let result = "";

        for (let x = 0; x < board.length; x++) {
            result += "<tr>";
            for (let y = 0; y < board[0].length; y++) {
                const current = board[x][y];

                if (!current) {
                    result += "<td></td>"
                } else {
                    const split = board[x][y].split(":");
                    result += `<td class=${split[1]} title="Move ${split[0]}">${split[1].length === 1 ? split[1][0] : split[0]}</td>`;
                }
            }
        }

        return result;
    }

    const list = document.getElementById("gameList");
    list.innerHTML = "";

    let i = 0;

    if (res.hasOwnProperty("games")) {
        const games = res.games.slice(0, count - 1);

        for (const game of games) {
            if (checkMultipleProperties(game,
                ["winner", "moves", "player_V", "player_V_name", "player_H", "player_H_name"])) {

                const board = createBoard();

                let index = 1;

                for (const move of game.moves) {
                    if (checkMultipleProperties(move, ["pos_x", "pos_y", "horizontal"])) {
                        const char = index + ":" + (move.horizontal ? "H" : "V");
                        board[move.pos_y][move.pos_x] = char;
                        board[move.pos_y + (move.horizontal ? 0 : 1)][move.pos_x + (move.horizontal ? 1 : 0)] = char + "_2";
                    }

                    index++;
                }

                let result = "<tr>";
                result += `<th scope="row">${++i}</th>`;
                result += `<td><a${game.winner === (await authObj()).kennung ? "" : " href=\"/user/?enemy=" + game.winner + "\""} title="${game.winner}">`;
                result += `${game.winner === game.player_H ? game.player_H_name : game.player_V_name}</a></td>`;
                result += `<td><a${game.player_H === (await authObj()).kennung ? "" : " href=\"/user/?enemy=" + game.player_H + "\""} title${game.player_H}>${game.player_H_name}</a></td>`;
                result += `<td><a${game.player_V === (await authObj()).kennung ? "" : " href=\"/user/?enemy=" + game.player_V + "\""} title="${game.player_V}">${game.player_V_name}</a></td>`;
                result += `<td><table class="board"><tbody>${printBoard(board)}</tbody></table></div></td>`;
                result += "</tr>";

                list.innerHTML += result;
            }
        }

        if (games.length !== res.games.length) {
            list.innerHTML += `<br/><button type="button" class="btn btn-outline-danger" onclick="pageActions()">Mehr Spiele laden</button>`;
        } else if (!games.length) {
            document.getElementById("userTable").innerHTML =
                "<br/><h3>Es konnten keine Spiele gefunden werden :(</h3>"
        }
    }
}
