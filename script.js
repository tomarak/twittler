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
      '<span class="user-name">'+ tweet.user + 
      '</span>' +
      ': ' + 
      '<span class="message">' + tweet.message + '</span>' +
      '<span class="time">' + "  " +timeSince + '</span>' +
      '</p>');
  };


  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var timeSince = since(tweet.created_at)
    postTweet(tweet);
    index -= 1;

  };

  $("form#visitor").submit(function(event){
    var submitted = $("input.visitorTweet").val();
    
    writeTweet(submitted);
    index = streams.home.length - 1;
    var tweet = streams.home[index];
    tweet.created_at = new Date();
    var timeSince = since(tweet.created_at);

    postTweet(tweet);

    $("input.visitorTweet").text("");


    event.preventDefault();
  });

  $(".user-name").click(function(){
    var userClicked = $(this).text();
   $(".tweets").text("");

    streams.users[userClicked].forEach(function(tweet){
      postTweet(tweet);
    })
  })

  
  var updateTweets = function(){
    index = streams.home.length - 1;
    tweet = streams.home[index];
    postTweet(tweet);
    setTimeout(updateTweets, 3000);
  }
  updateTweets();

});