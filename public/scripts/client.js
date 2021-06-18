/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#submit-tweet").submit(onSubmit);
  loadTweets();
});

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then((result) => renderTweets(result));
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
      <p>${escape(tweet.content.text)}</p>
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
  event.preventDefault();

  const $newtweet = $(this).serialize();
  const $newtweetCheck = $newtweet.slice(5);

  if ($newtweet === null || $newtweetCheck === "") {
    //alert("Your tweet can't be empty");
    $(".error-emptytweet").slideDown("slow");
    $(".error-maxtweet").hide();
  } else if ($newtweetCheck.length > 140) {
    $(".error-maxtweet").slideDown("slow");
    $(".error-emptytweet").hide();
  } else {
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $newtweet,
    })
      .then(loadTweets())
      .catch((err) => console.log(err));
    $(".error-emptytweet").hide();
    $(".error-maxtweet").hide();
  }
};
