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
		$.ajax({
			url: "https://accounts.sdslabs.co.in/info",
			type: "GET",
			dataType: "json",
			xhrFields: {
				withCredentials: !0
			},
			success: function(data) {
				console.log(data);
				if(data.loggedin) {
					$('.button-login').html(data.name)
					$('.button-login').parent().removeAttr("href");
					$('.button-login').removeClass("button-transparent");
					$('.button-login').removeClass("button-login");
					$('[name="fullname"]').val(data.name);
					$('[name="email"]').val(data.email);
				} else {
					$('.button-login').parent().attr('href', "https://accounts.sdslabs.co.in/login?redirect="+window.location.href);
				}
			}
		});
	})(jQuery);

	(function($) {
		$(document).on("click", ".submit-button", function(e) {
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
				fullname: /\S+/,
				username: /\S+/,
				password: /\S+/,
				redirect: new RegExp("https://accounts.sdslabs.co.in")
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
				$.post($(form).attr("action"), $(form).serialize())
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
		form.on('success', function(e, data) {
			submitButton.removeClass('button-red');
			submitButton.addClass('button-green');
			submitButton.html("SUCCESS");
		});
		form.on('failure', function(e, data) {
			console.log(data);
			submitButton.removeClass('button-red');
			submitButton.addClass('button-danger-red');
			submitButton.html("FAILED");
		});
	})(jQuery);

	(function($) {
		$(".button-login").on("click", function(e) {
			var form = $('<form class="login-form center" action="https://accounts.sdslabs.co.in/login?redirect=http://game.sdslabs.co.in/"></form>');
			form.append('<input type="text" name="username" class="form-control input-white-border" placeholder="USERNAME">');
			form.append('<input type="password" name="password" class="form-control input-white-border" placeholder="PASSWORD">');
			form.append('<input type="hidden" id="redirect" name="redirect" value="https://accounts.sdslabs.co.in">');
			form.append('<a class="" href="https://accounts.sdslabs.co.in/register">New user? Sign up here</a>')
			form.append('<div class="bold center button submit-button button-red">LOGIN</div>');
			form.append('<div class="info"></div>');
			form.on('success', function(e, data) {
				if(~data.indexOf("No such user exists.")) {
					form.find(".info").html("No such user exists.");
					form.find(".submit-button").html("Login");
					form.find(".submit-button").removeClass("button-green");
					form.find(".submit-button").addClass("button-red");
				}
				else if (~data.indexOf("Incorrect password for this user")) {
					form.find(".info").html("Incorrect Password");
					form.find(".submit-button").removeClass("button-green");
					form.find(".submit-button").addClass("button-red");
				}
				else
					form.remove();
			});
			form.on('failure', function(e, data) {
				form.find(".info").html("Some problem occured. Try later");
			});
			$(document).on('mousedown', function(e) {
				var form = $(".login-form");
				if(!form.is(e.target) && form.has(e.target).length === 0)
					form.remove();
			});
			$(this).parent().append(form);
		});
	})(jQuery);
});
