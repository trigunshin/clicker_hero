'use strict';
//////////////////
//     app      //
//////////////////
var clickerCalcs = angular.module('clickerCalcApp', []);
//////////////////
// controllers  //
//////////////////
clickerCalcs.controller('ClickerCalcCtrl', function($scope) {
    $scope.known_ancients = Ancients;
    $scope.game_data = {
        height: 640,
        width: 1136,
        ch_version: 3670
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
    };

    // load chat tab
    var chat_template = _.template($("script#chat_template").html());
    $('#jayeeyeechat').append(chat_template());
  });
////////////////////
//    app setup   //
////////////////////
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
$('#game_template_anchor').append(game_template(game_template_data));

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






////////////////////
//    calc_a.js   //
////////////////////
var AbaddonMultiplier = null;
var AncientMin = 3;
var AncientMax = 31;

var AchievementMultiplier = 1;
var ToPurchase = [1,2,4,8,16,35,70,125,250,500,800,1200,1700,2200,2750,3400,4100,5000,6000,7500,10000,12500,16000,25000,35000,50000,70000,100000,150000,250000,400000];
var Seed = null;
var OwnedNotInList = 1;

function decode_save() {

}

const ANTI_CHEAT_CODE = "Fe12NAfA3R6z4k0z";
const SALT = "af0ik392jrmt0nsfdghy0";
function Import() {
  var txt = $("#savedata").val();
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

  var heroes = data.heroCollection.heroes;
  var ascSouls = 0;
  for (var k in heroes) {
    var id = parseInt(k);
    ascSouls += heroes[k].level;
    if (id < 2 || id > 35) continue;
  //Heroes[id - 2].gildBox.text(heroes[k].epicLevel);
  }
  ascSouls = Math.floor(ascSouls / 2000) + data.primalSouls;

  var mult = 1;
  for (var k in data.achievements) {
    if (data.achievements[k]) {
      if (Achievements.hasOwnProperty(k)) {
        mult *= 1 + 0.01 * Achievements[k];
      } else {
        mult *= 1.05;
      }
    }
  }
  AchievementMultiplier = mult;
  for (var k in data.upgrades) {
    if (data.upgrades[k] && Upgrades.hasOwnProperty(k)) {
      mult *= 1 + 0.01 * Upgrades[k];
    }
  }
  for (var k in Upgrades) {
    AchievementMultiplier *= (1 + 0.01 * Upgrades[k]);
  }
  AbaddonMultiplier = data.allDpsMultiplier / mult;

  Seed = data.ancients.ancientsRoller.seed;
  var levels = {};
  OwnedNotInList = 0;
  for (var i = AncientMin; i <= AncientMax; i++) {
    if (data.ancients.ancients.hasOwnProperty(i)) {
      levels[i] = true;
      OwnedNotInList += 1;
    }
  }
  for (var k in Ancients) {
    if (levels[Ancients[k].id]) {
      OwnedNotInList -= 1;
    }
  }
  //UpdateAncientPrices(levels, data.ancients.didGetVaagur);

/*
  $("#soulsin").text(data.heroSouls + ($("#addsouls").prop("checked") ? ascSouls : 0));
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      if (data.ancients.ancients[Ancients[k].id]) {
        Ancients[k].level.text(data.ancients.ancients[Ancients[k].id].level);
      } else {
        Ancients[k].level.text(0);
      }
    }
  }
  StartCompute();
  //*/
}