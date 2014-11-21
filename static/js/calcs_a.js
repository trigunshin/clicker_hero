var AbaddonMultiplier = null;

var GildedHeroes = [0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0];
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
  khrysos: {name: "Khrysos, Ancient of Inheritance", desc: "+50 starting Gold when Ascending", power: 1.5, maxlvl: 10, id: 6},
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
  bubos: {name: "Bubos, Ancient of Diseases", desc: "-2% boss life", power: 1, maxlvl: 25, id: 18},
  fragsworth: {name: "Fragsworth, Ancient of Wrath", desc: "+20% click damage", power: 1, id: 19},
  // vaagur
  kumawakamaru: {name: "Kumawakamaru, Ancient of Shadows", desc: "-1 monsters to advance", power: 1, maxlvl: 5, id: 21},
  chawedo: {name: "Chawedo, Ancient of Agitation", desc: "+2s Clickstorm duration", power: 1, maxlvl: 30, id: 22},
  hecatoncheir: {name: "Hecatoncheir, Ancient of Wallops", desc: "+2s Super Clicks duration", power: 1, maxlvl: 30, id: 23},
  berserker: {name: "Berserker, Ancient of Rage", desc: "+2s Powersurge duration", power: 1, maxlvl: 30, id: 24},
  sniperino: {name: "Sniperino, Ancient of Accuracy", desc: "+2s Lucky Strikes duration", power: 1, maxlvl: 30, id: 25},
  kleptos: {name: "Kleptos, Ancient of Thieves", desc: "+2s Golden Clicks duration", power: 1, maxlvl: 30, id: 26},
  energon: {name: "Energon, Ancient of Battery Life", desc: "+2s Metal Detector duration", power: 1, maxlvl: 30, id: 27},
  argaiv: {name: "Argaiv, Ancient of Enhancement", desc: "+2% Gilded bonus (per Gild)", power: 1, id: 28},
  juggernaut: {name: "Juggernaut, Ancient of Momentum", desc: "+0.01% DPS per click combo (active clicking)", power: 1.5, id: 29},
  iris: {name: "Iris, Ancient of Vision", desc: "+1 to starting zone after Ascension", power: 1.5, id: 30},
};
var AncientMin = 3;
var AncientMax = 30;

var AchievementMultiplier = 1;
var ToPurchase = [1,2,4,8,16,35,70,125,250,500,800,1200,1700,2200,2750,3400,4100,5000,6000,7500,10000,12500,16000,25000,35000,50000,70000,100000,150000,250000,400000];
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
  for (var i = AncientMin; i <= AncientMax; i++) {
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
  for (var i = AncientMin; i <= AncientMax; i++) {
    if (levels[i]) {
      owned++;
    }
  }
  var priceSet = 0;
  var remaining = (AncientMax - AncientMin + 1) - owned;
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
  Ancients[key].used = $("<input></input>").attr("type", "checkbox").attr("title", "Optimize this ancient");
  if (key != "khrysos" && key != "iris") {
    Ancients[key].used.prop("checked", true);
  }
  tr.append($("<td></td>").append(Ancients[key].used).append($("<span></span>").text(Ancients[key].name).attr("title", Ancients[key].desc)));
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
  for (var k = 0; k < GildedHeroes.length; k++) {
    GildedHeroes[k] = 0;
  }
  for (var k in heroes) {
    var id = parseInt(k);
    ascSouls += heroes[k].level;
    if (id < 2 || id > 26) continue;
    GildedHeroes[id - 2] = heroes[k].epicLevel;
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
  StartCompute();
}

function FormatFactor(fct) {
  return parseFloat(((fct - 1) * 100).toFixed(1)) + "%";
}
function FormatTime(sec) {
  if (sec > 3600 * 24) {
    var hours = Math.round(sec / 3600);
    var days = Math.floor(hours / 24);
    hours -= days * 24;
    if (hours) {
      return days + "d" + hours + "h";
    } else {
      return days + " days";
    }
  } else if (sec > 3600) {
    var mins = Math.round(sec / 60);
    var hours = Math.floor(mins / 60);
    mins -= hours * 60;
    if (mins) {
      return hours + "h" + mins + "m";
    } else {
      return hours + " hours";
    }
  } else {
    var mins = Math.round(sec / 60);
    return mins + " minutes";
  }
}

function AncientPrice(ancient, level) {
  var price = Math.round(Math.pow(level, Ancients[ancient].power));
  if (ancient == "kumawakamaru") {
    price *= 10;
  }
  return price;
}

var curAddAncients = null;
var curLevels = null;
var curUsed = null;
var curSouls = null;
var curActivity = null;
var curOutFactor = null;

var computeThread = null;
function onAddAncient(e) {
  var ancient = e.data.ancient;
  var ratio = e.data.outFactor.ratio;
  var pos = 0;
  while (pos < curAddAncients.length && curAddAncients[pos].ancient != ancient) {
    pos++;
  }
  if (pos >= curAddAncients.length) {
    return;
  }
  curAddAncients[pos].ratio = ratio;
  var newPos = pos;
  while (newPos > 0 && (!curAddAncients[newPos - 1].ratio || curAddAncients[newPos - 1].ratio < ratio)) {
    newPos--;
  }
  if (newPos < pos) {
    curAddAncients[newPos].line.before(curAddAncients[pos].line);
    var tmp = curAddAncients[pos];
    for (var i = pos; i > newPos; i--) {
      curAddAncients[pos] = curAddAncients[pos - 1];
    }
    curAddAncients[newPos] = tmp;
    pos = newPos;
  }
  $("#add" + ancient).text("(" + Math.round(ratio * 3600) + " souls/hour, " +
    FormatFactor(ratio / curOutFactor) + " increase).");
}
function onFinishCompute(e) {
  if (e.data.ancient) {
    return onAddAncient(e);
  }
  var levels = e.data.levels;
  var outFactor = e.data.outFactor;
  var initFactor = e.data.initFactor;
  var souls = e.data.souls;

  var soulsSpent = 0;
  for (var k in Ancients) {
    var level = parseInt(Ancients[k].level.val());
    for (var lvl = 2; lvl <= level; lvl++) {
      soulsSpent += AncientPrice(k, lvl);
    }
  }

  $("#soulsout").val(souls);
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      var oldLevel = parseInt(Ancients[k].level.val());
      if (levels[k] > oldLevel) {
        Ancients[k].targetBox.addClass("hilite");
        Ancients[k].target.val(levels[k] + " (+" + (levels[k] - oldLevel) + ")");
      } else {
        Ancients[k].targetBox.removeClass("hilite");
        Ancients[k].target.val(levels[k] ? levels[k] : "");
      }
    }
  }
  var outLog = "";
  outLog += "Souls/hour: " + Math.round(outFactor.ratio * 3600) + "<br/>\n";
  outLog += "Optimal level: " + outFactor.level + ", souls: " + Math.round(outFactor.souls) + ", time: " + FormatTime(outFactor.time) + "<br/>\n";
  outLog += "Improvement over current: " + FormatFactor(outFactor.ratio / initFactor.ratio) + "<br/>\n";
  if (AbaddonMultiplier) {
    outLog += "Current DR multiplier: " + AbaddonMultiplier.toFixed(3) + " (~" + Math.round(Math.log(AbaddonMultiplier) / Math.log(1.1)) + " uses)<br/>\n";
  }
  outLog += "Souls spent on ancient levels: " + soulsSpent + "<br/>\n";
  if (!e.data.working) {
    outLog += "<div id=\"addancients\"></div>\n";
  }
  $("#output").html(outLog);
  if (!e.data.working) {
    curOutFactor = outFactor.ratio;
    curAddAncients = [];
    var addList = $("#addancients");
    for (var k in Ancients) {
      if (!levels[k] && Ancients[k].price <= curSouls && Ancients[k].used.prop("checked")) {
        var curItem = {ancient: k};
        curItem.line = $("<div></div>").html(
          "<a href=\"javascript:void(0)\" class=\"buybtn\" aid=\"" + k + "\" title=\"" + Ancients[k].desc + "\">Purchase " +
          Ancients[k].name + "</a>: " + Ancients[k].price + " souls <span id=\"add" + k + "\">" +
          "<img src=\"http://www.rivsoft.net/content/ancientloader.gif\"/></span>");
        curAddAncients.push(curItem);
      }
    }
    curAddAncients.sort(function(a, b) {return Ancients[a.ancient].price - Ancients[b.ancient].price;});
    for (var i = 0; i < curAddAncients.length; i++) {
      addList.append(curAddAncients[i].line);
      var k = curAddAncients[i].ancient;
      var levels = $.extend({}, curLevels);
      levels[k] = 1;
      computeThread.postMessage({cmd: "Compute", levels: levels, souls: curSouls - Ancients[k].price,
        gilded: GildedHeroes, activity: curActivity, damageFactor: AchievementMultiplier, ancient: k, used: curUsed});
    }
    curLevels = null;
    curSouls = null;
    curActivity = null;
    curUsed = null;
    $(".buybtn").click(function() {
      var aid = $(this).attr("aid");
      Ancients[aid].level.val(1);
      $("#soulsin").val(parseInt($("#soulsin").val()) - Ancients[aid].price);
      StartCompute();
    });
  }
};

function StartCompute() {
  var levels = {};
  var used = {};
  var owned = OwnedNotInList;
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      levels[k] = parseInt(Ancients[k].level.val());
      if (levels[k]) {
        owned++;
      }
      if (Ancients[k].used.prop("checked")) {
        used[k] = true;
      }
    }
  }
  var souls = parseInt($("#soulsin").val());

  if (computeThread) {
    computeThread.terminate();
  }
  curAddAncients = null;
  //computeThread = new Worker("ancientsworker.js");
  computeThread = new Worker("static/js/ancientsworker10.js");
  computeThread.onmessage = onFinishCompute;

  var nextPrice = ToPurchase[owned];
  for (var k in Ancients) {
    if (!levels[k]) {
      Ancients[k].price = nextPrice;
      if (Ancients[k].rolls) {
        Ancients[k].price += Math.ceil(nextPrice / 3) * Ancients[k].rolls;
      }
    }
  }

  var activity = null;
  if (!$("#idlemode").prop("checked")) {
    activity = {};
    var cdTypes = ["full", "half", "short"];
    for (var i = 0; i < cdTypes.length; i++) {
      activity[cdTypes[i]] = {count: parseFloat($("#cd" + cdTypes[i] + "num").val()),
                              cps:   parseFloat($("#cd" + cdTypes[i] + "cps").val())};
    }
    activity.none = parseFloat($("#cdnonecps").val());
  }

  $("#output").empty();

  curLevels = levels;
  curSouls = souls;
  curActivity = activity;
  curUsed = used;
  computeThread.postMessage({cmd: "Compute", levels: levels, souls: souls, gilded: GildedHeroes, activity: activity,
    damageFactor: AchievementMultiplier, used: used});
}