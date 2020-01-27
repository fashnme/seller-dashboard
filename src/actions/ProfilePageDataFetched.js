import sharedVariables from '../variables/shared';
import { PROFILE_LOADING, PROFILE_FAILED, PROFILE_FETCHED } from '../action-types';
import axios from 'axios';

export const profileLoading = () => ({
    type: PROFILE_LOADING,
});

export const profileFailed = (errmess) => ({
    type: PROFILE_FAILED,
    payload: errmess
});

export const profileFetched = (profile) => ({
    type: PROFILE_FETCHED,
    payload: profile
});

export const profilePageDataFetch = () => (dispatch) => {

    dispatch(profileLoading());

    const { headers, baseUrl } = sharedVariables;
    axios.get(`${baseUrl}/seller/get-seller-profile/`, { headers })
        .then(profile => {
            // console.log("axios fetched: ", profile)
            dispatch(profileFetched(profile.data.seller))
        })
        .catch(error => dispatch(profileFailed(error.message)));
}

