module("baidu.paramCheck");

test("参数为空或不合法时直接返回 id", function(){
    var mm;

    (function(){
        try{baidu.paramCheck("","test"); mm=true}
        catch(ex){mm=false}
        ok(mm, "undefined 未传参数")
    })();

    (function(){
        try{baidu.paramCheck("function(,.+)?","test"); mm=true}
        catch(ex){mm=false}
        ok(mm, "function 参数")
    })(function(){});

    (function(){
        try{baidu.paramCheck("function(,.+)?","test"); mm=true}
        catch(ex){mm=false}
        ok(mm, "function参数, Object")
    })(function(){}, []);
    
});

