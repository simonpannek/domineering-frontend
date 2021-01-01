let count = 1;

async function pageActions() {
    const against = new URLSearchParams(window.location.search).get("enemy");

    if (against) {
        const againstInfo = await competitorInfo(against);

        if (againstInfo !== null) {
            const enemy = document.getElementById("enemy");

            enemy.innerText = againstInfo.name;
            enemy.title = againstInfo.tumKennung;

            document.getElementById("group").innerText = againstInfo.groupId;
            document.getElementById("score").innerText = againstInfo.score;
        }

        count += 5;

        boardInfoTwoPlayer(count, against).then(printGamelist);
    }
}
