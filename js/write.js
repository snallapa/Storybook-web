var Story = Parse.Object.extend("Story");
$( document ).ready(function() {
	if (Parse.User.current()) {
		if (!(Parse.User.current().get("type").toLowerCase() === "author")) {
			window.location.href = "index.html"
		}
	} else {
		window.location.href = "index.html"
	}
	$("form").submit(function() {
		$(".submit").trigger("click");
		return false;
	});
	$(".submit").click(function() {
		var story = new Story();
		var title = $("#title").val();
		var tags = $("#tags").val().split(",");
		for (var i = tags.length - 1; i >= 0; i--) {
			tags[i] = tags[i].trim().toLowerCase();
		};
		var description = $("#description").val();

		story.set("title", title);
		story.set("titleLowercase", title.toLowerCase());
		story.set("tags", tags);
		story.set("description", description);
		story.set("descriptionLowercase", description.toLowerCase());
		story.set("author", Parse.User.current().get("name"));
		story.set("authorLowercase", Parse.User.current().get("name").toLowerCase());
		story.set("email", Parse.User.current().get("username"));
		story.set("readCount", 0);
		if ($("#story")[0].files.length > 0) {
			var file = $("#story")[0].files[0];
			var contactName = "story.pdf";
			parseFile = new Parse.File(contactName, file);
			parseFile.save().then(function () {
				story.set("story", parseFile);
				story.save().then(function() {
					alert("Story Uploaded");
					window.location.href = "write.html"
				});
			}, function (error) {
				alert("picture error");
			});
		}

	});
});