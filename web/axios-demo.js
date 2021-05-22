async function getData() {
  const res = await axios.get("https://swapi.dev/api/planets/");
  const results = res.data.results;
  for (let planet of results) {
    makePlanets(planet);
  }
}

function makePlanets(planet) {
  const ul = $("<ul></ul>");
  $("div").append(ul);
  newLi = $("<li>");
  newLi.text(planet.name);
  ul.append(newLi);
}

$(".getPlanets").on("click", getData());

// Why it gets the data without clicking?

// and What is this error :

//Uncaught TypeError: ((E.event.special[o.origType] || {}).handle || o.handler).apply is not a function jquery-3.6.0.slim.min.js:2

// tried to change de CDN of jquery nothing changed.
