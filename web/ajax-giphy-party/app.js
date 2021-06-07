console.log("Let's get this party started!");

const pickRandomNumber = (array) => {
  if (array.length >= 10) {
    return Math.floor(Math.random() * array.length);
  }
  return Math.floor(Math.random() * array.length * 10);
};

async function getGif(query) {
  // get response using value as query
  const response = await axios.get(
    `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
  );

  const results = response.data.data;
  // get the gif from results
  const gif =
    results[pickRandomNumber(Array.from(results))].images.original.url;
  console.log(gif);
  return gif;
}

function createGif(gif) {
  //create img tag , put source attr, append do imgContainer
  const img = $("<img>");
  img.attr("class", "img-fluid col-4");
  img.attr("src", `${gif}`);
  const imgContainer = $("#imageContainer");
  imgContainer.append(img);
}

// make event for Search button
$("#searchForm").on("submit", async function (e) {
  e.preventDefault();
  let input = $("#searchInput").val();
  console.log(input);
  if (!input) return;

  let gif = await getGif(input);

  createGif(gif);
  //reset input
  input = "";
});

//make event for Remove button
$("#removeBtn").on("click", function () {
  $("img").remove();
});
