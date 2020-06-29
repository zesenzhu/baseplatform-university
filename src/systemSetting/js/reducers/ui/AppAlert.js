import UpUIState from '../../action/UpUIState';
const AppAlert = (state = { appAlert: false,title: '', type: 0 }, action) => {
    switch (action.type) {
        case UpUIState.SHOW_ERROR_ALERT:
            return { appAlert: true, title: action.msg.title, type: action.msg.type, onOk: action.msg.ok, onCancel: action.msg.cancel, onClose: action.msg.close,onHide:action.msg.onHide };
            break;
        case UpUIState.CLOSE_ERROR_ALERT:
            return { ...state, appAlert: false };
            break;
        default:
            return state;
    }
};
export default AppAlert