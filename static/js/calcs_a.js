var loadSpinner = new Spinner({});

var AbaddonMultiplier = null;
var AncientMin = 3;
var AncientMax = 31;

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
function GetGildedHeroes() {
  var gildedHeroes = new Array(Heroes.length);
  for (var i = 0; i < Heroes.length; i++) {
    Heroes[i].gilded = parseInt(Heroes[i].gildBox.text());
    gildedHeroes[i] = Heroes[i].gilded;
    if (!gildedHeroes[i]) {
      Heroes[i].gilded = 0;
      gildedHeroes[i] = 0;
    }
  }
  return gildedHeroes;
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
var items = {};
var ancientList = [];
for (var k in Ancients) {
  if (Ancients.hasOwnProperty(k)) {
    ancientList.push(k);
  }
}
ancientList.sort();
for (var i = 0; i < ancientList.length; i++) {
  var key = ancientList[i];
  var tr = Ancients[key].targetBox = $("<tr></tr>");
  Ancients[key].used = $("<input></input>").attr("type", "checkbox").attr("title", "Optimize this ancient").addClass("chkAncient");
  Ancients[key].used.prop("checked", true);
  tr.append($("<td></td>").append(Ancients[key].used).append($("<span></span>").text(Ancients[key].name).attr("title", Ancients[key].desc)));
  Ancients[key].level = $("<span></span>").addClass('span2').attr("type", "text").text(0);
  Ancients[key].target = $("<span></span>").addClass('span2');
  tr.append($("<td></td>").append(Ancients[key].level)).append($("<td></td>").append(Ancients[key].target));
  $("#ancienttbl").append(tr);
}

for (var i = 0; i < Heroes.length; i++) {
  var tr = $("<tr></tr>").attr("id", "hero" + i.toString());
  var used = $("<input></input>").attr("type", "checkbox").attr("title", "Optimize this hero").addClass("chkHero");
  if (Heroes[i].name == "The Masked Samurai" || i > 24) {
    //Automatically selected Samurai and the Rangers
    used.prop('checked', true);
  }
  tr.append($("<td></td>").append(used).append(Heroes[i].name));
  Heroes[i].gildBox = $("<span></span>").attr("type", "text").text(0);
  tr.append($("<td></td>").append(Heroes[i].gildBox));
  tr.append($("<td></td>").attr("class", "heroEff"));
  $("#heroestbl").append(tr);
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

  items = data.items.items;
  var heroes = data.heroCollection.heroes;
  var ascSouls = 0;
  for (var k in heroes) {
    var id = parseInt(k);
    ascSouls += heroes[k].level;
    if (id < 2 || id > 35) continue;
  Heroes[id - 2].gildBox.text(heroes[k].epicLevel);
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
  if(data.paidForRubyMultiplier) {
    AchievementMultiplier *= 2;
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
  UpdateAncientPrices(levels, data.ancients.didGetVaagur);

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

var curAddAncients = null;
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
  $("#add" + ancient).text("(" +
    FormatFactor(ratio / curOutFactor) + " increase).");
}
function onSwitchGilds(e) {
  var hero = e.data.hero;
  var ratio = e.data.outFactor.ratio;
  var factor = FormatFactor(ratio / curOutFactor);
  
  //Find current best efficiency
  var currentEff = $("#heroestbl .heroEff").map(function() {
    var html = $(this).html();
    var result = parseFloat(html);
    return isNaN(result) ? null : result;
  }).get();
  var maxEff = Math.max.apply(Math, currentEff);
  
  //Check if current hero is better the previous best
  if (parseFloat(factor) > 0 && (maxEff == null || parseFloat(factor) >= maxEff)) {
    //Highlight if best
    $("#heroestbl .hilite").removeClass("hilite");
    $("#hero" + hero.toString()).addClass("hilite");
  }
  
  $("#hero" + hero.toString() + " .heroEff").text(factor);
}
function onFinishCompute(e) {
  if (e.data.ancient != null) {
    return onAddAncient(e);
  }
  if (e.data.hero != null) {
  return onSwitchGilds(e);
  }

  var levels = e.data.levels;
  var outFactor = e.data.outFactor;
  var initFactor = e.data.initFactor;
  var souls = e.data.souls;
  if (!e.data.working) {
    curOutFactor = outFactor.ratio;
  }

  var soulsSpent = 0;
  for (var k in Ancients) {
    var level = parseInt(Ancients[k].level.text());
    for (var lvl = 2; lvl <= level; lvl++) {
      soulsSpent += AncientPrice(k, lvl);
    }
  }

  if (!e.data.working) {
    loadSpinner.stop();
  }

  $("#soulsout").text(souls);
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      var oldLevel = parseInt(Ancients[k].level.text());
      if (levels[k] > oldLevel) {
        Ancients[k].targetBox.addClass("hilite");
        Ancients[k].target.html(levels[k] + " (+" + (levels[k] - oldLevel) + ")");
      } else {
        Ancients[k].targetBox.removeClass("hilite");
        Ancients[k].target.html(levels[k] ? levels[k] : "");
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

  $("#output").html(outLog);
};

function ShowLevelingPlan(levels) {
  if ($('#levelingPlanItem').is(':hidden')) {
    return;
  }
  var plan = new LevelingPlan(levels.argaiv, AchievementMultiplier);
  plan.Start(levels.argaiv, levels.dogcog);
  
  for (var i = 0; i < plan.plan.length; i++) {
    var step = plan.plan[i];
    var heroName = step.heroName;
    var level = step.level;
    
    if (plan.plan.length > i + 1 && plan.plan[i+1].heroName == heroName)
      continue;
    
    var tr = $("<tr></tr>");
    tr.append($("<td></td>").append(heroName));
    tr.append($("<td></td>").append(level.toString()));
    $("#plantbl").append(tr);
  }
}

function ShowNewAncients(levels, souls, activity, used) {
  curAddAncients = [];
  var addList = $("#addancients");
  addList.empty();
  for (var k in Ancients) {
    if (!levels[k] && Ancients[k].price <= souls && Ancients[k].used.prop("checked")) {
      var curItem = {ancient: k};
      curItem.line = $("<div></div>").html(
        "<a href=\"javascript:void(0)\" class=\"buybtn\" aid=\"" + k + "\" title=\"" + Ancients[k].desc + "\">" +
      Ancients[k].name + "</a>: " + Ancients[k].price + " souls <span id=\"add" + k + "\">" +
        "<img src=\"//cdnjs.cloudflare.com/ajax/libs/select2/3.5.2/select2-spinner.gif\"/></span>");
      curAddAncients.push(curItem);
    }
  }
  curAddAncients.sort(function(a, b) {return Ancients[a.ancient].price - Ancients[b.ancient].price;});
  for (var i = 0; i < curAddAncients.length; i++) {
    addList.append(curAddAncients[i].line);
    var k = curAddAncients[i].ancient;
    var newLevels = $.extend({}, levels);
    newLevels[k] = 1;
    computeThread.postMessage({cmd: "Compute", levels: newLevels, souls: souls - Ancients[k].price,
      gilded: GetGildedHeroes(), activity: activity, damageFactor: AchievementMultiplier, ancient: k, used: used,
      items: items});
  }
  $(".buybtn").click(function() {
    var aid = $(this).attr("aid");
    Ancients[aid].level.text(1);
    $("#soulsin").text(parseInt($("#soulsin").text()) - Ancients[aid].price);
    StartCompute();
  });
}

function ShowRegilds(levels, souls, activity, used) {
  var gilds = GetGildedHeroes();
  var blankGilds = new Array(gilds.length);
  var totalGilds = 0;
  for (var i = 0; i < gilds.length; i++) {
    totalGilds += gilds[i];
    blankGilds[i] = 0;
  }
  for (var i = 0; i < Heroes.length; i++) {
    var newGilds = blankGilds.slice(0);
    newGilds[i] = totalGilds;
    
    $("#hero" + i.toString()).removeClass("hilite");
    
    if ($("#hero" + i.toString() + " :checkbox").prop('checked') == false) {
      $("#hero" + i.toString() + " .heroEff").html('');
    } else if (souls - (totalGilds - gilds[i]) * 80 > 0) {
      $("#hero" + i.toString() + " .heroEff").html("<img src=\"//cdnjs.cloudflare.com/ajax/libs/select2/3.5.2/select2-spinner.gif\"/>")
      
      computeThread.postMessage({cmd: "Compute", levels: levels, souls: souls - (totalGilds - gilds[i]) * 80,
        gilded: newGilds, activity: activity, damageFactor: AchievementMultiplier, hero: i, used: used,
        items: items});
    } else {
      $("#hero" + i.toString() + " .heroEff").html('N/A');
    }
  }
}

function StartCompute() {
  var levels = {};
  var used = {};
  var owned = OwnedNotInList;
  for (var k in Ancients) {
    if (Ancients.hasOwnProperty(k)) {
      levels[k] = parseInt(Ancients[k].level.text());
      if (levels[k]) {
        owned++;
      }
      if (Ancients[k].used.prop("checked")) {
        used[k] = true;
      }
    }
  }
  var souls = parseInt($("#soulsin").text());

  if (computeThread) {
    computeThread.terminate();
  }
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

  loadSpinner.spin($("#ancienttbl")[0]);

  $("#output").empty();

  computeThread.postMessage({cmd: "Compute", levels: levels, souls: souls, gilded: GetGildedHeroes(), activity: activity,
    damageFactor: AchievementMultiplier, used: used, items:items});
  
  ShowNewAncients(levels, souls, activity, used);
  ShowRegilds(levels, souls, activity, used);
  ShowLevelingPlan(levels);
}
$(function() {
  if (window.location.toString().indexOf('debug') > 0) {
    $('#levelingPlanItem').show();
  }
});
