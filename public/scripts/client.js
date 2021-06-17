/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  // Render every tweet to tweet container
  const loadtweets = function (tweets) {
    for (const tweet of tweets) {
      $(".tweet-container").prepend(createTweetElement(tweet));
    }
  };
  // Create a new element for a tweet
  const createTweetElement = function (tweet) {
    let $tweet = `<article>
      <div class="tweet">
        <header>
        <img src="${tweet.user.avatars}" alt="" srcset="">
          <h5 class="tweet-author">${tweet.user.name}</h5>
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

  // $.ajax("../index.html", { method: "GET" }).then(renderTweets(data));

  $("#submit-tweet").submit(function (event) {
    //console.log("Event here",event);
    event.preventDefault();
    const data = $(this).serialize();
    console.log("This is from form", data);
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: data,
    }).then((response) => console.log("Response: ", response));
  });
  //loadtweets(data);

  // new function to
  $.ajax("index.html", { method: "GET" }).then(loadtweets(data));
});
