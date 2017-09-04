// Cloud Float...
var $main = $cloud = mainwidth = null;
var offset1 = 450;
var offset2 = 0;
var offsetbg = 0;

$(document).ready(
	setTimeout(function(){
		$main = $("#mainBody");
		$body = $("body");
		$cloud1 = $("#cloud1");
		$cloud2 = $("#cloud2");
		mainwidth = $main.outerWidth();
		run();
	},500)
);

/// 飘动
function run(){
	setInterval(function flutter() {
		if (offset1 >= mainwidth) {
			offset1 =  -580;
		}

		if (offset2 >= mainwidth) {
			 offset2 =  -580;
		}
		offset1 += 1.1;
		offset2 += 1;
		$cloud1.css("background-position", offset1 + "px 30px")
		
		$cloud2.css("background-position", offset2 + "px 140px")

	}, 70);
}
