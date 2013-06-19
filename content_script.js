$(function(){
    var pathname = window.location.pathname;
    $(".title a").css("font-size", "20px");
    $("body table table tr[style]").css("height", "20px");
	// recover best link
	if(pathname.indexOf('best') < 0) {
        $("span.pagetop").first().append(' | <a href="best">best</a>');
    }
    $("span[id^=score]").each(function(){
        var count = parseInt($(this).text().split(" ")[0]);
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
    // add AddThis to page
    $('body').append('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=undefined"></script>');
    var makeAddThis = function(url, title){
        var addThisCodeItem = '<div class="addthis_toolbox addthis_default_style addthis_16x16_style" style="display: inline-table; vertical-align: top; -webkit-filter: grayscale(70%); opacity: .6;">';
        var addThisCodeNews = '<div addthis:url="' + url + '" addthis:title="' + title + ' | share from Hacker News" class="addthis_toolbox addthis_default_style addthis_16x16_style" style="display: inline-table; vertical-align: top; -webkit-filter: grayscale(70%); opacity: .6;">';
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
    // add sort function to page
    if((pathname.indexOf('item') < 0) && (pathname.indexOf('jobs') < 0) && (pathname.indexOf('newcomments') < 0)) {
        $("span.pagetop").first().append(' | <label style="color: black; cursor: pointer;"><input id="order" type="checkbox" style="vertical-align: middle; margin: 0 4px;"/>order by heat desc</label>');
    }
    var doSort = function(fun){
        var mainTbody = $(".subtext").parent().parent();
        $(".subtext").sort(fun).each(function(){
            var tr1 = $(this).parent();
            var tr0 = tr1.prev();
            var tr2 = tr1.next();
            mainTbody.prepend(tr2).prepend(tr1).prepend(tr0);
        });
    }
    $("#order").click(function(){
        localStorage.obh = $(this).prop("checked") + ''; //the implement will auto convert to string. In case they change implement to accept bools.
        var rankSort = function(a, b){
            var aPoints   = parseInt($("span[id^=score] span", a).text()) || 0;
            var aComments = parseInt($("a[href^=item] span", a).text()) || 0;
            var aRank     = aComments * 2 + aPoints;
            var bPoints   = parseInt($("span[id^=score] span", b).text()) || 0;
            var bComments = parseInt($("a[href^=item] span", b).text()) || 0;
            var bRank     = bComments * 2 + bPoints;
            return aRank - bRank;
        };
        var originSort = function(a, b){
            var aRank = parseInt($(a).parent().prev().children(":first-child").text().replace(".", "")) || 0;
            var bRank = parseInt($(b).parent().prev().children(":first-child").text().replace(".", "")) || 0;
            return bRank - aRank;
        };
        if($(this).prop("checked")) {
            doSort(rankSort);
        } else {
            doSort(originSort);
        }
    });
    if(localStorage.obh === 'true') {
        $("#order").click();
    }
})