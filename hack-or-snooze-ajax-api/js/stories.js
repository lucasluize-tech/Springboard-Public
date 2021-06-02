"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, deleteButton = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showStar = Boolean(currentUser)
  return $(`
      <li id="${story.storyId}">
          ${deleteButton ? getDeleteButtonHTML() : ""}
          ${showStar ? starHTML(currentUser, story) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function  getDeleteButtonHTML(){
  return `<span class="trash-can">
              <i class="fas fa-trash-alt"></i>
          </span>`;
}

function starHTML(user, story){
  const favorite = user.isFavorite(story);
  const star = favorite ? "fas" : "far";
  return `<span class="star">
              <i class="${star} fa-star"</i>
          </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putUserStoriesOnPage(){
  console.debug("putUserStoriesOnPage");

  $('#my-stories').empty();
  if (currentUser.ownStories.length === 0){
    return $('#my-stories').append(`<h3>${currentUser.name} haven't posted yet!</h3>`)
  }else {
    for(let story of currentUser.ownStories){
      const $story = generateStoryMarkup(story, true);
      $('#my-stories').append($story)
    }
  }

  $('#my-stories').show();
}

function putFavoritesListOnPage(){
  console.debug("putFavoritesOnPage");

  $favoriteStories.empty();

  if ( currentUser.favorites.length === 0){
    return $favoriteStories.append(`<h3>${currentUser.name} have no Favorites</h3>`)
  }else {
    for (let story of currentUser.favorites){
      const $story = generateStoryMarkup(story);
      $favoriteStories.append($story);
    }
  }
  $favoriteStories.show();
}


async function toggleStoryFavorite(e){
  console.debug("toggleStoryFavorite")
 
  const item = $(e.target).closest('li');
  const icon = item.prevObject
  
  const storyid = item.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyid);

  if ($(e.target).hasClass("fas")){
    await currentUser.removeFavorite(story);
    icon.toggleClass("fas far")
  }else {
    await currentUser.addFavorite(story);
    icon.toggleClass("fas far")
  }
}

$(".stories-list").on('click', '.star', toggleStoryFavorite);

async function addNewStoryOnPage(e){
  console.debug("addNewStory");
  e.preventDefault();
  // grab the info
  const title = $('#title-input').val()
  const author = $('#author-input').val()
  const url = $('#url-input').val()
  
  let newStory = { title, author, url}
  console.log(newStory)
  // make new story to api
  const story = await storyList.addStory(currentUser, newStory);
  console.log(story)

  //generate story HTML
  const $story = generateStoryMarkup(story);
  // show story in list
  $allStoriesList.prepend($story)
  // hide form
  $newStoryForm.slideUp("slow")
  $newStoryForm.trigger("reset")
  $allStoriesList.show()
}

$newStoryForm.on("submit", addNewStoryOnPage)

async function deleteStory(e){
  console.debug("submitNewStory");
  e.preventDefault();

  const item = $(e.target).closest("li");
  const storyId = item.attr('id');

  await storyList.removeStory(currentUser, storyId);
  // updated stories list
  putUserStoriesOnPage();
}

$('#my-stories').on("click", ".trash-can", deleteStory)
