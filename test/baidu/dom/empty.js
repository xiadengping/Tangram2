module("baidu.dom.empty");
stop();

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

waiting(function(){ return baidu.query; }, function(){

	var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.top = "-1000px";

	document.documentElement.appendChild(div);

	test("empty div", function(){
	    div.innerHTML = "<div class='A'>hello<div class='A'>world</div></div>";

	    var a = baidu.dom("div.A");

	    a.empty();

	    equal( a[0].innerHTML, "", "a[0].innerHTML" );
	    equal( a[1].innerHTML, "", "a[1].innerHTML" );

	    var b = baidu.dom("div.A");

	    equal( b.length, 1, "div.A length" );
	});


	// 老接口
	test('innerHTML is blank', function(){
		var div = document.createElement('div');
		var a = document.createElement('a');
		document.body.appendChild(div);
		document.body.appendChild(a);
		a.innerHTML = "test_a";            //son of a
		var img = document.createElement('img')//son of div
		div.appendChild(img);
		var txt=document.createTextNode("textNode");//son of p
		var p=document.createElement('p');
		document.body.appendChild(p);
		p.appendChild(txt);	
		
		baidu.dom.empty(div);
		baidu.dom.empty(p);
		baidu.dom.empty(a);

		ok(div.childNodes.length==0,"div is empty;");
		ok(p.childNodes.length==0,"p is empty");
		ok(a.childNodes.length==0,"a is empty");
		document.body.removeChild(div);
		document.body.removeChild(a);
		document.body.removeChild(p);
	});

	start();
})

ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback