import cookie from "cookie";

export default function parseCookies(req){
    if (req){
        var ckie = req.headers.cookie ? req.headers.cookie : "";
        return cookie.parse(ckie);
    }

    // Default
    var ckie = document.cookie ? document.cookie : "";
    return cookie.parse(ckie);
};