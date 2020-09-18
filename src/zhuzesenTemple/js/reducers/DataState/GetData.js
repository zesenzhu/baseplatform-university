import DataAction from "../../actions/DataAction";
const GetData = (state = {}, actions) => {
  switch (actions.type) {
    // case DataAction.MAIN_GET_ALL_LOG_TO_PAGE:
    //   return Object.assign({}, state, {
    //     LogRecordData: actions.data,
    //   });
    default:
      return state;
  }
};

export default GetData;

