import { types } from "./types";


export const authReducer = ( state = {}, action ) => {


    switch ( action.type ) {

        case types.login:
            return {
                ...state,
                user: action.payload
            };

        case types.logout:
            return {
                user: action.payload,
            };
    
        default:
            return state;
    }

}