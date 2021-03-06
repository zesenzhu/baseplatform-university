import UpUIState from '../../actions/UpUIState';

const defaultState = {

    appAlert: false,

    title: '',

    type:0,

    littleTitle:'',

    onOk:'',

    onHide:'',

    onCancel:'',

    onClose:'',

    okShow:'y',

    cancelShow:'n',

    okTitle:'',

    cancelTitle:''

};

const AppAlert = (state = defaultState, actions) => {
    switch (actions.type) {

        case UpUIState.SHOW_ERROR_ALERT:

            return { appAlert: true, title: actions.msg.title,littleTitle: actions.msg.littleTitle,type: actions.msg.type, onOk: actions.msg.ok, onCancel: actions.msg.cancel, onClose: actions.msg.close ,onHide:actions.msg.onHide,okShow:actions.msg.okShow?actions.msg.okShow:state.okShow,cancelShow:actions.msg.cancelShow?actions.msg.cancelShow:state.cancelShow,okTitle:actions.msg.okTitle,cancelTitle:actions.msg.cancelTitle};

        case UpUIState.CLOSE_ERROR_ALERT:

            return { ...state, appAlert: false };

        default:

            return state;
    }
};

export default AppAlert