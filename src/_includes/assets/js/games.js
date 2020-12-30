let count = 1;

async function pageActions() {
    count += 5;

    boardInfoOwnGames(count).then(printGamelist);
}
