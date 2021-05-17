console.log("Lets get ready to party with Jquery");

$("article img").addClass("image-center");

$("article p").eq(5).remove();

function randomSize() {
  const randomNumber = Math.floor(Math.random() * 101);
  return `${randomNumber}px`;
}
$("h1").css("font-size", randomSize());

$("ol").append("<li>Golden Retrievers for life!</li>");
$("aside").children().remove();

$("<p>Sorry for this list existence</p>").appendTo("aside");

function makeColor() {
  const red = $("#red").val();
  const blue = $("#blue").val();
  const green = $("#green").val();

  return `rgb(${red},${green},${blue})`;
}

$("#form").on("keypress", "input", function () {
  $("body").css("background-color", makeColor());
});

$("img").click(function () {
  $(this).remove();
});
