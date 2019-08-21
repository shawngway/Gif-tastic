var games = ["Metal Gear Solid", "Halo 2", "World of Warcraft", "Journey", "Dota 2", "Mega Man"]
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < games.length; i++) {
        var a = $("<button>");
        a.addClass("game");
        a.attr("data-name", games[i]);
        a.text(games[i]);
        $("#buttons-view").append(a);
    }
}
$("#add-game").on("click", function (event) {
    event.preventDefault();

    var game = $("#game-input").val().trim();
    if (game === "") {
        return false;
    };
    games.push(game);
    renderButtons();
    $("#game-input").val("");

});
renderButtons();

$("#button").on("click", function () {
    $("#game-gif").empty();
    var game = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=Rldx2nLfvDVSqdK8KgeIHSDn3MYjyH2Q&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var results = response.data;
        for (var i = 0; i <results.length; i++) {
            var gameDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gameImage = $("<img>");
            //may need to work url to form giphy
            gameImage.attr("src", results[i].images.fixed_height.url);
            
        }
    })
})