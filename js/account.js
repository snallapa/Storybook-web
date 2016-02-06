$( document ).ready(function() {
	$("input").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("form").submit();
		}
	});
	$("form").submit(function() {
		$(".signUp").trigger("click");
		return false;
	});
	var currentUser = Parse.User.current();
	$("#name").val(currentUser.get("name"));
	$("#email").val(currentUser.get("email"));

	$(".signup").click(function() {

		var name = $("#name").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirmation = $("#passwordConfirmation").val();
		if (password !== passwordConfirmation) {
			alert("All fields have to be entered and passwords have to match");
		} else {
			var user = new Parse.User();
			name = (!name ? name : currentUser.get("name"));
			email = (!email ? email : currentUser.get("email"));
			password = (!password ? password : currentUser.get("password"));
			user.set("name", name);
			user.set("password", password);
			user.set("email", email);
			user.set("username", email);
			user.save(null, {
				success: function(user) {
					alert("success")
				}
			});
		}
	});
});