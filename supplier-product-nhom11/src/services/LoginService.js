import axios from "axios";
import { API_SIGN_IN, API_SIGN_OUT } from "../redux/constants/api";

function LoginService() {}

LoginService.prototype = {
    login(user) {
        console.log(API_SIGN_IN);
        return axios.post(API_SIGN_IN, user, { withCredentials: true }).then((resp) => {
            const accessToken = resp.data;
            if (accessToken) {
                sessionStorage.setItem("accessToken", accessToken);
                axios.interceptors.request.use(function (config) {
                    const token = `Bearer ${accessToken}`;
                    config.headers.Authorization = token;
                    return config;
                });
            }
            return resp;
        });
    },
    logout() {
        return axios.post(API_SIGN_OUT, {}, { withCredentials: true });
    },
};

export default new LoginService();
