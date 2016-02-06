
$( document ).ready(function() {
	var currentUser = Parse.User.current();
	if (!currentUser) {
		Parse.User.logOut();
		window.location.href = "index.html"
	} else if (currentUser.get("type").toLowerCase() !== "parent") {
		Parse.User.logOut();
		window.location.href = "index.html"
		
	} else {
		$(".account").text(currentUser.get("name"));
	}

	$(".logout").click(function() {
		Parse.User.logOut();
		window.location.href = "index.html"
	});
});