// 剪切板功能模块
var clipboard = new ClipboardJS('.copy');
clipboard.on('success', function(e) {
    console.log(e);
    $("#tip1").text("已将链接复制到剪切板");
    $("#tip2").text("输入的网址已经成功缩短了");
});
clipboard.on('error', function(e) {
    console.log(e);
    $("#tip1").text("不知道为啥复制失败了");
    $("#tip2").text("你可以手动复制框内的文本");
});
// 通过正则表达式获取链接中的参数
function getQuery(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
}

//api缩短链接
function Api(aaaaa){
    var result;
    $.ajax(
		{
			url:"https://s.labulac.top/api.php",
			type: "Post",
			data:{'url':aaaaa},
			cache:false,
			dataType: 'json',
			crossDomain: true,
			async:false,
			timeout:1000*1000,
			success:function(d)
			{
				result = d;
			},
			error:function(e)
			{
				result = e;
			}
		});
		return result;
}

$("#search-button").click(function() {
    // 获取输入框输入内容
    input_text = $("#search-input").val();
    input_text = input_text.trim();
    
    query_text = encodeURIComponent(input_text);
    longurl=input_text;
    console.log(longurl);
	
	if (longurl==""){$("#tip1").text("没有输入吧！好假！");
        $("#tip2").text("检查一下吧");
}else{
    
    var bbbb=Api(longurl);
    console.log(bbbb);
	
    if (bbbb.code==404) {
        $("#tip1").text("输入有误，检查一下吧，");
        $("#tip2").text("看着咋不像链接呢...");
   }else if(bbbb==""){$("#tip1").text("网络有问题，没获取到");
        $("#tip2").text("NETWORK ERROR");}else if(bbbb.code==200){
	   $("#tip1").text("短链接已经生成ヽ(￣▽￣)ﾉ");
	   $("#tip2").text("点击\"复制短链接\"即可复制到剪切板");
	   $("#link").css("display", "block");}
    
    $("#tip-input").val(bbbb.shorturl);

}});
