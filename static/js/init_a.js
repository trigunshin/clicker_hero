_.templateSettings.variable = "rc";
// game render
var game_template = _.template(
    $("script#game_area_template").html()
);
var game_template_data = {
    height: 640,
    width: 1136,
    ch_version: 3670
};
$('#game_template_anchor').after(game_template(game_template_data));

// load rler ancient's calc and output area
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

// load hero tab
var hero_template = _.template(
    $("script#hero_area_template").html()
);
var hero_template_data = {};
$('#hero_template_anchor').after(hero_template(hero_template_data));

// load chat tab
var chat_template = _.template($("script#chat_template").html());
$('#chat_template_anchor').append(chat_template());

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

// tryhard functioning
function hide_flash() {
  $("#flash_container").css('visibility', 'hidden');
  toggle_flash = show_flash;
}
function show_flash() {
  $("#flash_container").css('visibility', 'visible');
  toggle_flash = hide_flash;
}
var toggle_flash = hide_flash;
function toggle_flash_fn() {
  toggle_flash();
}

$("button#flash_visibility_toggle").click(toggle_flash_fn);
