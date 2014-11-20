$("#idlemode").change(function() {
  if (this.checked) {
    $("#nonidle").slideUp();
  } else {
    $("#nonidle").slideDown();
  }
});

var AbaddonMultiplier = null;

var Heroes = [
  {name: "Tree Beast", cost: 50, damage: 5 * 20, level: 100},
  {name: "Ivan, the Drunken Brawler", cost: 250, damage: 22 * 20, level: 125},
  {name: "Brittany, the Beach Princess", cost: 1000, damage: 74 * 20, level: 75},
  {name: "The Wandering Fisherman", cost: 4000, damage: 245 * 8, level: 100},
  {name: "Betty Clicker", cost: 20000, damage: 976, level: 100},
  {name: "The Masked Samurai", cost: 100e3, damage: 3725 * 20, level: 75},
  {name: "Leon", cost: 400e3, damage: 10859 * 8, level: 75},
  {name: "The Great Forest Seer", cost: 2500e3, damage: 47143 * 20, level: 75},
  {name: "Alexa, the Assassin", cost: 15000e3, damage: 186e3 * 5.0625, level: 100},
  {name: "Natalia, Ice Apprentice", cost: 100e6, damage: 782e3 * 20, level: 75},
  {name: "Mercedes, Duchess of Blades", cost: 800e6, damage: 3721e3 * 20, level: 100},
  {name: "Bobby, Bounty Hunter", cost: 6500e6, damage: 17010e3 * 20, level: 100},
  {name: "Broyle Lindoven, Fire Mage", cost: 50e9, damage: 69480e3 * 10, level: 100},
  {name: "Sir George II, King's Guard", cost: 450e9, damage: 460e6 * 20, level: 100},
  {name: "King Midas", cost: 4e12, damage: 3017e6, level: 125},
  {name: "Referi Jerator, Ice Wizard", cost: 36e12, damage: 20009e6 * 20, level: 125},
  {name: "Abaddon", cost: 320e12, damage: 131e9 * 11.390625, level: 75},
  {name: "Ma Zhu", cost: 2.7e15, damage: 814e9 * 20, level: 75},
  {name: "Amenhotep", cost: 24e15, damage: 5335e9 * 2, level: 50},
  {name: "Beastlord", cost: 300e15, damage: 49143e9 * 8, level: 100},
  {name: "Athena, Goddess of War", cost: 9e18, damage: 1086e12 * 16, level: 100},
  {name: "Aphrodite, Goddess of Love", cost: 350e18, damage: 31124e12 * 16, level: 125},
  {name: "Shinatobe, Wind Deity", cost: 14e21, damage: 917e15 * 8, level: 100},
  {name: "Grant, the General", cost: 4199e21, damage: 202e18 * 4, level: 75},
  {name: "Frostleaf", cost: 2100e24, damage: 74698e18 * 4, level: 75},
];
var Achievements = {
  "13": 1, // hoard
  "14": 2, // hoard
  "15": 3, // hoard
   "1": 1, // zone
   "2": 2, // zone
   "3": 3, // zone
  "61": 0, // omeet
  "33": 1, // dps
  "34": 2, // dps
  "35": 3, // dps
  "37": 0, // click 12
  "38": 0, // click 14
  "39": 3, // click
  "41": 3, // crit
  "43": 0, // ascend 1
  "44": 0, // ascend 3
  "45": 0, // ascend 5
  "46": 0, // ascend 10
  "59": 0, // ascend 25
  "21": 1, // boss
  "22": 2, // boss
  "23": 3, // boss
   "5": 1, // click
   "6": 2, // click
   "7": 3, // click
   "9": 1, // gold
  "10": 2, // gold
  "11": 3, // gold
  "29": 1, // level
  "30": 2, // level
  "31": 3, // level
  "17": 1, // kill
  "18": 2, // kill
  "19": 3, // kill
  "25": 1, // upgrade
  "26": 2, // upgrade
  "27": 3, // upgrade
};
var Upgrades = {
  "12": 25,
  "25": 20,
  "26": 20,
  "27": 20,
  "28": 20,
  "36": 25,
  "57": 25,
  "82": 20,
  "83": 20,
  "87": 10,
  "97": 10,
  "120": 25,
  "122": 25,
  "126": 25,
};
var Ancients = {
  solomon: {name: "Solomon, Ancient of Wisdom", desc: "+5% to 1% Primal hero souls", power: 1.5, id: 3},
  libertas: {name: "Libertas, Ancient of Freedom", desc: "+25% to +15% idle Gold", power: 1, id: 4},
  siyalatas: {name: "Siyalatas, Ancient of Abandon", desc: "+25% to +15% idle DPS", power: 1, id: 5},
  // khrysos
  // thusia
  mammon: {name: "Mammon, Ancient of Greed", desc: "+5% Gold", power: 1, id: 8},
  mimzee: {name: "Mimzee, Ancient of Riches", desc: "+50% treasure chest Gold", power: 1, id: 9},
  pluto: {name: "Pluto, Ancient of Wealth", desc: "+30% Golden Clicks Gold", power: 1, id: 10},
  dogcog: {name: "Dogcog, Ancient of Thrift", desc: "-2% hero cost", power: 1, maxlvl: 25, id: 11},
  fortuna: {name: "Fortuna, Ancient of Chance", desc: "+0.25% chance of 10x Gold", power: 1, maxlvl: 40, id: 12},
  atman: {name: "Atman, Ancient of Souls", desc: "+1% primal boss chance", power: 1.5, maxlvl: 25, id: 13},
  dora: {name: "Dora, Ancient of Discovery", desc: "+20% more Treasure Chests", power: 1, maxlvl: 50, id: 14},
  bhaal: {name: "Bhaal, Ancient of Murder", desc: "+15% critical damage", power: 1, id: 15},
  morgulis: {name: "Morgulis, Ancient of Death", desc: "+11% DPS per Hero Soul Spent (cumulative)", power: 0, id: 16},
  // chronos
  // bubos
  fragsworth: {name: "Fragsworth, Ancient of Wrath", desc: "+20% click damage", power: 1, id: 19},
  // vaagur
  // kumawakamaru
  chawedo: {name: "Chawedo, Ancient of Agitation", desc: "+2s Clickstorm duration", power: 1, maxlvl: 30, id: 22},
  hecatoncheir: {name: "Hecatoncheir, Ancient of Wallops", desc: "+2s Super Clicks duration", power: 1, maxlvl: 30, id: 23},
  berserker: {name: "Berserker, Ancient of Rage", desc: "+2s Powersurge duration", power: 1, maxlvl: 30, id: 24},
  sniperino: {name: "Sniperino, Ancient of Accuracy", desc: "+2s Lucky Strikes duration", power: 1, maxlvl: 30, id: 25},
  kleptos: {name: "Kleptos, Ancient of Thieves", desc: "+2s Golden Clicks duration", power: 1, maxlvl: 30, id: 26},
  energon: {name: "Energon, Ancient of Battery Life", desc: "+2s Metal Detector duration", power: 1, maxlvl: 30, id: 27},
  argaiv: {name: "Argaiv, Ancient of Enhancement", desc: "+2% Gilded bonus (per Gild)", power: 1, id: 28},
};

var ToPurchase = [1,2,4,8,16,35,70,125,250,500,800,1200,1700,2200,2750,3400,4100,5000,6000,7500,10000,12500,16000,20000,25000,31000,38000];
var Seed = null;
var OwnedNotInList = 1;
function Random(a, b) {
  Seed = (Seed * 16807) % 2147483647;
  return (Seed % (b - a)) + a;
}
function RandRoll(cnt) {
  for (var i = 0; i < cnt; i++) {
    Random(0, 1);
  }
}
function GetAncientsList(levels, first) {
  var SaveSeed = Seed;
  var remains = [];
  for (var i = 3; i <= 28; i++) {
    if (!levels[i]) {
      remains.push(i);
    }
  }
  var out = {};
  var count = 0;
  if (!levels[20] && first) {
    out[20] = true;
    count++;
  }
  while (count < 4 && count < remains.length) {
    var cur = Random(0, remains.length);
    if (!levels[remains[cur]] && !out[remains[cur]]) {
      out[remains[cur]] = true;
      count++;
    }
  }
  Seed = SaveSeed;
  return out;
}
function SetDifference(a, b) {
  var cnt = 0;
  for (var k in b) {
    if (!a.hasOwnProperty(k)) {
      cnt++;
    }
  }
  return cnt;
}
function UpdateAncientPrices(levels, didGetVaagur) {
  var prices = {};
  var owned = 0;
  for (var i = 3; i <= 28; i++) {
    if (levels[i]) {
      owned++;
    }
  }
  var priceSet = 0;
  var remaining = 26 - owned;
  var curSet = GetAncientsList(levels, !didGetVaagur);
  for (var k in curSet) {
    prices[k] = 0;
    priceSet++;
  }
  var curPrice = 0;
  while (priceSet < remaining) {
    var nextSet = {};
    while (SetDifference(curSet, nextSet) < Math.min(4, remaining - 4)) {
      RandRoll(4);
      nextSet = GetAncientsList(levels);
    }
    curPrice += 1;
    curSet = nextSet;
    for (var k in curSet) {
      if (!prices.hasOwnProperty(k)) {
        prices[k] = curPrice;
        priceSet++;
      }
    }
  }
  for (var i in Ancients) {
    var id = Ancients[i].id;
    if (levels[id] || !prices[id]) {
      Ancients[i].rolls = 0;
    } else {
      Ancients[i].rolls = prices[id];
    }
  }
}

var ancientList = [];
for (var k in Ancients) {
  if (Ancients.hasOwnProperty(k)) {
    ancientList.push(k);
  }
}
ancientList.sort();
for (var i = 0; i < ancientList.length; i++) {
  var key = ancientList[i];
  var tr = $("<tr></tr>");
  tr.append($("<td></td>").text(Ancients[key].name).attr("title", Ancients[key].desc));
  Ancients[key].level = $("<input></input>").attr("type", "text").val(0);
  Ancients[key].target = $("<input></input>").attr("type", "text").attr("readonly", "readonly").attr("tabindex", "-1");
  Ancients[key].targetBox = $("<td></td>").append(Ancients[key].target);
  tr.append($("<td></td>").append(Ancients[key].level)).append(Ancients[key].targetBox);
  $("#herotbl").append(tr);
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
  for (var k = 0; k < Heroes.length; k++) {
    Heroes[k].level = 0;
    Heroes[k].gilded = 0;
  }
  for (var k in heroes) {
    var id = parseInt(k);
    ascSouls += heroes[k].level;
    if (id < 2 || id > 26) continue;
    Heroes[id - 2].gilded = heroes[k].epicLevel;
  }
  ascSouls = Math.floor(ascSouls / 2000) + data.primalSouls;
  var lambda = Math.log(4) / 25 + Math.log(2.5) / 1000;
  var _Damage = function(hero, lvl) {
    var x10 = lvl / 1000;
    var x4 = (lvl - 175) / 25;
    return hero.damage * lvl * Math.pow(4, x4) * Math.pow(2.5, x10);
  }
  var _dDamage = function(hero, lvl) {
    return hero.damage * (1 + 0.5 * hero.gilded) * (1 + lambda * lvl) * Math.exp(lambda * lvl);
  }
  var _dCost = function(hero, lvl) {
    return hero.cost * Math.pow(1.07, lvl);
  }
  var srcDamage = 0;
  var dstDamage = 0;
  for (var i = 0; i < Heroes.length; i++) {
    var left = 100;
    var right = 4000;
    while (right - left > 0.5) {
      var mid = (left + right) / 2;
      if (_dDamage(Heroes[i], mid) / _dCost(Heroes[i], mid) < 1e-10) {
        right = mid;
      } else {
        left = mid;
      }
    }
    var lvl = Math.floor((left + right) / 2);
    srcDamage += _Damage(Heroes[i], lvl) * (1 + 0.5 * Heroes[i].gilded);
    dstDamage += _Damage(Heroes[i], lvl) * (1 + 0.52 * Heroes[i].gilded);
  }
  // dst / src = (1 + 0.52 * e) / (1 + 0.5 * e)
  var effRatio = dstDamage / srcDamage;
  var effGild = (effRatio - 1) / (0.52 - 0.5 * effRatio);
  $("#gildlevel").val(effGild.toFixed(1));

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
  for (var k in data.upgrades) {
    if (data.upgrades[k] && Upgrades.hasOwnProperty(k)) {
      mult *= 1 + 0.01 * Upgrades[k];
    }
  }
  AbaddonMultiplier = data.allDpsMultiplier / mult;

  Seed = data.ancients.ancientsRoller.seed;
  var levels = {};
  OwnedNotInList = 0;
  for (var i = 3; i <= 28; i++) {
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
  UpdateAncientPrices(levels, data.ancients.didGetVaagur);

  $("#soulsin").val(data.heroSouls + ($("#addsouls").prop("checked") ? ascSouls : 0));
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      if (data.ancients.ancients[Ancients[k].id]) {
        Ancients[k].level.val(data.ancients.ancients[Ancients[k].id].level);
      } else {
        Ancients[k].level.val(0);
      }
    }
  }
  Compute();
}

function IdleValue(level) {
  var value = 0;
  var add = 25;
  while (add > 15 && level > 10) {
    value += add * 10;
    add -= 1;
    level -= 10;
  }
  return value + add * level;
}
function SolomonValue(level) {
  var value = 0;
  var add = 5;
  while (add > 1 && level > 20) {
    value += add * 20;
    add -= 1;
    level -= 20;
  }
  return value + add * level;
}

function FormatFactor(fct) {
  return parseFloat(((fct - 1) * 100).toFixed(1)) + "%";
}

function Compute() {
  var levels = {};
  var owned = OwnedNotInList;
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      levels[k] = parseInt(Ancients[k].level.val());
      if (levels[k]) {
        owned++;
      }
    }
  }
  var souls = parseInt($("#soulsin").val());

  var nextPrice = ToPurchase[owned];
  for (var k in Ancients) {
    if (!levels[k]) {
      Ancients[k].price = nextPrice;
      if (Ancients[k].rolls) {
        Ancients[k].price += Math.ceil(nextPrice / 3) * Ancients[k].rolls;
      }
    }
  }

  var getFactor = function(noMorgulis) {
    var total = 0;
    var clickFactor = 0.035 * (1 + 0.2 * levels.fragsworth);
    var crit = 18 * (1 + 0.15 * levels.bhaal) - 1;
    var gild = parseFloat($("#gildlevel").val());

    var getBurst = function(list, cps) {
      var durations = [];
      var cdset = {};
      for (var i = 0; i < list.length; i++) {
        durations.push(levels[list[i]]);
        cdset[list[i]] = true;
      }
      durations.sort();
      var result = 0;
      for (var i = 0; i < durations.length; i++) {
        var dur = durations[i];
        if (i == 0 || dur > durations[i - 1]) {
          var dtime = (dur * 2 + 30) - (i > 0 ? (durations[i - 1] * 2 + 30) : 0);
          var clickspeed = cps + (cdset.chawedo && levels.chawedo >= dur ? 10 : 0);
          var critchance = 0.09 + (cdset.sniperino && levels.sniperino >= dur ? 0.50 : 0);
          var goldclicks = (cdset.kleptos && levels.kleptos >= dur ? 0.002 * clickspeed * (1 + 0.3 * levels.pluto) : 0);
          var powersurge = (cdset.berserker && levels.berserker >= dur ? 2 : 1);
          var goldfactor = (cdset.energon && levels.energon >= dur ? 2 : 1);
          var superclicks = (cdset.hecatoncheir && levels.hecatoncheir >= dur ? 3 : 1);
          result += dtime * goldfactor * powersurge *
            (1 + superclicks * (critchance * crit + 1) * clickspeed * clickFactor) * (1 + goldclicks);
        }
      }
      return [result, durations[durations.length - 1] * 2 + 30];
    };

    var remains = 1800;
    var remainsIdle = 1800;
    var remainsCps = 0;
    if (!$("#idlemode").prop("checked")) {
      var fullNum = parseFloat($("#cdfullnum").val());
      if (fullNum > 1e-3) {
        var cps = parseFloat($("#cdfullcps").val());
        var burst = getBurst(["chawedo", "sniperino", "kleptos", "berserker", "energon", "hecatoncheir"], cps);
        total += burst[0] * fullNum;
        remains -= burst[1] * fullNum;
        remainsIdle -= (burst[1] + 60) * fullNum;
      }
      var halfNum = parseFloat($("#cdhalfnum").val());
      if (halfNum > 1e-3) {
        var cps = parseFloat($("#cdhalfcps").val());
        var burst = getBurst(["chawedo", "sniperino", "berserker", "energon"], cps);
        total += burst[0] * halfNum;
        remains -= burst[1] * halfNum;
        remainsIdle -= (burst[1] + 60) * halfNum;
      }
      var shortNum = parseFloat($("#cdshortnum").val());
      if (shortNum > 1e-3) {
        var cps = parseFloat($("#cdshortcps").val());
        var burst = getBurst(["chawedo", "berserker"], cps);
        total += burst[0] * shortNum;
        remains -= burst[1] * shortNum;
        remainsIdle -= (burst[1] + 60) * shortNum;
      }
      remainsCps = parseFloat($("#cdnonecps").val());
    }
    if (remainsCps > 1e-3) {
      total += Math.max(remains, 0) * (1 + (0.09 * crit + 1) * clickFactor * remainsCps);
    } else {
      remains = Math.max(remains, 0);
      remainsIdle = Math.max(remainsIdle, 0);
      total += (remains - remainsIdle) + remainsIdle * (1 + 0.01 * IdleValue(levels.siyalatas))
                                                     * (1 + 0.01 * IdleValue(levels.libertas));
    }
    total /= 1800;

    total *= 1 + 0.01 * (1 + 0.2 * levels.dora) * (10 * (1 + levels.mimzee * 0.5) - 1);
    total *= 1 + 0.05 * levels.mammon;
    total *= 1 + (0.0025 * levels.fortuna) * 9;
    total /= 1 - 0.02 * levels.dogcog;
    if (noMorgulis) {
      total *= 1 + 0.11 * levels.morgulis + 0.1 * souls;
    } else {
      total *= 1 + (levels.morgulis ? 0.11 : 0.1) * (souls + levels.morgulis);
    }
    total *= (1 + 0.19 * levels.atman / 5.75) * (1 + 0.01 * SolomonValue(levels.solomon));
    total *= (1 + gild * (0.5 + 0.02 * levels.argaiv)) / (1 + gild * 0.5);

    return total;
  };

  var Solve = function() {
    while (true) {
      var initial = getFactor();
      var best = null;
      var bestfactor = 0;
      for (var k in Ancients) {
        if (Ancients.hasOwnProperty(k) && levels[k] && k != "morgulis") {
          var price = Math.floor(Math.pow(levels[k] + 1, Ancients[k].power) + 0.5);
          if (souls >= price && (!Ancients[k].maxlvl || levels[k] < Ancients[k].maxlvl)) {
            levels[k] += 1;
            souls -= price;
            var cur = (getFactor() - initial) / price;
            if (cur > bestfactor) {
              best = k;
              bestfactor = cur;
            }
            levels[k] -= 1;
            souls += price;
          }
        }
      }
      if (!best) {
        break;
      }
      levels[best] += 1;
      souls -= Math.floor(Math.pow(levels[best], Ancients[best].power) + 0.5);
    }
    if (levels.morgulis) {
      levels.morgulis += souls;
      souls = 0;
    }
    return getFactor();
  }

  var initFactor = getFactor(true);

  var savedLevels = $.extend({}, levels);
  var savedSouls = souls;

  var outFactor = Solve();

  $("#soulsout").val(souls);
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      if(levels[k]) {
        var level_diff = levels[k] - Ancients[k].level.val();
        var output_string = ""+levels[k];
        if(level_diff) {
          output_string += " (+"+level_diff+")";
        }
        Ancients[k].target.val(output_string);
      } else {
        Ancients[k].target.val("");
      }
      if (levels[k] != parseInt(Ancients[k].level.val())) {
        Ancients[k].targetBox.addClass("hilite");
      } else {
        Ancients[k].targetBox.removeClass("hilite");
      }
    }
  }
  var outLog = "<ul>";
  outLog += "<li>Efficiency multiplier: " + outFactor.toExponential(3).replace("+", "") + "<br/>\n</li>";
  outLog += "<li>Improvement over current: " + FormatFactor(outFactor / initFactor) + "<br/>\n</li>";
  if (AbaddonMultiplier) {
    outLog += "<li>Without current Dark Ritual stacks: " + FormatFactor(outFactor / initFactor / AbaddonMultiplier) +
      " (current DR multiplier is " + AbaddonMultiplier.toFixed(3) + ", ~" + Math.round(Math.log(AbaddonMultiplier) / Math.log(1.1)) + " uses)<br/>\n</li>";
  }
  var effAncients = [];
  if ($("#suggestbuy").prop("checked")) {
    for (var k in Ancients) {
      if (!savedLevels[k] && Ancients[k].price <= savedSouls) {
        levels = $.extend({}, savedLevels);
        souls = savedSouls - Ancients[k].price;
        levels[k] = 1;
        var tmpFactor = Solve();
        effAncients.push({ancient: k, factor: tmpFactor});
      }
    }
  }
  effAncients.sort(function(a, b) {return b.factor - a.factor;});
  for (var i = 0; i < effAncients.length; i++) {
    var ancient = Ancients[effAncients[i].ancient];
    outLog += "<li><a href=\"javascript:void(0)\" class=\"buybtn\" aid=\"" + effAncients[i].ancient + "\" title=\"" + ancient.desc + "\">Purchase " + ancient.name + "</a>: " +
              ancient.price + " souls, " + effAncients[i].factor.toExponential(3).replace("+", "") + " efficiency (" + FormatFactor(effAncients[i].factor / outFactor) +
              " improvement).<br/>\n</li>";
  }
  outLog += "</ul>";
  $("#output").html(outLog);
  $(".buybtn").click(function() {
    var aid = $(this).attr("aid");
    Ancients[aid].level.val(1);
    $("#soulsin").val(parseInt($("#soulsin").val()) - Ancients[aid].price);
    Compute();
  });
}