$(document).ready(function(){
	$('li').click(function(){
		$(window).scrollTo($(this).attr("target"),1000);
	});

	var scroll_home = $('#home').offset().top;
	var scroll_games = $('#games').offset().top;
	var scroll_ideas = $('#ideas').offset().top;

	$(window).scroll(function(){
		var scroll = $(window).scrollTop()

		if(Math.abs(scroll-scroll_home) < 100) {
			$('.header-home').css('opacity', 1);
		} else {
			$('.header-home').css('opacity', 0);
		}

		if(Math.abs(scroll-scroll_games) < 100)  {
			$('.header-games').css('opacity', 1);
		} else {
			$('.header-games').css('opacity', 0);
		}

		if(Math.abs(scroll-scroll_ideas) < 100)  {
			$('.header-ideas').css('opacity', 1);
		} else {
			$('.header-ideas').css('opacity', 0);
		}

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

	$(".button-explore").click(function(){
		$('html, body').animate({
			scrollTop: $("#games").offset().top
		}, 1000);
		return false;
	});

	(function($) {
		$(document).on("click", ".submit-button", function(e) {
			e.preventDefault();
			var self = this;
			var form = $(self).closest('form');
			var formData = $(form).serializeArray();
			var credentials = typeof $(form).attr("credentials") == "undefined" ? false : true;
			var flag = true;
			var regex = {
				email: /\S+@\S+\.\S+/,
				body: /\S+/,
				app: /Other/,
				public: /false/,
				fullname: /\S+/
			}
			console.log(formData);
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
				$.ajax({
					url: $(form).attr("action"),
					data: $(form).serialize(),
					type: "POST",
					xhrFields: {
						withCredentials: credentials
					}
				})
				.done(function(data) {
					$(form).trigger('success', data)
				})
				.fail(function(data) {
					$(form).trigger('failure', data)
				});
			}
		});
	})(jQuery);

	(function($) {
		var form = $('.ideas-form');
		var submitButton = $(form).find('.submit-button');
		function formReset() {
			form.find("input[type=text], textarea").val("");
			form.find(".submit-button")
				.removeClass("button-gray")
				.addClass("button-red")
				.val("SUBMIT");
		}
		form.on('success', function(e, data) {
			submitButton.removeClass('button-red');
			submitButton.addClass('button-gray');
			submitButton.html("SUCCESS");
			setTimeout(formReset, 2000);
		});
		form.on('failure', function(e, data) {
			console.log(data);
			submitButton.removeClass('button-red');
			submitButton.addClass('button-danger-red');
			submitButton.html("FAILED");
			setTimeout(formReset, 2000);
		});
	})(jQuery);

	(function($) {
		$(".chat").on("click", function(e) {
			location = "https://chat.sdslabs.co/"
		});
	})(jQuery);

});
