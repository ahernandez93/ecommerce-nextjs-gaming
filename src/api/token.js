import { ENV } from "@/lib/constants";
import { jwtDecode } from "jwt-decode";

export class Token {
    setToken(token) {
        localStorage.setItem(ENV.STORAGE_KEYS.TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(ENV.STORAGE_KEYS.TOKEN);
    }

    removeToken() {
        localStorage.removeItem(ENV.STORAGE_KEYS.TOKEN);
    }

    hasExpired(token) {
        const tokenDecode = jwtDecode(token);
        const expireDate = tokenDecode.exp * 1000;
        const currentDate = new Date().getTime();

        if (currentDate > expireDate) {
            return true;
        }
        return false;
    }
}
