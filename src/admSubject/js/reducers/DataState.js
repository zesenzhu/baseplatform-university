import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import SubjectMsg from './data/SubjectMsg';
import TeacherMsg from './data/TeacherMsg';
import ChangeSubjectMsg from './data/ChangeSubjectMsg';
import SetSubjectTeacherMsg from './data/SetSubjectTeacherMsg';

const DataState=combineReducers(
    {
        LoginUser,
        SubjectMsg,
        TeacherMsg,
        ChangeSubjectMsg,
        SetSubjectTeacherMsg
    });
export default DataState;