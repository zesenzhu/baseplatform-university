import UpDataState from "../../actions/UpDataState";

const CommonData = (
  state = {
    EditMajor: {
      CollegeSelect: {
        value: "",
        title: "",
      },
      ModalVisible: false,
      // MajorData:{
      Collect: {},
      Name: "",
      Id: "",
      EditMajorModalVivsible:false,
      type:'add',
      TisTitle:'专业名称格式不正确',
      TisTitleVisible:false,
      isChange:false,
      StudentLoading:true
      // }
    },
  },
  actions
) => {
  let returnData = { grades: null };
  switch (actions.type) {
    case UpDataState.EDIT_MAJOR_SELECT_CHANGE:
      return Object.assign({}, state, {
        EditMajor: { ...state.EditMajor, ...actions.data },
      });

    default:
      return state;
  }
};

export default CommonData;
