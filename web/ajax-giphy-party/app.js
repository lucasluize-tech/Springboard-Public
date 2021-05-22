console.log("Let's get this party started!");

const pickRandomNumber = (array) => {
  if (array.length >= 10) {
    return Math.floor(Math.random() * array.length);
  }
  return Math.floor(Math.random() * array.length * 10);
};

async function getGif() {
  //get input value
  const input = $("#searchInput").val();
  console.log(input); // ITS NOT RETURNING ANYTHING THAT I TYPE

  // get response using value as query
  const response = await axios.get(
    `http://api.giphy.com/v1/gifs/search?q=${input.value}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
  );

  const results = response.data.data;
  // get the gif from results
  const gif =
    results[pickRandomNumber(Array.from(results))].images.original.url;
  console.log(gif);
  //create img tag , put source attr, append do imgContainer
  const img = $("<img>");
  img.attr("class", "img-fluid col-4");
  img.attr("src", `${gif}`);
  const imgContainer = $("#imageContainer");
  imgContainer.append(img);
  // reset input
  input.value = "";
}
// make event for Search button
$("#searchBtn").on("submit", getGif());
//make event for Remove button
$("#removeBtn").on("click", function () {
  $("img").remove();
});

// WHY IT SUBMITS ON LOAD?

// WHY IT DOES NOT APPEND? INSTEAD RELOADS...
