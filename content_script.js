$(".title a").css("font-size", "20px");
//$("body table table").attr("width", "100%");
$("body table table tr[style]").css("height", "20px");//.html('<td colspan="3" style="border-bottom:1px dotted #ff6600;"></td>')
$("span[id^=score]").each(function(){
    var count = parseInt($(this).text().split(" ")[0]);
    //console.log(count);
    var style = "";
    if(count >= 100 && count < 300) {
        style = "color: #ff6600; opacity: 0.5;"
    } else if(count >= 300 && count < 500) {
        style = "color: #ff6600;"
    } else if(count >= 500 && count < 1000) {
        style = "color: red;"
	} else if(count >= 1000) {
        style = "color: red; font-weight: bold;"
	}
    $(this).html('<span style="' + style + '">' + count + '</span> points');
});
$(".subtext a[href^=item]").each(function(){
    var count = parseInt($(this).text().split(" ")[0]);
    var style = "";
    if(count >= 60 && count < 120) {
        style = "color: #ff6600; opacity: 0.5;"
    } else if(count >= 120 && count < 250) {
        style = "color: #ff6600;"
    } else if(count >= 250 && count < 500) {
        style = "color: red;"
	} else if(count >= 500) {
        style = "color: red; font-weight: bold;"
	}
    $(this).html('<span style="' + style + '">' + count + '</span> comments');
});