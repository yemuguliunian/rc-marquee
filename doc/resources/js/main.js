require.config({
    waitSeconds:0,
    paths: {
        "jquery": "../lib/jquery.min",
        "config": "./config",
        // 主程序入口
        "app":"../../index"
    },
    shim: {
    　　'jquery':{
            exports: '$'
        },
        'app': ['jquery', 'config']
    }
});

require(['app'], function () {
    
});