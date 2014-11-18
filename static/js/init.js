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