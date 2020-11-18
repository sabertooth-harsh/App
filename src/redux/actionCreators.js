import * as actionTypes from './actionTypes';

export const add_user = (id, name, email, otp, phno, address) => dispatch => {
    const user = {
        id: id,
        name: name,
        email: email,
        otp: otp,
        phno: phno,
        address: address
    }
    return dispatch(post_user(user));
}

export const post_user = (user) => ({
    type: actionTypes.ADD_USER,
    payload: user
});