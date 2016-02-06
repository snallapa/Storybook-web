var Story = Parse.Object.extend("Story");
$( document ).ready(function() {
	$("form").submit(function() {
		$(".search").trigger("click");
		return false;
	});
	var currentUser = Parse.User.current();
	var query = new Parse.Query(Parse.User);
	query.include("history");
	query.equalTo("email", currentUser.get("email"));
	query.find({
		success: function(result) {
			console.log(result);
			fillTable(result[0].get("history"));
		}
	});
		
});

function fillTable(results) {
	for (var i = 0; i <results.length; i++) {
		$('#searchTable tr:last').after('<tr class = "result"><td>' + results[i].get("title") + '</td><td>' + results[i].get("tags").join(", ")+'</td><td>'+results[i].get("description") + '</td><td>' + results[i].get("author") + '</td><td>' + results[i].get("readCount") + '</td></tr>');
	};
	$(".result").click(function() {
		var index = $(this).index()-1;
		var currentUser = Parse.User.current();
		currentUser.addUnique("history", results[index]);
		results[index].increment("readCount");
		results[index].save();
		window.open(results[index].get("story").url(), '_blank');
	});
}