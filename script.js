 var visitor = "anuj";
 $(document).ready(function(){


  streams.users[visitor] = [];


  var since = function(date){
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
  }

  var postTweet = function(tweet) {
    $(".tweets").prepend('<p class="tweet-body">' +
      '<span class="at">' + '@' + '</span>' + 
      '<span class="user-name">'+ tweet.user + '</span>' +
      '<span class="time">' + "  " +timeSince + '</span>' + '<br>' + 
      '<span class="message">' + tweet.message + '</span>' +
      
      '</p>');
  };

  //post initial generated tweets
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var timeSince = since(tweet.created_at)
    postTweet(tweet);
    index -= 1;

  };

  //posts user submitted tweets
  $("form#visitor").submit(function(event){
    var submitted = $("input.visitorTweet").val();
    writeTweet(submitted);

    index = streams.home.length - 1;
    tweet = streams.home[index];

    tweet.created_at = new Date();
    timeSince = since(tweet.created_at);

    postTweet(tweet);
    $("input.visitorTweet").text("");

    event.preventDefault();
  });

  //clears tweet list and reads all tweets for user name clicked
  $(".tweets").on("click", ".user-name", function(){
    clearTimeout(setTimer);
    var userClicked = $(this).text();
    $(".tweets").text("");

    streams.users[userClicked].forEach(function(tweet){
      postTweet(tweet);
    });
  });

  //periodically adds tweets
  var updateTweets = function(){
    /*
    $(".time").each(function(){
      var oldTime = $(this).text();
      var newTime = since(oldTime);
      $(this).text(newTime); 
    });
   */
 index = streams.home.length - 1;
 tweet = streams.home[index];
 postTweet(tweet);
 setTimer = setTimeout(updateTweets, 6000);


};
updateTweets();

});