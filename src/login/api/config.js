
let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {

        GetBaseInfo:'http://192.168.129.64:20102/mock/5d772752ed0ccd1564c8df0d/login',

        //GetBaseInfo:'http://192.168.129.64:20102',

        Login:'http://192.168.129.64:20102',

        IntroduceModalHtml:'http://192.168.129.64:20102/UserHelp/teacherhelp.html',

        // SystemsMainServer:'http://192.168.129.64:20102/BaseApi/Global/'

        SystemsMainServer:'http://192.168.129.64:20102/BaseApi/Global/'

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