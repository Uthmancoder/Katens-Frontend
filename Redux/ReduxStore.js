import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose a storage method (localStorage, sessionStorage, etc.)
import AllPosts from "./AllPosts";


// combining the reducesr
const rootReducer = combineReducers({
  AllPosts,
})

// creating the persist config
const persistConfig = {
  key : "root",
  storage,
  whitelist : ["AllPosts"] //defining all the reducer's i want to persist
}

// creating a persist Reducer
const PersistReducer = persistReducer(persistConfig, rootReducer)

// creating redux Store
const Store = configureStore({
  reducer : PersistReducer
})

// Create a persistor object for persisting and rehydrating the Redux store
const persistor = persistStore(Store)


export default {Store, persistor}

