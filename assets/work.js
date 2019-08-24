var games = ["Metal Gear Solid", "Halo 2", "World of Warcraft", "Mario kart", "Dota 2", "Mega Man"]
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
//find better avenue to use click, new buttons not on dom
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

function gifCreation() {
    $("#game-gif").empty();
    var game = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=Rldx2nLfvDVSqdK8KgeIHSDn3MYjyH2Q&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gameDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gameImage = $("<img>");
                //may need to work url to form giphy currently showing still image need to be able to flip between from click
                gameImage.attr("src", results[i].images.fixed_height_still.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url)
                .attr("data-state", "still");

                gameDiv.append(p);
                gameDiv.append(gameImage);
                $("#game-gif").prepend(gameDiv);
            }
        })
}
function gifPlay() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}
$(document).on("click", "img", gifPlay);
$(document).on("click", "button", gifCreation);