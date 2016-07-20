
require.config({
    paths: {
        "$hide": "./AutoContentHide",
    }
});
require(['$hide'], function(hide){
    var hide1 = new hide({
        'LIMIT_PAR_LEN_MIN':1,
        'LIMIT_PAR_LEN_MAX':5,
        'LIMIT_PROPORTION':0.5,
        'LIMIT_PAR':2,
        'BREAK':true,
        'BUTTON_CONTENT':"SHOW 1",
    });
    var hide2 = new hide({
        'LIMIT_PAR_LEN_MIN':5,
        'LIMIT_PAR_LEN_MAX':5,
        'LIMIT_PROPORTION':0,
        'LIMIT_PAR':2,
        'BREAK':false,
        'BUTTON_CONTENT':"SHOW 2",
    });
    hide1.AutoHide('hide');
    hide2.AutoHide('hide2');

})
