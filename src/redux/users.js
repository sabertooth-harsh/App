import { block } from 'react-native-reanimated';
import * as actionTypes from './actionTypes';

const userInfo = {
    id: null,
    name: '',
    email: '',
    otp: '',
    phno: '',
    address: '',
    image: ''
};

export const userReducer = (state = { user: userInfo, randomUser: userInfo }, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                ...state,
                user: action.payload,
                randomUser: state.randomUser
            };

        case actionTypes.ADD_RANDOM_USER:
            return {
                ...state,
                user: state.user,
                randomUser: action.payload
            };
        default:
            return state;
    }
}