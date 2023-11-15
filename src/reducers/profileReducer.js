import { EDIT_PROFILE, FETCH_USER } from "../actions/type";

export const profileReducer = (user = null, action) => {
    switch (action.type) {
        case FETCH_USER:
        return action.payload;

        case EDIT_PROFILE:
        if (!user) {
            return user;
        }
        if (user.id === action.payload.userId) {
            return {
            ...user,
            profilePic: action.payload.profilePic,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name
            };
        }
        return user;

        default:
        return user;
    }
};
