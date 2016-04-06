$(document).ready(function(){
	$('li').click(function(){
		$(window).scrollTo($(this).attr("target"),1000);
	});

	scroll_games = $('#games').offset().top;
	scroll_ideas = $('#ideas').offset().top;

	$(window).scroll(function(){
		var scroll = $(window).scrollTop()

		if(scroll < scroll_games){
			$('li').removeClass("active");
			$(".first").addClass("active");
		}
		else if(scroll >= parseInt(scroll_ideas)){
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
	//$('.poplight').offset().top
	(function($) {
		$.get("//accounts.sdslabs.co.in/info", function(data) {
			if(data.loggein) {
				$('.button-login').html(data.name)
				$('.button-login').parent().removeAttr("href");
				$('.button-login').removeClass("button-transparent");
				$('[name="fullname"]').val(data.name);
				$('[name="email"]').val(data.email);
			} else {
				$('.button-login').parent().attr('href', "//accounts.sdslabs.co.in/login?redirect="+window.location.href);
			}
		}, "json");
	})(jQuery);

	(function($) {
		$(".submit-button").on("click", function(e) {
			e.preventDefault();
			var self = this;
			var form = $(self).closest('form');
			var formData = $(form).serializeArray();
			var flag = true;
			var regex = {
				email: /\S+@\S+\.\S+/,
				body: /\S+/,
				app: /Other/,
				public: /false/,
				fullname: /\S+/
			}
			formData.map(function(ele) {
				if(!regex[ele.name].test(ele.value)) {
					flag = false;
					$('[name="'+ele.name+'"]').addClass('input-red-border');
				} else {
					$('[name="'+ele.name+'"]').removeClass('input-red-border');
				}
			});
			if(flag) {
				$(self).html('<i class="fa fa-circle-o-notch fa-spin"></i>');
				$.ajax("https://feedback.sdslabs.co.in/issue", $(form).serialize())
				.done(function(data) {
					$(self).removeClass('button-red');
					$(self).addClass('button-green');
					$(self).html("SUCCESS");
				})
				.fail(function(data) {
					$(self).removeClass('button-red');
					$(self).addClass('button-danger-red');
					$(self).html("FAILED");
				});
			}
		});
	})(jQuery);

});
