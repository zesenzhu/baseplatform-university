import UpDataState from "../../actions/UpDataState";

const SetTeacherMsg = (
  state = { initTeacherMsg: {}, changeTeacherMsg: {} },
  actions
) => {
  switch (actions.type) {
    case UpDataState.SET_INIT_TEACHER_MSG:
      return Object.assign({}, state, {
        initTeacherMsg: actions.data,
        changeTeacherMsg: actions.data
      });
    case UpDataState.SET_TEACHER_MSG:
      let changeTeacherMsg = Object.assign({}, state.changeTeacherMsg, {
        ...actions.data
      });
      return Object.assign({}, state, { changeTeacherMsg: changeTeacherMsg });

    default:
      return state;
  }
};

export default SetTeacherMsg;
