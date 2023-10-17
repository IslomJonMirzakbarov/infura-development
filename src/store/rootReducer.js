import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { alertReducer } from './alert/alert.slice';

import storage from 'redux-persist/lib/storage';
import { themeReducer } from './theme/theme.slice';
import { popupReducer } from './popup/popup.slice';
import { authReducer } from './auth/auth.slice';
import { userReducer } from './user/user.slice';

const authPersistConfig = {
  key: 'auth',
  storage
};

const themePersistConfig = {
  key: 'theme',
  storage
};

const popupPersistConfig = {
  key: 'popup',
  storage
};

const userPersistConfig = {
  key: 'user',
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  alert: alertReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
  popup: persistReducer(popupPersistConfig, popupReducer),
  user: persistReducer(userPersistConfig, userReducer)
});

export default rootReducer;
