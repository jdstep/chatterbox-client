// YOUR CODE HERE:

var app = {};

var mostRecentMessageTime;

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
  if (!mostRecentMessageTime) {
    mostRecentMessageTime = new Date(data.results[data.results.length - 1].createdAt);
  }

  _.each(data.results, function(msg) {
    if (app.xssAttackPresent(msg)) {
      console.log(msg);
    } else if (new Date(msg.createdAt) > mostRecentMessageTime) {
      app.addMessage(msg);
    }
  });

  mostRecentMessageTime = new Date(data.results[0].createdAt);
};

app.xssAttackPresent = function(msg) {
  if (app.regExTests(msg.username)) {
    return true;
  } else if (app.regExTests(msg.text)) {
    return true;
  } else if (app.regExTests(msg.roomName)) {
    return true;
  } else {
    return false;
  }
};

app.regExTests = function(string) {
  if (secureReg.test(string) ||
      docReg.test(string)) {
    return true;
  } else {
    return false;
  }
};
app.addMessage = function(message) {
  var messageString = "";

  $("#chats").prepend('<div class="message">'+
                      '<span class="username">' +
                      message.username +
                      '</span>' +
                      ' <span class="messages">' +
                      message.text +
                      '</span>' +
                      '</div>');
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
  app.fetch();
});
