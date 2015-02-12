 $(document).ready(function(){

  var visitorN = "anuj";
  streams.users[visitorN] = [];


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

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var timeSince = since(tweet.created_at)
    $(".tweets").append('<p class="tweet-body">'+
      '<span class="at">'+'@'+'</span>' + 
      '<span class="user-name">'+ tweet.user + 
      '</span>' +
      ': ' + 
      '<span class="message">' + tweet.message + '</span>'+
      '<span class="time">' + "  " +timeSince + '</span>' +
      '</p>');
    index -= 1;
   
  };

  $("form#visitor").submit(function(event){
    var submitted = $("input.visitorTweet").val();
    
    writeTweet(visitorN, submitted);


    var index = streams.home.length - 1;
    var tweet = streams.home[index];
    var timeSince = since(tweet.created_at);
   
    $(".tweets").prepend('<p class="tweet-body">' +
      '<span class="at">' + '@' + '</span>' + 
      '<span class="user-name">'+ tweet.user + 
      '</span>' +
      ': ' + 
      '<span class="message">' + tweet.message + '</span>' +
      '<span class="time">' + "  " +timeSince + '</span>' +
      '</p>');

    $("input.visitorTweet").text("");


   event.preventDefault();
  });

});