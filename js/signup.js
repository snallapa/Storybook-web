
$( document ).ready(function() {
	$(".signupMessage").hide();
	$("input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("form").submit();
		}
	});
	$(".signupForm").hide();
	$(".parentimage ").click(function() {
		$(".signupForm").slideUp();
		$(".signupForm").slideDown();
		$(".signupFormHeader").text("Parent");
	});

	$(".authorimage ").click(function() {
		$(".signupForm").slideUp();
		$(".signupForm").slideDown();
		$(".signupFormHeader").text("Author");
	});
	$("form").submit(function() {
		$(".signUp").trigger("click");
		return false;
	});

	$(".signup").click(function() {
		var name = $("#name").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirmation = $("#passwordConfirmation").val();
		if (password !== passwordConfirmation) {
			$(".signupMessage").text("The passwords have to match ");
			$(".signupMessage").slideDown();
		} else {
			var user = new Parse.User();
			user.set("name", name);
			user.set("password", password);
			user.set("email", email);
			user.set("username", email);
			user.set("type", $(".signupFormHeader").html());
			user.signUp(null, {
				success: function(user) {
					$(".signupMessage").slideDown();
					setTimeout(function(){
						window.location.href = "login.html";
					}, 2000);
				},
				error: function(user, error) {
					$(".signupMessage").text("Signup error refresh and try again.");
					$(".signupMessage").slideDown();
					console.log("Error: " + error.code + " " + error.message);
				}
			});
		}
	});
});