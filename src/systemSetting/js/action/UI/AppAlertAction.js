const SUBSYSTEM_ALERT_SHOW = "SUBSYSTEM_ALERT_SHOW" //访问提示框显示
const SUBSYSTEM_ALERT_HIDE = "SUBSYSTEM_ALERT_HIDE" //访问提示框关闭

const alertQuery = ({ title, ok, cancel, close, okTitle, cancelTitle }) => {

    return dispatch => {


        dispatch({
            type: SUBSYSTEM_ALERT_SHOW,
            data: {
                type: "btn-query",
                title: title,
                ok: (ok ? ok() : closeAlert(dispatch)),
                cancel: (cancel ? cancel() : closeAlert(dispatch)),
                close: (close ? close() : closeAlert(dispatch)),
                okTitle: (okTitle ? okTitle : "确认"),
                cancelTitle: (cancelTitle ? cancelTitle : "取消")

            }

        })

    }
}

const alertTips = ({type= "btn-tips", title, ok, cancel, close, okTitle, cancelTitle }) => {

    return dispatch => {
        dispatch({
            type: SUBSYSTEM_ALERT_SHOW,
            data: {
                type: type,
                title: title,
                ok: (ok ? ok() : closeAlert(dispatch)),
                cancel: (cancel ? cancel() : closeAlert(dispatch)),
                close: (close ? close() : closeAlert(dispatch)),
                okTitle: (okTitle ? okTitle : "确认"),
                cancelTitle: (cancelTitle ? cancelTitle : "取消")
            }
        })
    }
}
const alertError = ({ type= "btn-error",title, ok, cancel, close, okTitle, cancelTitle,cancelShow='y' }) => {

    return dispatch => {
        dispatch({
            type: SUBSYSTEM_ALERT_SHOW,
            data: {
                type: type,
                title: title,
                ok: (ok ? ok() : closeAlert(dispatch)),
                cancel: (cancel ? cancel() : closeAlert(dispatch)),
                close: (close ? close() : closeAlert(dispatch)),
                okTitle: (okTitle ? okTitle : "确认"),
                cancelTitle: (cancelTitle ? cancelTitle : "取消"),
                cancelShow
            }
        })
    }
}
const alertSuccess = ({ type='success',title }) => {

    return dispatch => {
        dispatch({
            type: SUBSYSTEM_ALERT_SHOW,
            data: {
                type: type,
                title: title,
                // ok: (ok ? ok() : closeAlert(dispatch)),
                // cancel: (cancel ? cancel() : closeAlert(dispatch)),
                // close: (close ? close() : closeAlert(dispatch)),
                // okTitle: (okTitle ? okTitle : "确认"),
                // cancelTitle: (cancelTitle ? cancelTitle : "取消")
                hide:closeAlert(dispatch)
            }
        })
    }
}

const closeAlert = (dispatch) => {
    return () => {
        dispatch({
            type: SUBSYSTEM_ALERT_HIDE
        })
    }
}


export default {
    SUBSYSTEM_ALERT_SHOW,
    SUBSYSTEM_ALERT_HIDE,
    alertQuery,
    alertError,
    alertTips,
    closeAlert,
    alertSuccess
    
}