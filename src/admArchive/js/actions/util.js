import CommonAction from "./CommonAction";
const checkTelphone = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^([0-9\/-]){1,40}$/.test(value);
    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ TelephoneTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ TelephoneTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkEmail = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = false;
    if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(value)) {
      Test = false;
    } else {
      Test = /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(
        value
      );
    }
    if (Test || !value) {
      dispatch(CommonAction.SetTipsVisibleParams({ EmailTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ EmailTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkHomeAddress = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[A-Za-z0-9_()\u4e00-\u9fa5-]{0,100}$/.test(value);
    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ HomeAddressTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ HomeAddressTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkGraduateContact = ({
  //   Telephone,
  //   Email,
  //   HomeAddress,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: {
          GraduateEditParams: { Telephone, Email, HomeAddress },
        },
      },
    } = getState();
    let TelephoneError = false;
    let EmailError = false;
    let HomeAddressError = false;
    dispatch(
      checkTelphone({
        value: Telephone,
        error: () => {
          TelephoneError = true;
        },
      })
    );
    dispatch(
      checkEmail({
        value: Email,
        error: () => {
          EmailError = true;
        },
      })
    );
    dispatch(
      checkHomeAddress({
        value: HomeAddress,
        error: () => {
          HomeAddressError = true;
        },
      })
    );

    if (TelephoneError || EmailError || HomeAddressError) {
      error();
    } else {
      success();
    }
    fn();
  };
};
const checkDiscription = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[?？+-=\.\\/\*()（）A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(
      value
    );
    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ DiscriptionTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ DiscriptionTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkUserID = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^([a-zA-Z0-9]{1,24})$/.test(value);
    if (Test) {
      dispatch(CommonAction.SetTipsVisibleParams({ UserIDTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ UserIDTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkUserName = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(
      value
    );
    if (Test) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ UserNameTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ UserNameTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkGender = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ GenderTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ GenderTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkCollege = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ CollegeTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ CollegeTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkGroup = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ GroupTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ GroupTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
export default {
  checkGroup,
  checkCollege,
  checkGender,
  checkUserName,
  checkUserID,
  checkDiscription,
  checkTelphone,
  checkEmail,
  checkHomeAddress,
  checkGraduateContact,
};
