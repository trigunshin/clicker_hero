_.templateSettings.variable = "rc";
// game render
var game_template = _.template(
    $("script#game_area_template").html()
);
var game_template_data = {
    height: 640,
    width: 1136,
    ch_version: 2312
};
$('#game_template_anchor').after(game_template(game_template_data));

// calculator render
var calc_template = _.template(
    $("script#calc_area_template").html()
);
var calc_template_data = {};
$('#calc_template_anchor').after(calc_template(calc_template_data));

// set up on-click for game reload button
$('div#reload_flash').click(function() {
     var clone = $('#flashContent object').clone();
      $('#flashContent object').remove();
     $('#flashContent').append(clone);
});

// function: var boss_hp = 10 * (1.6 ^ 139 + 139) * 1.15 ^ (level – 140) * 10
//  hp = 10 * (1.6 ^ (level – 1) + (level – 1))
$('button#boss_health_button').click(function() {
    var level = 0+$('input#boss_level').val();
    var boss_hp = null;
    if(level > 139) {
        boss_hp = 10 * (1.6 ^ ((level - 1) + (level - 1))) * 10
    } else {
        boss_hp = 10 * (1.6 ^ 139 + 139) * 1.15 ^ (level - 140) * 10
    }
    console.log(boss_hp);
    $('div#boss_health_result').html(boss_hp);
});
