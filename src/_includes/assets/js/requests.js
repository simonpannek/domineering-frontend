async function groupInfo(groupId = 1) {
    return await request("getGroupInfo", {
        tumKennung: (await authObj()).kennung,
        authenticationToken: (await authObj()).token,
        groupId: groupId
    });
}

async function competitorInfo(competitor) {
    if (competitor === undefined) {
        competitor = (await authObj()).kennung;
    }

    return await request("getCompetitorInfo", {
        tumKennung: (await authObj()).kennung,
        authenticationToken: (await authObj()).token,
        competitor: competitor
    });
}

async function boardInfoOwnGames(numPlaygrounds = 20) {
    return await request("getBoardInfoForOwnGames", {
        tumKennung: (await authObj()).kennung,
        authenticationToken: (await authObj()).token,
        numPlaygrounds: numPlaygrounds
    });
}

async function boardInfoTwoPlayer(numPlaygrounds = 20, againstKennung = "") {
    return await request("getBoardInfoForTwoPlayer", {
        tumKennung: (await authObj()).kennung,
        authenticationToken: (await authObj()).token,
        numPlaygrounds: numPlaygrounds,
        againstCompetitor: againstKennung
    });
}

async function maxGroup() {
    return await request("getMaxGroup", {
        tumKennung: (await authObj()).kennung,
        authenticationToken: (await authObj()).token
    });
}
