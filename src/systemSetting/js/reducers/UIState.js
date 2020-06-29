import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import EditModalTipsVisible from './ui/EditModalTipsVisible';
import AppModal from './ui/AppModal';
import AppTips from './ui/AppTips';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    EditModalTipsVisible,
    AppModal,
    AppTips
});

export default UIState;


