$(document).ready(function() {
	$(".btn").click(function() {		
		//$(".nav_list").slideToggle('fast');
		$(".nav_list").eq(0).animate({left:'0px'},200);
		$(".nav_list").eq(1).animate({left:'0px'},400);
		$(".nav_list").eq(2).animate({left:'0px'},600);
		$(".nav_list").eq(3).animate({left:'0px'},800);
		$(".nav_list").eq(4).animate({left:'0px'},1000);
		$(".btn").addClass('btn_click');
		
	}
	/*function () {
		$(".nav_list").eq(0).animate({left:'-200px'},200);
		$(".nav_list").eq(1).animate({left:'-200px'},400);
		$(".nav_list").eq(2).animate({left:'-200px'},600);
		$(".nav_list").eq(3).animate({left:'-200px'},800);
		console.log('test2222222222');
	}*/	
	);


	$("#canvas").click(function() {
		$(".nav_list").eq(0).animate({left:'-200px'},1000);
		$(".nav_list").eq(1).animate({left:'-200px'},800);
		$(".nav_list").eq(2).animate({left:'-200px'},600);
		$(".nav_list").eq(3).animate({left:'-200px'},400);
		$(".nav_list").eq(4).animate({left:'-200px'},200);
		$(".image_list").slideUp(20);
		$(".btn").removeClass('btn_click');
	});

	$(".nav_image").click(function() {
		$(".image_list").slideToggle('fast');
	});
	
	
});