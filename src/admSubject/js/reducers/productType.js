const PRODUCT_TYPE_CHANGE = 'PRODUCT_TYPE_CHANGE';


const defaultState = 0;

export const productTypeChange = (payLoad) =>{

  return {type:PRODUCT_TYPE_CHANGE,data:payLoad};

};


const productType = (state=defaultState,actions) =>{

  switch (actions.type) {

      case PRODUCT_TYPE_CHANGE:

          return actions.data;

      default:

          return state;

  }

};

export default productType;