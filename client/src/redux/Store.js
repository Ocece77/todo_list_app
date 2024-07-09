import { configureStore , combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userSlice';
import taskReducer from './taskSlice'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  task : taskReducer 
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), //prevention des erreur
});

export const persistor = persistStore(store);