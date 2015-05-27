var App = Backbone.Model.extend({
  initialize: function(){
    this.set('currentRoom', 'All Rooms');
    this.set('mostRecentMessageTime', new Date("0"));
    this.set('friends', []);
  }
});


var FormView = Backbone.View.extend({

  events: {
    "click .submit":"handleSubmit"
  },

  initialize: function(){

  },

  handleSubmit: function(e) {
    e.preventDefault();
    var username = $('#username').val();
    var text = $('#message').val();

    console.log(username);
    console.log(text);
    // collection.create creates a new model in that collection.

    this.collection.create({username: username, text: text});


  }

  // // listens for click event on room creation button
  // // invokes addRoom with the value in the newRoom textbox
  // readyMakeNewRoom: function(){
  //   $("#newRoomButton").on('click', function(){
  //     app.addRoom($('#newRoomText').val());
  //     $('#newRoomText').val("");
  //   });
  // },

  // // sets the current room to the selected room
  // // and then fetches new messages
  // readyEnterRoom: function(){
  //   $('#roomSelect').on("change", function(event){
  //     app.currentRoom = this.value;
  //     app.fetch();
  //   });
  // }
});


var Message = Backbone.Model.extend({

  defaults: {
    "username": "anonymous",
    "roomname": "public",
    "text": ""
  },

  initialize: function(message){
    this.set('username', message.username);
    this.set('text', message.text);
    this.set('roomname', message.roomname);
    this.set('createdAt', message.createdAt);
  },

});

var MessageView = Backbone.View.extend({

  template : _.template('<div class="username"><%- username %></div> \
              <div class="text"><%- text %></div> \
              <div class="roomname"><%- roomname %></div>'
              ),
  render: function() {
    // debugger;

    this.$el.html(this.template(this.model.attributes));

    return this.$el;
  }

});

var MessagesView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    this.collection.forEach(this.renderMessage, this)
  },

  renderMessage: function(message) {
    var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
    }
});

var Messages = Backbone.Collection.extend({
  model: Message,

  url: 'https://api.parse.com/1/classes/chatterbox',

  loadMessages: function() {
    this.fetch({})
  },

  parse: function(resp) {
    return resp.results;
  }

});

// var app = new App();
// var appView = new AppView();
