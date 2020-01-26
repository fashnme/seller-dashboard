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
    axios.get(`${baseUrl}/user/get-user-profile/`, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiUERvNWdtOEJNZ0tZWjFQNFlobFoiLCJpYXQiOjE1Nzg0ODgzODF9.f_0FHHWMZ1Javvvmtl72yO5m_1pICYjggYZA0-ccFQM'
    })
        .then(profile => {
            console.log("axios fetched: ", profile)
            // dispatch(profileFetched(profile.data.user))
        })
        .catch(error => dispatch(profileFailed(error.message)));
}

