import {API_BASE_URL, ACCESS_TOKEN, USER_LIST_SIZE} from "../constants";

const request = (options: any) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers};
    // const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

const multipartRequest = (options: any) => {
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );

}


export function login(loginRequest: any) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest: any) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username: any) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email: any) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getAllUsers(page: number, size: number) {
    page = page || 0;
    size = size || USER_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserProfile(username: string) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    })
}

export function uploadSingleFile(file: any) {
    return multipartRequest({
        url: API_BASE_URL + "/uploadFile",
        method: 'POST',
        body: file
    });

}