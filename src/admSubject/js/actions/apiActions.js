import {getGetData,getPostData,showErrorAlert}  from './utils';

//获取所有学科信息，可搜索，可按学科编号进行排序,可分页
export const GetSubjectInfo_University = async ({schoolID,userID,userType,key='',pageSize=0,pageIndex=1,orderType="",dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetSubjectInfo_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&pageIndex=${pageIndex}&pageSize=${pageSize}&orderType=${orderType}&key=${key}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取可添加的学科信息

export const GetSubjectInfoValid_University = async ({schoolID,dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetSubjectInfoValid_University?schoolID=${schoolID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取可添加的学科信息

export const GetTeacherInfoBySubjectAndKey = async ({schoolID,subjectID,key='',dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetTeacherInfoBySubjectAndKey?schoolID=${schoolID}&subjectID=${subjectID}&key=${key}`,2,);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//分页获取课程信息

export const GetCourseInfo_University = async ({schoolID,collegeID='',subjectID='',pageIndex=1,pageSize=10,orderType='',key='',dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetCourseInfo_University?schoolID=${schoolID}&subjectID=${subjectID}&collegeID=${collegeID}&pageIndex=${pageIndex}&pageSize=${pageSize}&orderType=${orderType}&key=${key}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};



//获取所有学院、专业信息

export const GetMajorInfo_University = async ({schoolID,dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetMajorInfo_University?schoolID=${schoolID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取所有学院、专业信息

export const GetBaseInfoForPages = async ({dispatch}) =>{

    const res = await getGetData(`/Global/GetBaseInfoForPages`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};






//post方法

//新增学科
export const AddSubject_University = async ({SchoolID,UserID,UserType,SubjectID,SubjectNumber,SubjectName,dispatch}) =>{

    const res = await getPostData(`/Subject/api/AddSubject_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),SubjectID,SubjectNumber,SubjectName

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//删除学科

export const DeleteSubject＿University = async ({SchoolID,UserID,UserType,SubjectID,SubjectNumber,SubjectName,dispatch}) =>{

    const res = await getPostData(`/Subject/api/DeleteSubject_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),SubjectID,SubjectNumber,SubjectName

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};



//修改学科信息

export const UpdateSubjectInfo_University = async ({SchoolID,UserID,UserType,SubjectID,SubjectNumber,SubjectName,dispatch}) =>{

    const res = await getPostData(`/Subject/api/UpdateSubjectInfo_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),SubjectID,SubjectNumber,SubjectName

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        if (parseInt(res.ErrCode)===-4){

            dispatch(showErrorAlert({title:'学科名称或编号与已有学科重复'}));

        }else{

            dispatch(showErrorAlert({title:res.Msg?res.Msg:'修改学科失败'}));

        }

    }

};




//设置教研组长

export const SetSubjectLeaderUniversity = async ({SchoolID,UserID,UserType,SubjectID='',NewLeaderID,OldLeaderID='',dispatch}) =>{

    const res = await getPostData(`/Subject/api/SetSubjectLeaderUniversity`,{

        SchoolID,UserID,UserType:parseInt(UserType),SubjectID,NewLeaderID,OldLeaderID

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};



//修改添加课程

export const UpdateCourseInfo_University = async ({SchoolID,UserID,UserType,SubjectID,CourseNO='',CourseName,CourseNumber,CollegeID,CourseType,MajorIDs='',CourseCredit='',dispatch}) =>{

    const res = await getPostData(`/Subject/api/UpdateCourseInfo_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),SubjectID,CourseNO,CourseName,CourseNumber,CollegeID,CourseType,MajorIDs,CourseCredit

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//删除课程

export const DeleteCourse_University = async ({SchoolID,UserID,UserType,CourseNO='',dispatch}) =>{

    const res = await getPostData(`/Subject/api/DeleteCourse_University`,{

        SchoolID,UserID,UserType:parseInt(UserType),CourseNO

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};



