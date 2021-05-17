const makeListItem = (string) => {
  return "<p>" + string + "</p>";
};

function sortCards() {
  console.log("clicked");
  const cardsArray = $(".card").toArray();
  const sortedCards = cardsArray.sort((a, b) => a.id - b.id);
  $(".cards").remove();
  for (card of sortedCards) {
    card.appendTo(".results");
  }
}

$("form").on("submit", function (e) {
  // prevent form default action
  e.preventDefault();
  // caputure values and create card
  const title = $(".title").val();
  if (title.length < 2) {
    alert("title must have 2 or more characters");
    return;
  }
  const rating = $(".rating").val();
  if (rating < 0 || rating > 10) {
    alert("ratings range 0-10");
    return;
  }

  const result = $(".results");
  const newCard = $("<div></div>");
  newCard.addClass("card");
  newCard.appendTo(result);

  // append values to card with delete button
  newCard.append(`<h3>Title: ${title}</h3>`);
  newCard.append(`<p>Rating: ${rating}</p>`);
  newCard.append("<button>Delete</button>");
  newCard.attr("id", rating);

  // add event on button
  $("div").on("click", "button", function () {
    $(this).parent().remove();
  });

  $(".title").val("");
  $(".rating").val("");
});

$(".sort").on("click", function () {
  console.log("clicked");
  const cardsArray = $(".card").toArray();
  const sortedCards = cardsArray.sort((a, b) => a.id - b.id);
  $(".cards").remove();
  for (card of sortedCards) {
    $(".results").append(card);
    // card.appendTo(".results");
  }
});
