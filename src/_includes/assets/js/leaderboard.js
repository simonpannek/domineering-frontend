async function pageActions() {
    groupInfo().then(res => {
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
}
