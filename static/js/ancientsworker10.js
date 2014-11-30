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
  {name: "Dread Knight", cost: 1e40, damage: 146e30 * 20, level: 100},
  {name: "Atlas", cost: 1e55, damage: 1075e42 * 20, level: 100},
  {name: "Terra", cost: 1e70, damage: 7926e54 * 20, level: 100},
  {name: "Phthalo", cost: 1e85, damage: 5839e67 * 20, level: 100},
  //{name: "Orntchya Gladeye, Didensy Banana", cost: 1e100, damage: 3302e80 * 20, level: 100},
  //{name: "Lilin", cost: 1e115, damage: 3170e93 * 20, level: 100},
  //{name: "Cadmia", cost: 1e130, damage: 2335e106 * 20, level: 100},
  //{name: "Alabaster", cost: 1e145, damage: 1721e119 * 20, level: 100},
  //{name: "Astraea", cost: 1e160, damage: 1268e132 * 20, level: 100},
];
var TotalUpgradeCost =
  100 + 250 + 1e3 + 8e3 + 80e3 + 400e3 + 4e6 + // cid
  500 + 1.25e3 + 5e3 + 40e3 + 400e3 + // treebeast
  2.5e3 + 6.25e3 + 25e3 + 200e3 + 2e6 + 10e6 + // ivan
  10e3 + 25e3 + 100e3 + 800e3 + // brittany
  40e3 + 100e3 + 400e3 + 3.2e6 + 32e6 + // wandering
  200e3 + 500e3 + 2e6 + 16e6 + 160e6 + // betty
  1e6 + 2.5e6 + 10e6 + 80e6 + // samurai
  4e6 + 10e6 + 40e6 + 320e6 + // leon
  25e6 + 62.5e6 + 250e6 + 2e9 + // forest seer
  150e6 + 375e6 + 1.5e9 + 12e9 + 120e9 + // alexa
  1e9 + 2.5e9 + 10e9 + 80e9 + // natalia
  8e9 + 20e9 + 80e9 + 640e9 + 6.4e12 + // mercedes
  65e9 + 162e9 + 650e9 + 5.2e12 + 52e12 + // bobby
  500e9 + 1.25e12 + 5e12 + 40e12 + 400e12 + // broyle
  4.5e12 + 11.25e12 + 45e12 + 360e12 + 3.6e15 + // sir george
  40e12 + 100e12 + 400e12 + 3.2e15 + 32e15 + 160e15 + // king midas
  360e12 + 900e12 + 3.6e15 + 28.8e15 + 288e15 + // referi
  3.2e15 + 8e15 + 32e15 + 256e15 + // abaddon
  27e15 + 67.5e15 + 270e15 + 2.16e18 + // ma zhu
  240e15 + 600e15 + 2.4e18 + 19.2e18 + // amenhotep
  3e18 + 7.5e18 + 30e18 + 240e18 + 2.4e21 + // beastlord
  90e18 + 225e18 + 900e18 + 7.2e21 + // athena
  3.5e21 + 8.75e21 + 35e21 + 280e21 + 2.8e24 + // aphrodite
  140e21 + 350e21 + 1.4e24 + 11.2e24 + 112e24 + // shinatobe
  41.999e24 + 104e24 + 419e24 + 3.359e27 + // grant
  21e27 + 52.499e27 + 209e27 + 1.679e30 + // frostleaf
  1e41 + 25e40 + 1e42 + 8e42 + // dread knight
  1e56 + 25e55 + 1e57 + 8e57 + // atlas
  1e71 + 25e70 + 1e72 + 8e72 + // terra
  1e86 + 25e85 + 1e87 + 8e87 + // phthalo
  //1e101 + 25e100 + 1e102 + 8e102 + // orntchya
  //1e116 + 25e115 + 1e117 + 8e117 + // lilin
  //1e131 + 25e130 + 1e132 + 8e132 + // cadmia
  //1e146 + 25e145 + 1e147 + 8e147 + // alabaster
  //1e161 + 25e160 + 1e162 + 8e162 + // astraea
  0;
var BaseHSSouls = (Math.log(Heroes[28].cost / 20) / Math.log(1.07) + 1) / 2000;
for (var i = 0; i < Heroes.length; i++) {
  var lvl = Math.log(Heroes[28].cost / Heroes[i].cost) / Math.log(1.07) + 1;
  BaseHSSouls += lvl / 2000;
  Heroes[i].gilded = 0;
}
function GetHeroLevelSouls(gold) {
  gold /= 26;
  if (gold < Heroes[28].cost) {
    return 0;
  }
  return Math.floor(BaseHSSouls + Math.log(0.07 * (gold - Heroes[28].cost) / Heroes[28].cost + 1) / Math.log(1.07) * 26 / 2000);
}

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
function AncientPrice(ancient, level) {
  var price = Math.round(Math.pow(level, Ancients[ancient].power));
  if (ancient == "kumawakamaru") {
    price *= 10;
  }
  return price;
}

function LevelingPlan(argaiv, damageFactor) {
  this.argaiv = argaiv;
  this.dogcog = 0;
  this.damageFactor = damageFactor;
  this.Damage = function(hero, lvl) {
    var x10 = Math.min(Math.floor(lvl / 1000), 3);
    var x4 = Math.min(Math.max(Math.floor((lvl - 175) / 25), 0) - x10, 154);
    return hero.damage * (1 + (0.5 + 0.02 * this.argaiv) * hero.gilded) * lvl * Math.pow(4, x4) * Math.pow(10, x10) * this.damageFactor;
  };
  this.Cost = function(hero, lvl) {
    return hero.cost * Math.pow(1.07, lvl) / 0.07 * (1 - 0.02 * this.dogcog);
  };
  this.NextBest = function(hero, level, mined) {
    var res = null;
    var curdmg = this.Damage(hero, level);
    var curcost = this.Cost(hero, level);
    for (var i = level + 25; i <= 4100; i += 25) {
      var ed = this.Damage(hero, i) - curdmg;
      if (ed - curdmg < mined) {
        continue;
      }
      var ec = this.Cost(hero, i) - curcost;
      if (!res || ed / ec > res.ratio) {
        res = {hero: hero, level: i, ratio: ed / ec, increase: ed - curdmg};
      }
    }
    return res;
  };

  this.plan = [];
  var bestList = [];
  var curDamage = 0;
  var curLevels = [];
  for (var i = 0; i < Heroes.length; i++) {
    curDamage += this.Damage(Heroes[i], Heroes[i].level);
    curLevels.push(Heroes[i].level);
  }
  for (var i = 0; i < Heroes.length; i++) {
    bestList.push(this.NextBest(Heroes[i], Heroes[i].level, curDamage * 0.01));
  }
  while (true) {
    var nextBest = -1;
    for (var i = 0; i < bestList.length; i++) {
      if (bestList[i] && (nextBest < 0 || bestList[i].ratio > bestList[nextBest].ratio)) {
        nextBest = i;
      }
    }
    if (nextBest < 0) {
      break;
    }
    if (bestList[nextBest].increase > curDamage * 0.01) {
      while (curLevels[nextBest] < bestList[nextBest].level) {
        curLevels[nextBest] += 25;
        this.plan.push({hero: nextBest, level: curLevels[nextBest]});
      }
      curDamage += bestList[nextBest].increase;
    }
    bestList[nextBest] = this.NextBest(bestList[nextBest].hero, bestList[nextBest].level, curDamage * 0.01);
  }

  this.Start = function(argaiv, dogcog) {
    this.argaiv = argaiv;
    this.dogcog = dogcog;
    this.planPos = 0;
    var heroes = [];
    var curDamage = 0;
    var curCost = TotalUpgradeCost;
    for (var i = 0; i < Heroes.length; i++) {
      var curHero = {damage: this.Damage(Heroes[i], Heroes[i].level),
                     cost: this.Cost(Heroes[i], Heroes[i].level)};
      curDamage += curHero.damage;
      curCost += curHero.cost;
      heroes.push(curHero);
    }
    this.curDamage = curDamage;
    this.curCost = curCost;
    for (var i = 0; i < this.plan.length; i++) {
      var nextDamage = this.Damage(Heroes[this.plan[i].hero], this.plan[i].level);
      var nextCost = this.Cost(Heroes[this.plan[i].hero], this.plan[i].level);
      curDamage += nextDamage - heroes[this.plan[i].hero].damage;
      curCost += nextCost - heroes[this.plan[i].hero].cost;
      heroes[this.plan[i].hero].damage = nextDamage;
      heroes[this.plan[i].hero].cost = nextCost;
      this.plan[i].damage = curDamage;
      this.plan[i].cost = curCost;
    }
  };
  this.GetDamage = function(gold) {
    while (this.planPos < this.plan.length && gold >= this.plan[this.planPos].cost) {
      this.curDamage = this.plan[this.planPos].damage;
      this.planPos++;
    }
    if (gold < this.curCost) {
      return this.curDamage * Math.pow(gold / this.curCost, 0.8);
    } else if (this.planPos < this.plan.length) {
      return this.curDamage + (this.plan[this.planPos].damage - this.curDamage) * (gold - this.curCost) /
        (this.plan[this.planPos].cost - this.curCost);
    } else {
      return this.curDamage * (1 + Math.log(gold / this.curCost) / (Math.log(1.07) * 4100));
    }
  };
}

function Compute(levels, used, souls, gilded, activity, damageFactor, retAncient) {
  for (var i = 0; i < gilded.length; i++) {
    Heroes[i].gilded = gilded[i];
  }

  var getFactors = function(noMorgulis) {
    var clickFactor = 0.035 * (1 + 0.2 * levels.fragsworth);
    var crit = 18 * (1 + 0.15 * levels.bhaal) - 1;

    var getBurstFactors = function(list, cps) {
      var durations = [];
      var cdset = {};
      for (var i = 0; i < list.length; i++) {
        durations.push(levels[list[i]]);
        cdset[list[i]] = true;
      }
      durations.sort();
      var rDamage = 0;
      var rGold = 0;
      var rGC = 0;
      for (var i = 0; i < durations.length; i++) {
        var dur = durations[i];
        if (i == 0 || dur > durations[i - 1]) {
          var dtime = (dur * 2 + 30) - (i > 0 ? (durations[i - 1] * 2 + 30) : 0);
          var clickspeed = cps + (cdset.chawedo && levels.chawedo >= dur ? 10 : 0);
          var critchance = 0.09 + (cdset.sniperino && levels.sniperino >= dur ? 0.50 : 0);
          var goldclicks = (cdset.kleptos && levels.kleptos >= dur ? clickspeed * (1 + 0.3 * levels.pluto) : 0);
          var powersurge = (cdset.berserker && levels.berserker >= dur ? 2 : 1);
          var goldfactor = (cdset.energon && levels.energon >= dur ? 2 : 1);
          var superclicks = (cdset.hecatoncheir && levels.hecatoncheir >= dur ? 3 : 1);
          var dDamage = dtime * powersurge * (1 + superclicks * (critchance * crit + 1) * clickspeed * clickFactor);
          rDamage += dDamage;
          rGold += dDamage * goldfactor;
          rGC += goldclicks * goldfactor;
        }
      }
      return {damage: rDamage, gold: rGold, gc: rGC, duration: durations[durations.length - 1] * 2 + 30};
    };
    
    var avgDamage = 0;
    var avgGold = 0;
    var avgGC = 0;

    var remains = 1800;
    var remainsIdle = 1800;
    var remainsCps = 0;
    var avgCps = 0;
    if (activity) {
      var cdTypes = {"full": ["chawedo", "sniperino", "kleptos", "berserker", "energon", "hecatoncheir"],
                     "half": ["chawedo", "sniperino", "berserker", "energon"],
                     "short": ["chawedo", "berserker"]};
      var totalCount = 0;
      for (var cd in cdTypes) {
        var count = activity[cd].count;
        if (count > 1e-3) {
          var info = getBurstFactors(cdTypes[cd], activity[cd].cps);
          avgDamage += info.damage * count;
          avgGold += info.gold * count;
          avgGC += info.gc * count;
          remains -= info.duration * count;
          avgCps += activity[cd].cps * info.duration * count;
          avgCps += 10 * (30 + levels.chawedo * 20) * count;
          totalCount += count;
        }
      }
      remainsIdle = remains - 60 * Math.max(totalCount, 2);
      remainsCps = activity.none;
    }
    if (remainsCps > 1e-3) {
      var dDamage = Math.max(remains, 0) * (1 + (0.09 * crit + 1) * clickFactor * remainsCps);
      avgDamage += dDamage;
      avgGold += dDamage;
      avgCps += Math.max(remains, 0) * remainsCps;
    } else {
      remains = Math.max(remains, 0);
      remainsIdle = Math.max(remainsIdle, 0);
      avgDamage += (remains - remainsIdle) + remainsIdle * (1 + 0.01 * IdleValue(levels.siyalatas));
      avgGold += (remains - remainsIdle) + remainsIdle * (1 + 0.01 * IdleValue(levels.siyalatas)) *
                                                         (1 + 0.01 * IdleValue(levels.libertas));
      avgCps = 0;
    }
    avgDamage /= 1800;
    avgGold /= 1800;
    avgGC /= 1800;
    avgCps /= 1800;

    var dmgFactor;
    if (noMorgulis) {
      dmgFactor = 1 + 0.11 * levels.morgulis + 0.1 * souls;
    } else {
      dmgFactor = 1 + (levels.morgulis ? 0.11 : 0.1) * (souls + levels.morgulis);
    }

    avgDamage *= dmgFactor;
    avgGold *= dmgFactor;
    var monTime = (10 - levels.kumawakamaru) * 4;
    var bossTime = 10 * (1 - 0.02 * levels.bubos);
    monTime /= monTime + bossTime;
    var goldFactor = 1 + monTime * 0.01 * (1 + 0.2 * levels.dora) * (10 * (1 + levels.mimzee * 0.5) - 1);
    goldFactor *= 1 + 0.05 * levels.mammon;
    avgGold *= goldFactor;
    avgGC *= goldFactor;
    avgGold *= 1 + (0.0025 * levels.fortuna) * 9;

    return {damage: avgDamage, gold: avgGold / avgDamage, gc: avgGC, cps: avgCps};
  };

  var MonsterLife = function(level) {
    var lvl = Math.min(level, 140) - 1;
    var life = 10 * (Math.pow(1.6, lvl) + lvl);
    if (level > 140) {
      life *= Math.pow(1.15, level - 140);
    }
    return Math.ceil(life);
  };
  var MonsterGoldFactor = function(level) {
    var factor = 1.0 / 15;
    if (level > 75) {
      factor *= Math.min(3, Math.pow(1.025, level - 75));
    }
    return factor;
  };
  var HeroSoulRewards = function(level, solomon) {
    if (level == 100) {
      return 1;
    } else if (level > 100) {
      var souls = Math.floor(Math.pow(((level - 100) / 5 + 4) / 5, 1.3) * solomon);
      if (level % 100) {
        souls *= 0.25 + 0.01 * levels.atman;
      }
      return souls;
    }
    return 0;
  };
  var GetLevelInfo = function(level, from) {
    var life = 0;
    var gold = 0;
    var mobs = 0;
    for (var i = level - 4; i < level; i++) {
      if (i < from) {
        continue;
      }
      var curLife = MonsterLife(i) * (10 - levels.kumawakamaru);
      life += curLife;
      gold += curLife * MonsterGoldFactor(i);
      mobs += 10 - levels.kumawakamaru;
    }
    var avgGold = gold / Math.max(mobs, 1);
    var bossLife = MonsterLife(level) * 10 * (1 - 0.02 * levels.bubos);
    life += bossLife;
    gold += bossLife * MonsterGoldFactor(level);
    return [life, gold, avgGold];
  };

  var plan = new LevelingPlan(levels.argaiv, damageFactor);

  var Simulate = function(noMorgulis) {
    var factors = getFactors(noMorgulis || !used.morgulis);
    var curGold = (levels.khrysos ? Heroes[levels.khrysos - 1].cost : 0);
    var curTime = 0;
    var curSouls = 0;
    var solomon = 1 + 0.01 * SolomonValue(levels.solomon);
    var clicks = 0;
    plan.Start(levels.argaiv, levels.dogcog);
    var best = null;
    for (var level = 5; level <= 2000; level += 5) {
      if (level < 1 + levels.iris) {
        continue;
      }
      var waves = Math.min(5, level - levels.iris);
      var numDelays = (9 - levels.kumawakamaru) * (waves - 1);
      var levelInfo = GetLevelInfo(level, 1 + levels.iris);

      var addGold = levelInfo[1] * factors.gold;
      var curDamage = Math.max(plan.GetDamage(curGold), 10);
      curDamage *= factors.damage;
      if (activity) {
        curDamage *= 1 + clicks * 0.0001 * levels.juggernaut;
      }
      if (activity) {
        curDamage *= Math.pow(1.1, Math.min(curTime / 30 - 2, 0));
      }
      var dTime = levelInfo[0] / curDamage;
      curTime += dTime + numDelays * 0.5;
      curSouls += HeroSoulRewards(level, solomon);
      curGold += addGold + levelInfo[2] * factors.gc * dTime / (dTime + 0.5 * numDelays);
      clicks += dTime * factors.cps;
      if (dTime * factors.cps < numDelays) {
        clicks = 0;
      }

      var realSouls = curSouls + GetHeroLevelSouls(curGold);
      if (!best || realSouls / curTime > best.ratio) {
        best = {level: level, time: curTime, souls: realSouls, ratio: realSouls / curTime};
      } 
    }
    return best;
  };

  var Optimize = function(feedback) {
    var current = Simulate();
    var count = 0;
    while (true) {
      var bestAncient = null;
      var bestInfo = null;
      var bestFactor = 0;
      for (var k in Ancients) {
        if (Ancients.hasOwnProperty(k) && levels[k] && k != "morgulis" && used[k]) {
          var price = AncientPrice(k, levels[k] + 1);
          if (souls >= price && (!Ancients[k].maxlvl || levels[k] < Ancients[k].maxlvl)) {
            levels[k] += 1;
            souls -= price;
            var info = Simulate();
            var factor = (info.ratio - current.ratio) / price;
            if (factor > bestFactor) {
              bestAncient = k;
              bestInfo = info;
              bestFactor = factor;
            }
            levels[k] -= 1;
            souls += price;
          }
        }
      }
      if (!bestAncient) {
        break;
      }
      levels[bestAncient] += 1;
      current = bestInfo;
      souls -= AncientPrice(bestAncient, levels[bestAncient]);

      count++;
      if (feedback && !(count % 10)) {
        self.postMessage({outFactor: current, initFactor: initFactor, levels: levels, souls: souls, working: true});
      }
    }
    if (levels.morgulis && used.morgulis) {
      levels.morgulis += souls;
      souls = 0;
    }
    return current;
  }

  var initFactor = Simulate(true);

  var outFactor = Optimize(!retAncient);

  self.postMessage({outFactor: outFactor, initFactor: initFactor, levels: levels, souls: souls, ancient: retAncient});
}

this.onmessage = function(e) {
  Compute(e.data.levels, e.data.used, e.data.souls, e.data.gilded, e.data.activity, e.data.damageFactor, e.data.ancient);
};
