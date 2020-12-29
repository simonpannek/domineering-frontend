const authObj = (function () {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    if (!getCookie("tumKennung") || !getCookie("authenticationToken")) {
        const params = new URLSearchParams(window.location.search);
        const tumKennung = params.get("tumKennung");
        const authenticationToken = params.get("authenticationToken");

        if (!tumKennung || !authenticationToken) {
            return {
                kennung: "Not logged in",
                token: undefined
            }
        }

        request("authenticateUser", {
            tumKennung: tumKennung,
            authenticationToken: authenticationToken
        });

        setCookie("tumKennung", tumKennung, 30);
        setCookie("authenticationToken", authenticationToken, 30);
    }

    return {
        kennung: getCookie("tumKennung"),
        token: getCookie("authenticationToken")
    };
})();

function logout() {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    location.href = "/";
}

async function request(method = "", parameters = {}) {
    const url = "/.netlify/functions/api-request/" + method;

    const url_param = Object.keys(parameters).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(parameters[k])
    }).join('&');

    const response = await fetch(url + "?" + url_param, {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    }).then(res => {
        return response.json();
    }).catch(err => {
        return {};
    });

    return response;
}

(function () {
    document.getElementById("account").innerText = authObj.kennung;
})();
