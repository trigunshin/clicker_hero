'use strict';
//////////////////
//     app      //
//////////////////
var clickerCalcs = angular.module('clickerCalcApp', []);
//////////////////
// controllers  //
//////////////////
function calc_base(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    return Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level);
};
function calc_morgulis(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    var player_argaiv_lvl = _.get(player_ancients, argaiv_id+'.level');
    var player_siya_lvl = _.get(player_ancients, siya_id+'.level');
    // get max of argaiv/siya, then square it
    return Math.pow(Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level),  2);
};
function calc_gold(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    var player_argaiv_lvl = _.get(player_ancients, argaiv_id+'.level');
    var player_siya_lvl = _.get(player_ancients, siya_id+'.level');
    // get max of argaiv/siya, then .93 & round up
    return Math.ceil(Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level) * .93);
};
function calc_clicks(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    var player_argaiv_lvl = _.get(player_ancients, argaiv_id+'.level');
    var player_siya_lvl = _.get(player_ancients, siya_id+'.level');
    // get max of argaiv/siya, then .5 & round up
    return Math.ceil(Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level) * .5);
};
function calc_jugg(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    var player_argaiv_lvl = _.get(player_ancients, argaiv_id+'.level');
    var player_siya_lvl = _.get(player_ancients, siya_id+'.level');
    // get max of argaiv/siya, then .5 & round up
    return Math.ceil(Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level) * .2);
};
function calc_solomon(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    var player_argaiv_lvl = _.get(player_ancients, argaiv_id+'.level');
    var player_siya_lvl = _.get(player_ancients, siya_id+'.level');
    // get max of argaiv/siya, then .5 & round up
    return Math.ceil(Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level) * .9);
};
function calc_iris(ancients, player_ancients) {
    var siya_id = ancients.siyalatas.id;
    var argaiv_id = ancients.argaiv.id;
    var player_argaiv_lvl = _.get(player_ancients, argaiv_id+'.level');
    var player_siya_lvl = _.get(player_ancients, siya_id+'.level');
    // get max of argaiv/siya, then -300 & set min at 99
    return Math.max(Math.max(player_ancients[siya_id].level, player_ancients[argaiv_id].level) - 300, 99);
};

clickerCalcs.controller('ClickerCalcCtrl', function($scope) {
    $scope.known_ancients = Ancients;
    $scope.known_ancients_names = _.keys(Ancients);
    $scope.idle_mode = true;

    // model
    $scope.ancient_data_by_id = _.reduce(_.values(Ancients), function(ancients_by_id, ancient) {
        ancients_by_id[ancient.id] = ancient;
        ancients_by_id[ancient.id].current = 0;
        ancients_by_id[ancient.id].target = 0;
        return ancients_by_id;
    }, {});

    $scope.game_data = {
        height: 640,
        width: 1136,
        ch_version: 3670
    };

    $scope.thumb_funcs = {
        5: calc_base,
        28: calc_base,
        16: calc_morgulis,
        4: calc_gold,
        8: calc_gold,
        9: calc_gold,
        15: calc_clicks,
        19: calc_clicks,
        29: calc_jugg,
        3: calc_solomon,
        30: calc_iris
    };
    $scope.thumb_funcs_idle = {
        5: calc_base,
        28: calc_base,
        16: calc_morgulis,
        4: calc_gold,
        8: calc_gold,
        9: calc_gold,
        3: calc_solomon,
        30: calc_iris
    };

    $scope.game_visible = true;
    $scope.toggle_game = function() {
        if($scope.game_visible) {
            $scope.game_visible = false;
            $("#flash_container").css('visibility', 'hidden');
        } else {
            $scope.game_visible = true;
            $("#flash_container").css('visibility', 'visible');
        }
    }
    $scope.reload_game = function() {
        var clone = $('#flashContent object').clone();
        $('#flashContent object').remove();
        $('#flashContent').append(clone);
    }
    $scope.import = function(save_data) {
        var ANTI_CHEAT_CODE = "Fe12NAfA3R6z4k0z";
        var SALT = "af0ik392jrmt0nsfdghy0";
        var txt = save_data;
        if (txt.search(ANTI_CHEAT_CODE) != -1) {
            var result = txt.split(ANTI_CHEAT_CODE);
            txt = "";
            for (var i = 0; i < result[0].length; i += 2) {
              txt += result[0][i];
            }
            if (CryptoJS.MD5(txt + SALT) != result[1]) {
              alert("Bad hash");
              return;
            }
        }
        var data = $.parseJSON(atob(txt));
        console.log(data);
        $scope.data = data;
        $scope.post_import();
    };
    $scope.post_import = function() {
        // get the new data per-ancient
        var imported_ancient_data = $scope.data.ancients.ancients;
        // respect idle mode
        var funcs = $scope.idle_mode ? $scope.thumb_funcs_idle: $scope.thumb_funcs;

        _.each(imported_ancient_data, function(ancient, ancient_id) {
            // update the current 'current' value
            var cur_ancient = _.get($scope.ancient_data_by_id, ancient.id, false);
            if(cur_ancient === false) return;
            cur_ancient.current = ancient.level;

            // if we have a fn for the ancient, calc the new target
            var calc_function = _.get(funcs, cur_ancient.id, false);
            if(calc_function === false) return;
            cur_ancient.target = calc_function(
                $scope.known_ancients, imported_ancient_data);
        });

        // trigger old rler calculations
        Import();
    };

    $scope.idle_change = function() {
        if($scope.idle_mode) {
            $("#nonidle").slideUp();
        } else {
            $("#nonidle").slideDown();
        }
    };

    // load chat tab
    var chat_template = _.template($("script#chat_template").html());
    $('#jayeeyeechat').append(chat_template());
  });

////////////////////
//    app setup   //
////////////////////
_.templateSettings.variable = "rc";
// set up on-click for game reload button
$('#reload_flash').click(function() {
     var clone = $('#flashContent object').clone();
      $('#flashContent object').remove();
     $('#flashContent').append(clone);
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
