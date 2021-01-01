(() => {
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

    if (sessionStorage.getItem("authObj") !== null
        || (getCookie("tumKennung") && getCookie("authenticationToken"))) {
        location.href = "/";
    }

    document.getElementById("loginForm").onsubmit = evt => {
        setCookie("tumKennung", evt.target[0].value, 30);
        setCookie("authenticationToken", evt.target[1].value, 30);
    };
})();
