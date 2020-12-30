let authObj;
(async () => {
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

    return await request("authenticateUser", {
        tumKennung: kennung,
        authenticationToken: token
    }).then(res => {
        if (!res.hasOwnProperty("error")) {
            authObj = {
                kennung: kennung,
                token: token
            };

            document.getElementById("account").innerText = kennung;
            pageActions();
        } else {
            document.cookie.split(";").forEach(clearCookie);
            if (res.error === "auth failed") {
                alert("Please open this site using your custom link to login!");
            } else {
                alert("An unknown error occured, if you do not know what's wrong contact someone on Zulip.")
            }
        }
    });
})();

async function request(method = "", parameters = {}) {
    const url = "https://dom.simon.rest/" + method;

    const url_param = Object.keys(parameters).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(parameters[k])
    }).join('&');

    return $.ajax({
        url: url + "?" + url_param,
        success: res => {
            return res;
        }
    }).catch(err => {
        if (err.status === 400) {
            return {
                error: "auth failed"
            }
        }
        return {};
    });
}

function clearCookie(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
}

function logout() {
    document.cookie.split(";").forEach(clearCookie);
    location.href = "/";
}
