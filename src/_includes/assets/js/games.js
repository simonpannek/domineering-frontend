let count = 1;

async function pageActions() {
    // nextCompetitor().then(res => document.getElementById("next").innerText = res);

    count += 10;

    boardInfoOwnGames(count).then(printGamelist);
}
