import { authHeader } from '../helpers';
import axios from 'axios';
import { history } from '../helpers';

export const userService = {
    login,
    logout,
    getAll,
    getById
};

function login(username, password) {
    debugger
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    axios.get('https://swapi.co/api/people', {
        params: {
            search: username
        }
    })
        .then(response => {
            debugger
            // if (!response.ok) {
            //     return Promise.reject(response.statusText);
            // }

            return response;
        })
        .then(user => {
            debugger
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            history.push('/home');
            //return user;
        });
    //  .then(function (response) {
    //     debugger
    //     if (response.data.results[0].name === username)
    //         if (response.data.results[0].birth_year === password)
    //             localStorage.setItem('user', JSON.stringify(response.data.results[0]));
    //     return
    // })
    //     .catch(function (error) {
    //         debugger
    //         console.log(error);
    //     });
    // return fetch('https://swapi.co/api/people?search={0}', requestOptions)
    //     .then(response => {
    //         if (!response.ok) { 
    //             return Promise.reject(response.statusText);
    //         }

    //         return response.json();
    //     })
    //     .then(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user && user.token) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //         }

    //         return user;
    //     });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}