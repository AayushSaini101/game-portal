$(document).ready(function(){
	$('li').click(function(){
		var clicked_class = '#'+$(this).find('span').attr("class");
		$(window).scrollTo($(clicked_class),1000);
	});

	var scroll_games = $('#games').offset().top;
	var scroll_ideas = $('#ideas').offset().top;

	$(window).scroll(function(){
		var scroll = $(window).scrollTop()
		
		if(scroll < scroll_games){
			$('li').removeClass("active");
			$(".first").addClass("active");
		}
		else if(scroll >= scroll_ideas){
			$('li').removeClass("active");
			$(".third").addClass("active");
		}
		else {
			$('li').removeClass("active");
			$(".second").addClass("active");
		}
	});

	function getSection(){
		var scroll = $(window).scrollTop()
		if(scroll < scroll_games){
			return 1;
		}
		else if(scroll >= scroll_ideas){
			return 3;
		}
		else {
			return 2;
		}
	}

	$(document).keydown(function(e){
		if(e.keyCode == 39){
			if(getSection() == 1) {
				$(window).scrollTo($('#games'),1000);
			}
			else if (getSection() == 2){
				$(window).scrollTo($('#ideas'),1000);
			}
		}
		else if(e.keyCode == 37){
			if(getSection() == 2) {
				$(window).scrollTo($('#home'),1000);
			}
			else if (getSection() == 3){
				$(window).scrollTo($('#games'),1000);
			}
		}
	});

	$(".button-explore").click(function(){
		$(window).scrollTo($("#games"),1000);
	});
	console.log($('section').height());
	//$('.poplight').offset().top

});