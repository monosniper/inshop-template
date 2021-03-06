import axios from 'axios';

export const SERVER_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL;
export const API_URL = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + '/api/';

const $server = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL
})

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

const $api_form = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {"Content-Type": "multipart/form-data"}
})

const $server_form = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
    headers: {"Content-Type": "multipart/form-data"}
})

const $api_sanctum = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api_sanctum.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.getItem('api_token')}`;
    return config;
});


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api_form.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            await $api.request(originalRequest);
        } catch (e) {
            console.log('Not auth');
        }
    }

    throw err;
});

export {
    $api,
    $server,
    $api_form,
    $server_form,
    $api_sanctum,
};
