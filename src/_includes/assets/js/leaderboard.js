async function pageActions() {
    groupInfo().then(res => {
        let result = "";

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
                if (competitor.hasOwnProperty("tumKennung")
                    && competitor.hasOwnProperty("name")
                    && competitor.hasOwnProperty("score")) {
                    result += "<tr>";
                    result += `<th scope="row">${lastScore === competitor.score ? "" : ++rank}</th>`;
                    result += `<td><a href="/user/${competitor.tumKennung}">${competitor.tumKennung}</a></td>`;
                    result += `<td><a href="/user/${competitor.tumKennung}">${competitor.name}</a></td>`;
                    result += `<td>${competitor.score}</td>`;
                    result += "</a>";
                    result += "</tr>";

                    lastScore = competitor.score;
                }
            }
        }

        document.getElementById("leaderboard").innerHTML = result;
    });
}
