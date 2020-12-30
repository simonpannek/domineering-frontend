let count = 1;

async function pageActions() {
    count += 5;

    count += 10;

    boardInfoOwnGames(count).then(printGamelist);
}
