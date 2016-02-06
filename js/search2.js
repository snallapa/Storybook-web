var Story = Parse.Object.extend("Story");
$( document ).ready(function() {
	$(".tablewrapper").hide();
	$("form").submit(function() {
		$(".search").trigger("click");
		return false;
	});
	$(".search").click(function() {
		$(".tablewrapper").slideUp();
		$(".result").remove();
		var query1 = new Parse.Query(Story);
		var search = $("#search").val().toLowerCase();
		query1.contains("titleLowercase", search);
		var query2 = new Parse.Query(Story);
		query2.contains("authorLowercase", search);
		var query3 = new Parse.Query(Story);
		query3.containsAll("tags", [search]);
		var query4 = new Parse.Query(Story);
		query4.contains("descriptionLowercase", search);
		var query5 = Parse.Query.or(query1, query2, query3, query4);
		query5.descending("readCount");
		var searchResults;
		query5.find({
			success: function(results) {
				searchResults = results;
				fillTable(results);
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	});
});

function fillTable(results) {
	$(".tablewrapper").slideDown();
	for (var i = 0; i <results.length; i++) {
		$('#searchTable tr:last').after('<tr class = "result"><td>' + results[i].get("title") + '</td><td>' + results[i].get("tags").join(", ")+'</td><td>'+results[i].get("description") + '</td><td>' + results[i].get("author") + '</td><td>' + results[i].get("readCount") + '</td></tr>');
	};
	$(".result").click(function() {
		var index = $(this).index()-1;
		var currentUser = Parse.User.current();
		currentUser.addUnique("history", results[index]);
		currentUser.save();
		results[index].increment("readCount");
		results[index].save();
		window.open(results[index].get("story").url(), '_blank');
	});
}