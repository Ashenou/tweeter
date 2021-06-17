/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

$(document).ready(function () {

  $("#submit-tweet").submit(onSubmit);
  loadTweets();
});

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" })
    .then(result=>renderTweets(result));
};

const renderTweets = function (tweets) {

  const container = $(".tweet-container");
  container.html("");

  for (const tweet of tweets) {
    container.prepend(createTweetElement(tweet));
  }
};

// Create a new element for a tweet
const createTweetElement = function (tweet) {
  let $tweet = `<article>
    <div class="tweet">
      <header>
      <div class="tweet-author">
      <img src="${tweet.user.avatars}" alt="" srcset="">&nbsp
        <h5 class="tweet-author">${tweet.user.name}</h5>
        </div>
        <h5>${tweet.user.handle}</h5>
      </header>
      <p>${tweet.content.text}</p>
      <hr>
      <footer>
        <div class="timeago">${timeago.format(tweet.created_at)}</div>
        <div class="icons">
          <i class="fas fa-flag"></i>&nbsp; &nbsp;
          <i class="fas fa-heart"></i>&nbsp; &nbsp;
          <i class="fas fa-retweet"></i>
        </div>
      </footer>
    </div>
  </article>`;
  return $tweet;
};

const onSubmit = function (event) {
  //console.log("Event here",event);
  event.preventDefault();
  const $newtweet = $(this).serialize();
  //console.log("This is from form", data);

  $.ajax({
    method: "POST",
    url: "/tweets",
    data: $newtweet,
  })
    .then(loadTweets());
};
