 var visitor = "anuj";
 $(document).ready(function(){

  streams.users[visitor] = [];

  var postTweet = function(tweet) {
    $(".tweets").prepend('<p class="tweet-body">' +
      '<span class="at">' + '@' + '</span>' + 
      '<span class="user-name">'+ tweet.user + '</span>' +
      '<span class="time">' + "  " + newTime + '</span>' + '<br>' + 
      '<span class="message">' + tweet.message + '</span>' +
      '</p>');
  };

  //post initial generated tweets
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var newTime = moment(tweet.created_at).fromNow();
    postTweet(tweet);
    index -= 1;

  };

  //posts user submitted tweets
  $("form#visitor").submit(function(event){
    var submitted = $("input.visitorTweet").val();
    writeTweet(submitted);
    index = streams.home.length - 1;
    tweet = streams.home[index];

    newTime = moment(tweet.created_at).fromNow();
    postTweet(tweet);

    $("input.visitorTweet").val("");
    event.preventDefault();
  });

  //clears tweet list and reads all tweets for user name clicked
  $(".tweets").on("click", ".user-name", function(){
    clearTimeout(setTimer);
    var userClicked = $(this).text();
    $(".tweets").text("");
    
    streams.users[userClicked].forEach(function(tweet){
      newTime = moment(tweet.created_at).fromNow();
      postTweet(tweet);
    });
  });

  //periodically adds tweets
  var updateTweets = function(){

   index = streams.home.length - 1;
   tweet = streams.home[index];
   var newTime = moment(tweet.created_at).fromNow();
   postTweet(tweet);
   setTimer = setTimeout(updateTweets, 6000);

 };


 updateTweets();

//refreshes pages if header clicked, also refreshes timestamps
$("#header").on("click", function(){
  $(".tweets").text("");

streams.home.forEach(function(tweet){
  newTime = moment(tweet.created_at).fromNow();
      postTweet(tweet);
  });
})

});