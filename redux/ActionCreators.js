// Our object of action creators
import {ActionTypes} from "./Types";

export const actions = {
    loadCustomerName: (fullname)=>({
        type: ActionTypes.LOAD_NAME,
        payload:{
            fullname: fullname
        }
    }),

    loadApplications: (apps)=>({
        type: ActionTypes.LOAD_APP,
        payload: {
            apps: apps
        }
    }),

    removeApplication: (id)=>({
        type: ActionTypes.DELETE_APP,
        payload: {
            id: id
        }
    }),

}
