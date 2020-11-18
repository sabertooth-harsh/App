import { block } from 'react-native-reanimated';
import * as actionTypes from './actionTypes';

const userInfo = {
    id: null,
    name: '',
    email: '',
    otp: '',
    phno: '',
    address: ''
};

export const userReducer = (state = { user: userInfo }, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}