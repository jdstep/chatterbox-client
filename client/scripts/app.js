// YOUR CODE HERE:

var app = {};

app.init = function() {

};

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/JSON',
    success: function(data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function(data) {
      app.appendNewMessages(data);
      console.log('chatterbox: Message Gotten');
    },
    error: function (data) {
      console.error('chatterbox: Failed to gotten message');
    }
  });
};

app.clearMessages = function() {
  $("#chats").html('');
};

app.appendNewMessages = function(data) {
  _.each(data.results, function(msg) {
    app.addMessage(msg);
  });
};

app.addMessage = function(message) {
  var messageString = "";

  $("#chats").append('<span class="username">' +
                      message.username +
                      ' <span class="messages">' +
                      message.text +
                      '</span>');
};

app.addRoom = function(roomName) {
  $("#roomSelect").append('<option class="rooms">' + roomName + '</option>')
};

app.addFriend = function(friend) {

};

app.handleSubmit = function() {
  console.log("I tried to submit something");
};

var addUsernameOnClick = function() {
  $("#chats").on('click', ".username", function(friend) {
  app.addFriend(friend);
})};

var readySubmitButtonClick = function() {
  $(".submit").on('click', function(event) {
    $(".submit").trigger('submit');
  });
};

var readySubmitButtonSubmit = function() {
  $(".submit").on('submit', function() {
    app.handleSubmit();
  });
};

var readyGetMessagesClick = function() {
  $(".retrieve").on('click', function() {
    // debugger;
    console.log(app.fetch());
  });
};

$(document).ready(function() {
  addUsernameOnClick();
  readySubmitButtonClick();
  readySubmitButtonSubmit();
  readyGetMessagesClick();
});
