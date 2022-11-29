import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { alertReducer } from './alert/alert.slice';
import { authReducer } from './auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import { themeReducer } from './theme/theme.slice';
import { popupReducer } from './popup/popup.slice';

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

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  alert: alertReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
  popup: persistReducer(popupPersistConfig, popupReducer)
});

export default rootReducer;
