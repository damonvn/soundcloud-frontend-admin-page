//====== Redux toolkit basic ======//

import { configureStore, createSlice } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';

// Create a Redux store using configureStore and include the counter slice
const store = configureStore({
   reducer: {
      account: accountSlice,
   },
});

export default store;


//====== Redux toolkit with redux-persist/lib/storage ======//

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import {
//    persistStore,
//    persistReducer,
//    FLUSH,
//    REHYDRATE,
//    PAUSE,
//    PERSIST,
//    PURGE,
//    REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import accountReducer from '../redux/account/accountSlice';

// const persistConfig = {
//    key: 'root',
//    version: 1,
//    storage,
//    blacklist: ['account'], // navigation will not be persisted
// };

// const rootReducer = combineReducers({
//    account: accountReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//    reducer: persistedReducer,
//    middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//          serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//          },
//       }),
// });

// const persistor = persistStore(store);
// export { persistor, store };
