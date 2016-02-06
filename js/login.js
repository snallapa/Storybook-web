
$( document ).ready(function() {
	$(".loginMessage").hide();
	$("input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("form").submit();
		}
	});
	$("form").submit(function() {
		$(".login").trigger("click");
		return false;
	});
	$(".login").click(function() {
		var email = $("#email").val();
		var password = $("#password").val();
		Parse.User.logIn(email, password, {
			success: function(user) {
				var type = user.get("type");
				if (type.toLowerCase() === "author") {
					window.location.href = "authorhome.html"
				} else {
					window.location.href = "parenthome.html"
				}
				
			},
			error: function(user, error) {
				$(".loginMessage").text("Login Error refresh try again. Error code: " + error.message);
				$(".loginMessage").slideDown();

			}
		});
	});
});