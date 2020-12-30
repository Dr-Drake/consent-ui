/**
 * The commonReducer function combines multiple reducers into a single function and 
 * asks each of them to handle actions. 
 * 
 * Reducers return new objects when they modify the contents of the data store, which
 * makes it easy to detect when an action has been handled. 
 * 
 * The result is that the SportsStore data store can support multiple reducers where 
 * the first to change the data store is considered to have processed the action. 
 */


export const CommonReducer = (...reducers) => (storeData, action) => {
    for (let i = 0; i < reducers.length; i++ ) {
        let newStore = reducers[i](storeData, action);
        if (newStore !== storeData) {
            return newStore;
        }
    }
    return storeData;
   }