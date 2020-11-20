import * as actionTypes from './actionTypes';

export const add_user = (id, name, email, otp, phno, address, image) => dispatch => {
    const user = {
        id: id,
        name: name,
        email: email,
        otp: otp,
        phno: phno,
        address: address,
        image: image
    }
    return dispatch(post_user(user));
}

export const post_user = (user) => ({
    type: actionTypes.ADD_USER,
    payload: user
});

export const add_random_user = (id, name, email, otp, phno, address, image) => dispatch => {
    const user = {
        id: id,
        name: name,
        email: email,
        otp: otp,
        phno: phno,
        address: address,
        image: image
    }
    return dispatch(post_random_user(user));
}

export const post_random_user = (user) => ({
    type: actionTypes.ADD_RANDOM_USER,
    payload: user
});
