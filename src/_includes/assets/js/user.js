let count = 1;

async function pageActions() {
    const against = new URLSearchParams(window.location.search).get("enemy");

    if (against) {
        document.getElementById("enemy").innerText = against;

        count += 5;

        boardInfoTwoPlayer(count, against).then(printGamelist);
    }
}
