_.templateSettings.variable = "rc";
// game render
var game_template = _.template(
    $("script#game_area_template").html()
);
var game_template_data = {
    height: 640,
    width: 1136,
    ch_version: 2492
};
$('#game_template_anchor').after(game_template(game_template_data));

// calculator render
var calc_config_template = _.template(
    $("script#calc_config_template").html()
);
var calc_template = _.template(
    $("script#calc_area_template").html()
);
var calc_template_data = {};
$('#calc_template_anchor').after(calc_template(calc_template_data));
var calc_config_template_data = {};
$('#calc_config_anchor').after(calc_config_template(calc_config_template_data));

// set up on-click for game reload button
$('#reload_flash').click(function() {
     var clone = $('#flashContent object').clone();
      $('#flashContent object').remove();
     $('#flashContent').append(clone);
});

$("#idlemode").change(function() {
  if (this.checked) {
    $("#nonidle").slideUp();
  } else {
    $("#nonidle").slideDown();
  }
});

// set up chat
// Create a new Firebase reference, and a new instance of the Login client
var chatRef = new Firebase('https://incandescent-torch-6939.firebaseio.com/chat');
chatRef.onAuth(function(authData) {
  // Once authenticated, instantiate Firechat with our user id and user name
  console.log('auth data:'+JSON.stringify(authData));
  if (authData) {
    var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
    chat.setUser(authData.uid, authData[authData.provider].displayName);
  }
});
function login(provider) {
  chatRef.authWithOAuthPopup(provider, function(error, authData) {
  //chatRef.authAnonymously(function(error, authData) {
    console.log(authData);
    if (error) {
      console.log(error);
    }
  });
}
