import { getData, postData } from '../../../../common/js/fetch'
import CONFIG from '../../../../common/js/config'
const  Api =CONFIG.SysSettingProxy
const Api2 =CONFIG.tempSubsystemProxy



const getMethod = async (url, level = 2) => {

    try {

        let fetchAsync = '';
        try {
            /*fetchAsync = await getData(CONFIG.proxy+url);*/

            fetchAsync = await getData(Api + url, level,"cors",false,false);
            // fetchAsync = await getData(Api + url, level);
        }
        catch (e) {
            return e;
        }

        let json = await fetchAsync.json();

        return json;

    } catch (e) {

        return e;

    }

}
const getMethodUniv = async (url, level = 2) => {

    try {
        // console.log(level)
        let fetchAsync = '';
        try {
            /*fetchAsync = await getData(CONFIG.proxy+url);*/

            fetchAsync = await getData( url, level,"cors",false,false);
            // fetchAsync = await getData(Api + url, level);
        }
        catch (e) {
            return e;
        }

        let json = await fetchAsync.json();

        return json;

    } catch (e) {

        return e;

    }

}
// const tempGetMethod = async (url) => {

//     try {

//         let fetchAsync = '';
//         try {
//             /*fetchAsync = await getData(CONFIG.proxy+url);*/

//             fetchAsync = await getData(Api2+url);
//         }
//         catch (e) {
//             return e;
//         }

//         let json = await fetchAsync.json();

//         return json;

//     } catch (e) {

//         return e;

//     }

// }




const postMethod = async (url, params, level = 2) => {
    try {
        let fetchAsync = '';
        try {
            /*fetchAsync = await getData(CONFIG.proxy+url);*/

            fetchAsync = await postData(Api + url, params, level,"urlencoded",false,false);
            // fetchAsync = await postData(Api + url, params, level);

        }
        catch (e) {
            
        }

        let json = await fetchAsync.json();

        if (json.StatusCode === 200) {

            return json.ErrCode;

        } else {

            return json.Msg

        }

    }
    catch (e) {
        return e;
    }
}
const postMethodUniv = async (url, params, level = 2) => {
    try {
        let fetchAsync = '';
        try {
            /*fetchAsync = await getData(CONFIG.proxy+url);*/

            fetchAsync = await postData(  url, params, level,"urlencoded",false,false);
            // fetchAsync = await postData(Api + url, params, level);

        }
        catch (e) {
            
        }

        let json = await fetchAsync.json();

        if (json.StatusCode === 200) {

            return json;

        } else {

            return json

        }

    }
    catch (e) {
        return e;
    }
}
export default {

    getMethod,

    postMethod,
    getMethodUniv,
    postMethodUniv
    // tempGetMethod

}