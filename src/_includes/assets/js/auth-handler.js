async function request(method = "", parameters = {}) {
    const url = "https://dom.simon.rest/" + method;

    const url_param = Object.keys(parameters).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(parameters[k])
    }).join('&');

    return $.ajax(url + "?" + url_param).catch(err => {
        if (err.status === 400)
            logout();
        return err;
    });
}

const authObj = async () => {
    if (!sessionStorage.getItem("authObj")) {
        function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            const name = cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        if (!getCookie("tumKennung") || !getCookie("authenticationToken")) {
            const params = new URLSearchParams(window.location.search);
            setCookie("tumKennung", params.get("tumKennung"), 30);
            setCookie("authenticationToken", params.get("authenticationToken"), 30);
        }

        const kennung = getCookie("tumKennung");
        const token = getCookie("authenticationToken");

        await request("authenticateUser", {
            tumKennung: kennung,
            authenticationToken: token
        }).then(async () => {
            sessionStorage.setItem("authObj", JSON.stringify({
                kennung: kennung,
                token: token
            }));
        }).catch(logout);
    }

    return JSON.parse(sessionStorage.getItem("authObj"));
};

let infoObj;

function updateFields() {
    if (infoObj !== null) {
        document.getElementById("accountName").innerText = infoObj.name;
        document.getElementById("accountGroup").innerText = "Group: " + infoObj.groupId;
        document.getElementById("accountScore").innerText = "Score: " + infoObj.score;

        document.getElementById("accountLogout").addEventListener("click", logout);
    }
}

function logout() {
    function clearCookie(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    }

    sessionStorage.clear();
    document.cookie.split(";").forEach(clearCookie);

    location.href = "/login/";
}

(async () => {
    if ((await authObj()) !== null) {
        document.getElementById("accountDropdown").innerText = (await authObj()).kennung;
        infoObj = await competitorInfo();

        await pageActions();
        updateFields();
    }
})();
