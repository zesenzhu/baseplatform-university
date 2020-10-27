
let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {

        GetBaseInfo:'http://192.168.2.202:7300/mock/5d772752ed0ccd1564c8df0d/login',

        //GetBaseInfo:'http://172.16.52.123:10102',

        Login:'http://172.16.52.123:10102',

        IntroduceModalHtml:'http://172.16.52.123:10102/UserHelp/teacherhelp.html',

        // SystemsMainServer:'http://172.16.52.123:10102/BaseApi/Global/'

        SystemsMainServer:'http://172.16.52.123:10102/BaseApi/Global/'

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {

        GetBaseInfo:'',

        Login:'',

        IntroduceModalHtml:'/UserHelp/teacherhelp.html',

        SystemsMainServer:'/BaseApi/Global/'

    }

}

export default config;