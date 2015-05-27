var App = Backbone.Model.extend({
  initialize: function(){
    this.set('currentRoom', 'All Rooms');
    this.set('server', 'https://api.parse.com/1/classes/chatterbox');
    this.set('mostRecentMessageTime', new Date("0"));
    this.set('firendsList', []);
  }
});


var AppView = Backbone.View.extend({
  initialize: function(){
    this.readyMakeNewRoom();
    this.readyEnterRoom();
  },

  // listens for click event on room creation button
  // invokes addRoom with the value in the newRoom textbox
  readyMakeNewRoom: function(){
    $("#newRoomButton").on('click', function(){
      app.addRoom($('#newRoomText').val());
      $('#newRoomText').val("");
    });
  },

  // sets the current room to the selected room
  // and then fetches new messages
  readyEnterRoom: function(){
    $('#roomSelect').on("change", function(event){
      app.currentRoom = this.value;
      app.fetch();
    });
  }
});


var Message = Backbone.Model.extend({
  initialize: function(message){
    this.set('username', message.username);
    this.set('text', message.text);
    this.set('roomname', message.roomname);
    this.set('createdAt', message.createdAt);
  },

});

var MessageView = Backbone.View.extend({

  render: function() {
    var template = _.template('<div class="username"><%- username %></div> \
                <div class="text"><%- text %></div> \
                <div class="roomname"><%- roomname %></div>)');

    this.$el.html(template(this.model.attributes));

    return this.$el;
  }

});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', function() {
      console.log("hey I synced");
    });
}
});

var Messages = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',

  loadMessages: function() {
    this.fetch({})
  },

  parse: function(resp) {
    return resp.results;
  }

});

var app = new App();
var appView = new AppView();
