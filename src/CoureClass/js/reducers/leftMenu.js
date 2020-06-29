const LEFT_MENU_INIT = 'LEFT_MENU_INIT';

export const menuRouterInit = (menu) =>{

    return {type:LEFT_MENU_INIT,data:menu};

};


const defaultState = [



];

const leftMenu = (state=defaultState,actions) =>{

  switch (actions.type) {

      case LEFT_MENU_INIT:

          return actions.data;

      default:

          return state;

  }

};

export default leftMenu;