// ** Given a query string, return array of matching shows:
//  *     { id, name, summary, episodesUrl }
//  */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const request = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${query}`
  );
  const res = request.data;

  return res;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    if (!show.show.image.medium) {
      show.show.image.medium = "https://tinyurl.com/tv-missing";
    }
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card border shadow-1" data-show-id="${show.show.id}">
           <div class="card-body">
             <img src="${show.show.image.medium}" class="img-fluid card-img-top">           
             <h5 class="card-title">${show.show.name}</h5>
             <p class="card-text">${show.show.summary}</p>
             <div>
              <button id="episodes"class="btn btn-primary">Episodes</button>
             </div>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }

  $("div").on("click", "button", async function listEpisodes() {
    const ul = $("#episodes-list");
    ul.empty();

    $("#episodes-area").show();
    const episodeID = $(".card").attr("data-show-id");

    let episodes = await getEpisodes(episodeID);

    // if (ul.children().length > 0) {
    //   return alert("episodes listed");
    // }

    for (let episode of episodes) {
      console.log(episode.name);
      let epi = $(`
      <li>Episode ${episode.number}: ${episode.name}</li>`);
      ul.append(epi);
    }
  });
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();

  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  const request = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  return request.data;
  // TODO: return array-of-episode-info, as described in docstring above
}
