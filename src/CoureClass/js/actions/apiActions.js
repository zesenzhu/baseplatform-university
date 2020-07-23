import Config from '../../../common/js/config';

import {getGetData,getPostData,showErrorAlert}  from './utils';




//获取教学班总览信息，可选择按学科管理或按学院管理
export const GetCouseclassSumarry_University = async ({schoolID,userID,userType,type,dispatch}) =>{

    const res = await getGetData(`/GetCouseclassSumarry_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&type=${type}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取单个学院或学科的教学班总览信息
export const GetCouseclassSumarryOne_University = async ({schoolID,objectID,type,dispatch}) =>{

    const res = await getGetData(`/GetCouseclassSumarryOne_University?schoolID=${schoolID}&objectID=${objectID}&type=${type}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//分页获取教学班信息
export const GetCourseClassInfo_University = async ({schoolID,courseNO,key='',pageIndex=1,pageSize=10,dispatch}) =>{

    const res = await getGetData(`/GetCourseClassInfo_University?schoolID=${schoolID}&courseNO=${courseNO}&pageIndex=${pageIndex}&pageSize=${pageSize}&key=${key}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取学校所有年级信息
export const GetGradeInfo_University = async ({schoolID,dispatch}) =>{

    const res = await getGetData(`/GetGradeInfo_University?schoolID=${schoolID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取学校所有年级信息
export const GetRequiredCourse_University = async ({schoolID,userType,userID,userClass,dispatch}) =>{

    const res = await getGetData(`/GetRequiredCourse_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&userClass=${userClass}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//根据课程ID获取任课教师信息
export const GetTeacherInfo_University = async ({schoolID,courseNO,dispatch}) =>{

    const res = await getGetData(`/GetTeacherInfo_University?schoolID=${schoolID}&courseNO=${courseNO}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取所有学院、专业信息

export const GetMajorInfo_University = async ({schoolID,dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetMajorInfo_University?schoolID=${schoolID}`,2,Config.SubjectManageProxy_univ);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取所有行政班信息

export const GetClassInfo_University = async ({schoolID,collegeID='',majorID='',gradeID='',key='',dispatch}) =>{

    const res = await getGetData(`/GetClassInfo_University?schoolID=${schoolID}&collegeID=${collegeID}&majorID=${majorID}&gradeID=${gradeID}&key=${key}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//根据行政班ID获取学生信息

export const GetStudentInfoByClassID_University = async ({schoolID,classID,dispatch}) =>{

    const res = await getGetData(`/GetStudentInfoByClassID_University?schoolID=${schoolID}&classID=${classID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//模糊搜索学生信息

export const GetStudentInfoByKey_University = async ({schoolID,collegeID='',majorID='',gradeID='',key='',dispatch}) =>{

    const res = await getGetData(`/GetStudentInfoByKey_University?schoolID=${schoolID}&collegeID=${collegeID}&majorID=${majorID}&gradeID=${gradeID}&key=${key}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取教学班详情

export const GetCourseClassDetail_University = async ({courseClassID='',dispatch}) =>{

    const res = await getGetData(`/GetCourseClassDetail_University?courseClassID=${courseClassID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取教师端个人所教的课程

export const GetCourseInfoByUserID_University = async ({schoolID='',userID='',dispatch}) =>{

    const res = await getGetData(`/GetCourseInfoByUserID_University?schoolID=${schoolID}&userID=${userID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};




//新版本教学班


//获取全部学科、课程、学院、年级信息

export const GetAllTeachInfo_university = async ({schoolID='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetAllTeachInfo_university?schoolID=${schoolID}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//分页获取教学班信息（大学版）
export const GetCourseClassInfoForPage_University = async ({schoolID='',subjectID='',courseNO='',collegeID='',gradeID='',key='',pageIndex='',pageSize='',userID='',userType='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCourseClassInfoForPage_University?schoolID=${schoolID}&subjectID=${subjectID}&courseNO=${courseNO}&collegeID=${collegeID}&gradeID=${gradeID}&key=${key}&pageIndex=${pageIndex}&pageSize=${pageSize}&userID=${userID}&userType=${userType}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取学院教学班统计信息
export const GetCollegeCouseclassSumarry_University = async ({schoolID='',userID='',userType='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCollegeCouseclassSumarry_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//分页获取学院教学班统计信息
export const GetCollegeCouseclassSumarryForPage_University = async ({schoolID='',userID='',userType='',pageIndex=1,pageSize=9,dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCollegeCouseclassSumarryForPage_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取学院年级教学班统计信息
export const GetCollegeGradeCouseclassSumarry_University = async ({schoolID='',userID='',userType='',collegeID='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCollegeGradeCouseclassSumarry_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&collegeID=${collegeID}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取课程教学班统计信息
export const GetCouseclassSumarryOfCourse_University = async ({schoolID='',userID='',userType='',subjectID='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCouseclassSumarryOfCourse_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&subjectID=${subjectID}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//分页获取课程类型下的课程教学班统计信息
export const GetCourseTypeCouseclassSumarryForPage_University = async ({schoolID='',userID='',userType='',subjectID='',courseType='',pageIndex=1,pageSize=9,dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCourseTypeCouseclassSumarryForPage_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&subjectID=${subjectID}&courseType=${courseType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//课程类型教学班统计信息
export const GetCourseTypeCouseclassSumarry_University = async ({schoolID='',userID='',userType='',subjectID='',courseType='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetCourseTypeCouseclassSumarry_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&subjectID=${subjectID}&courseType=${courseType}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取教师教学班统计信息
export const GetTeacherCouseclassSumarry_University = async ({schoolID='',userID='',userType='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetTeacherCouseclassSumarry_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}`,2,Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//分页获取教研室信息

export const GetTeachingRoomForPage_University = async ({schoolID='',userID='',userType='',pageSize=9,pageIndex=1,dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetTeachingRoomForPage_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,2,

        /*Config.NewCourseClass);*/

    'http://192.168.2.202:7300/mock/5f158050d53dee0d30437de6/CourseClass');

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};



//获取教研室教学班统计信息

export const GetTeachingRoomCouseclassSumarry_University = async ({schoolID='',userID='',userType='',teachingRoomID='',dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetTeachingRoomCouseclassSumarry_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&teachingRoomID=${teachingRoomID}`,2, Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};



//分页获取教研室教师教学班信息

export const GetTeachingRoomCouseclassSumarryForPage_University = async ({schoolID='',userID='',userType='',teachingRoomID='',pageIndex=1,pageSize=9,dispatch}) =>{

    const res = await getGetData(`/CourseClass/api/GetTeachingRoomCouseclassSumarryForPage_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&teachingRoomID=${teachingRoomID}&pageIndex=${pageIndex}&pageSize=${pageSize}`,2, Config.NewCourseClass);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};




















//post方法



//删除教学班
export const DeleteCourseClass_University = async ({SchoolID,UserID,UserType,CourseClassIDs,dispatch}) =>{

    const res = await getPostData(`/DeleteCourseClass_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),CourseClassIDs

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//自动生成教学班
export const AhthorCreateCourseClass_University = async ({SchoolID,UserID,UserType,CourseNOs,GradeIDs,Type,dispatch}) =>{

    const res = await getPostData(`/AhthorCreateCourseClass_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),CourseNOs,GradeIDs,Type

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//合班
export const CombineCourseClass_University = async ({SchoolID,UserID,UserType,CourseClassIDs,CourseClassName,TeacherID,dispatch}) =>{

    const res = await getPostData(`/CombineCourseClass_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),CourseClassIDs,CourseClassName,TeacherID

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//添加/编辑教学班
export const InsertOrEditCourseClass_University = async ({SchoolID,UserID,GradeID,UserType,CourseClassID,CourseClassName,TeacherID,CourseNO,ClassIDs,StudentIDs,dispatch}) =>{

    const res = await getPostData(`/InsertOrEditCourseClass_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),GradeID,CourseClassID,CourseClassName,TeacherID,CourseNO,ClassIDs,StudentIDs

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};






