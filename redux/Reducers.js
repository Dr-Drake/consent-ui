// Our reducers
import {ActionTypes} from "./Types";

export const nameReducer = (prevStore, action)=>{
    switch(action.type){
        case ActionTypes.LOAD_NAME:
            return {
                ...prevStore,
                fullname: action.payload.fullname
            }
        default:
            return prevStore || {}
    }
};

export const loadAppReducer = (prevStore, action)=>{
    switch(action.type){
        case ActionTypes.LOAD_APP:
            return{
                ...prevStore,
                apps: action.payload.apps
            }

        default:
            return prevStore || {}
    }
};

export const deleteAppReducer = (prevStore, action)=>{
    switch(action.type){
        case ActionTypes.DELETE_APP:
            return{
                ...prevStore,
                apps: prevStore.apps.filter((app)=>{
                    return app.id !== action.payload.id
                })
            }

        default:
            return prevStore || {}
    }
};
