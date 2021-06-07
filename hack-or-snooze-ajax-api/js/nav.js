"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage()
  $allStoriesList.show(); // I Don't know why i have to call this a second time.
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  generateUserProfile();
  $loginForm.hide();
  $signupForm.hide();
}

function navNewStory(){
  console.debug("CreatingNewStory");
  hidePageComponents();
  $newStoryForm.slideDown("slow")
  $allStoriesList.show()
}

$('#nav-submit-story').on("click", navNewStory)


function navFavorites(){
  console.debug("navFavorites");
  hidePageComponents();
  putFavoritesListOnPage();
  $favoriteStories.show(); // also calling this twice.

}

$body.on('click', '#nav-favorites', navFavorites)

function navUserStories(){
  console.debug("MyStories");
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show(); // this too
}

$body.on('click', '#nav-my-stories', navUserStories)

function navProfile(){
  console.debug("navProfile");
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on('click', navProfile)