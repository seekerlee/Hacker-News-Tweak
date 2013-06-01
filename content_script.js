$(function(){
var pathname = window.location.pathname;
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
        style = "color: #ff6600; opacity: 0.7;"
    } else if(count >= 120 && count < 250) {
        style = "color: #ff6600;"
    } else if(count >= 250 && count < 500) {
        style = "color: red;"
	} else if(count >= 500) {
        style = "color: red; font-weight: bold;"
	}
    $(this).html('<span style="' + style + '">' + count + '</span> comments');
});

$('body').append('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=undefined"></script>');
var makeAddThis = function(url, title){
    var addThisCodeItem = '<div class="addthis_toolbox addthis_default_style addthis_16x16_style" style="display: inline-table; vertical-align: top; -webkit-filter: grayscale(70%); opacity: .7;">';
	var addThisCodeNews = '<div addthis:url="' + url + '" addthis:title="' + title + ' | share from Hacker News" class="addthis_toolbox addthis_default_style addthis_16x16_style" style="display: inline-table; vertical-align: top; -webkit-filter: grayscale(70%); opacity: .7;">';
    var addThisCode1    = '<a class="addthis_button_google_plusone_share"></a>'
                        + '<a class="addthis_button_twitter"></a>'
                        + '<a class="addthis_button_facebook"></a>'
                        + '<a class="addthis_button_sinaweibo"></a>'
                        + '<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>'
                        + '</div>';
    if(pathname.indexOf('item') > -1) {
	    return addThisCodeItem + addThisCode1;
	} else {
	    return addThisCodeNews + addThisCode1;
	}
};
$(".subtext").each(function(){
	var titleE = $(this).parent().prev().find(".title a");
	var url = titleE.attr("href");
	var title = titleE.text();
    $(this).append(' |  ').append(makeAddThis(url, title));
});
})