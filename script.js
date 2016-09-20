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
		$(window).scrollTo($("#games"),1000);
	});
	//$('.poplight').offset().top
	function getUserName() {
		(function($) {
			$.ajax({
				url: "https://accounts.sdslabs.co.in/info",
				type: "GET",
				dataType: "json",
				xhrFields: {
					withCredentials: !0
				},
				success: function(data) {
					if(data.loggedin) {
						$('.button-login')
						  .unbind("click")
						  .html(data.name)
						  .removeClass("button-transparent")
						  .removeClass("button-login")
						  .addClass("button-username");
						$('[name="fullname"]').val(data.name);
						$('[name="email"]').val(data.email);
					} else {
						$('.button-login').parent().attr('href', "https://accounts.sdslabs.co.in/login?redirect="+window.location.href);
					}
				}
			});
		})(jQuery);
	}
	getUserName();

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
		$(document).on("click", ".button-username", function(e) {
			location = "https://accounts.sdslabs.co.in/"
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
		$(".button-login").on("click", function(e) {
			var self = this;
			var form = $('<form class="login-form center" action="https://accounts.sdslabs.co.in/login?redirect=http://game.sdslabs.co.in/" credentials></form>');
			form.append('<input type="text" name="username" class="form-control input-white-border" placeholder="Username">');
			form.append('<input type="password" name="password" class="form-control input-white-border" placeholder="Password">');
			form.append('<input type="hidden" id="redirect" name="redirect" value="https://accounts.sdslabs.co.in">');
			form.append('<div class="bold center button submit-button button-red">LOGIN</div>');
			form.append('<a class="" href="https://accounts.sdslabs.co.in/recover/password">Forgot Password</a>')
			form.append('<a class="" href="https://accounts.sdslabs.co.in/register">Sign Up</a>')
			form.append('<div class="info"></div>');
			form.on('success', function(e, data) {
				if(~data.indexOf("No such user exists.")) {
					form.find(".info").html("No such user exists.");
					form.find(".submit-button").html("Login");
				}
				else if (~data.indexOf("Incorrect password for this user")) {
					form.find(".info").html("Incorrect Password");
				}
				else {
					form.remove();
					getUserName();
				}
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

	(function($) {
		$(".chat").on("click", function(e) {
			location = "https://chat.sdslabs.co/"
		});
	})(jQuery);

});
