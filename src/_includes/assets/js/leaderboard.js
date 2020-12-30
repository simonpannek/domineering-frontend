let running = 0;

const group = async num => {
    const value = parseInt(num);
    if (!isNaN(value) && value >= 1 && value <= (await max()))
        sessionStorage.setItem("group", num);
    else if (!sessionStorage.getItem("group"))
        sessionStorage.setItem("group", (await competitorInfo()).groupId);

    const current = sessionStorage.getItem("group");
    document.getElementById("group").value = current;
    return current;
};

const max = async () => {
    if (!sessionStorage.getItem("max"))
        sessionStorage.setItem("max", await maxGroup());

    const current = sessionStorage.getItem("max");
    document.getElementById("group").max = current;
    document.getElementById("max").innerText = current;
    return current;
}

async function pageActions() {
    groupInfo((await group())).then(res => {
        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";

        if (res.hasOwnProperty("competitorInfos")) {
            res.competitorInfos.sort((o1, o2) => {
                if (!o1.hasOwnProperty("score") || !o2.hasOwnProperty("score")) {
                    return 0;
                }

                return o2.score - o1.score;
            });

            let rank = 0;
            let lastScore = -1;

            for (const competitor of res.competitorInfos) {
                if (checkMultipleProperties(competitor, ["tumKennung", "name", "score"])) {
                    let result = "<tr>";
                    result += `<th scope="row">${lastScore === competitor.score ? "" : ++rank}</th>`;
                    result += `<td><a${competitor.tumKennung === authObj().kennung ? "" : " href=\"/user/?enemy=" + competitor.tumKennung + "\""} title="${competitor.tumKennung}">${competitor.name}</a></td>`;
                    result += `<td>${competitor.score}</td>`;
                    result += "</tr>";

                    leaderboard.innerHTML += result;

                    lastScore = competitor.score;
                }
            }
        }
    });

    await max();
}

document.getElementById("group").addEventListener("change", async event => {
    running++;
    setTimeout(async () => {
        running--;

        const value = event.target.value;

        // noinspection EqualityComparisonWithCoercionJS
        if (running === 0 && (await group().catch(ignored => 0)) != value) {
            await group(value);
            await pageActions();
        }
    }, 500);
});
