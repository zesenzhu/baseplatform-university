import * as menuActions from '../actions/menuActions';

const defaultState = {

       list:[

           {

               name:'学科管理',

               menu:'menu10',

               default:false,

               ident:'subject'

           },

           {

                name:'课程管理',

                menu:'menu10',

                ident:'course',

                default:false

            }
    ],

    active:''

};

const menu = (state=defaultState,actions) =>{

    switch (actions.type) {

        case menuActions.LEFT_MENU_CHANE:

            const list = Array.from(state.list);

            if (actions.data === 'subject'){

                list[0].default = true;

                list[1].default = false;

            }else if (actions.data === 'course') {

                list[0].default = false;

                list[1].default = true;

            }

            return { ...state,active:actions.data,list:list};

        default:

            return state;

    }

};

export default menu;