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
    "91": 0, // ascend 50
    "92": 0, // ascend 100
    "93": 0, // ascend 250
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

var Heroes = [
  /*{name: "Cid, the Helpful Adventurer", cost: 5, damage: 0, level: 0, upgrades: [100, 250, 1e3, 8e3, 80e3, 400e3, 4e6]}, */
  {name: "Tree Beast", cost: 50, damage: 5 * 20, level: 100, upgrades: [500, 1.25e3, 5e3, 40e3, 400e3]},
  {name: "Ivan, the Drunken Brawler", cost: 250, damage: 22 * 20, level: 125, upgrades: [2.5e3, 6.25e3, 25e3, 200e3, 2e6, 10e6]},
  {name: "Brittany, the Beach Princess", cost: 1000, damage: 74 * 20, level: 75, upgrades: [10e3, 25e3, 100e3, 800e3]},
  {name: "The Wandering Fisherman", cost: 4000, damage: 245 * 8, level: 100, upgrades: [40e3, 100e3, 400e3, 3.2e6, 32e6]},
  {name: "Betty Clicker", cost: 20000, damage: 976, level: 100, upgrades: [200e3, 500e3, 2e6, 16e6, 160e6]},
  {name: "The Masked Samurai", cost: 100e3, damage: 3725 * 20, level: 75, upgrades: [1e6, 2.5e6, 10e6, 80e6]},
  {name: "Leon", cost: 400e3, damage: 10859 * 8, level: 75, upgrades: [4e6, 10e6, 40e6, 320e6]},
  {name: "The Great Forest Seer", cost: 2500e3, damage: 47143 * 20, level: 75, upgrades: [25e6, 62.5e6, 250e6, 2e9]},
  {name: "Alexa, the Assassin", cost: 15000e3, damage: 186e3 * 5.0625, level: 100, upgrades: [150e6, 375e6, 1.5e9, 12e9, 120e9]},
  {name: "Natalia, Ice Apprentice", cost: 100e6, damage: 782e3 * 20, level: 75, upgrades: [1e9, 2.5e9, 10e9, 80e9]},
  {name: "Mercedes, Duchess of Blades", cost: 800e6, damage: 3721e3 * 20, level: 100, upgrades: [8e9, 20e9, 80e9, 640e9, 6.4e12]},
  {name: "Bobby, Bounty Hunter", cost: 6500e6, damage: 17010e3 * 20, level: 100, upgrades: [65e9, 162e9, 650e9, 5.2e12, 52e12]},
  {name: "Broyle Lindoven, Fire Mage", cost: 50e9, damage: 69480e3 * 10, level: 100, upgrades: [500e9, 1.25e12, 5e12, 40e12, 400e12]},
  {name: "Sir George II, King's Guard", cost: 450e9, damage: 460e6 * 20, level: 100, upgrades: [4.5e12, 11.25e12, 45e12, 360e12, 3.6e15]},
  {name: "King Midas", cost: 4e12, damage: 3017e6, level: 125, upgrades: [40e12, 100e12, 400e12, 3.2e15, 32e15, 160e15]},
  {name: "Referi Jerator, Ice Wizard", cost: 36e12, damage: 20009e6 * 20, level: 125, upgrades: [360e12, 900e12, 3.6e15, 28.8e15, 288e15]},
  {name: "Abaddon", cost: 320e12, damage: 131e9 * 11.390625, level: 75, upgrades: [3.2e15, 8e15, 32e15, 256e15]},
  {name: "Ma Zhu", cost: 2.7e15, damage: 814e9 * 20, level: 75, upgrades: [27e15, 67.5e15, 270e15, 2.16e18]},
  {name: "Amenhotep", cost: 24e15, damage: 5335e9 * 2, level: 50, upgrades: [240e15, 600e15, 2.4e18 /*, 19.2e18*/]},
  {name: "Beastlord", cost: 300e15, damage: 49143e9 * 8, level: 100, upgrades: [3e18, 7.5e18, 30e18, 240e18, 2.4e21]},
  {name: "Athena, Goddess of War", cost: 9e18, damage: 1086e12 * 16, level: 100, upgrades: [90e18, 225e18, 900e18, 0, 7.2e21]},
  {name: "Aphrodite, Goddess of Love", cost: 350e18, damage: 31124e12 * 16, level: 125, upgrades: [3.5e21, 8.75e21, 35e21, 0, 280e21, 2.8e24]},
  {name: "Shinatobe, Wind Deity", cost: 14e21, damage: 917e15 * 8, level: 100, upgrades: [140e21, 350e21, 1.4e24, 11.2e24, 112e24]},
  {name: "Grant, the General", cost: 4199e21, damage: 202e18 * 4, level: 75, upgrades: [41.999e24, 104e24, 419e24, 3.359e27]},
  {name: "Frostleaf", cost: 2100e24, damage: 74698e18 * 4, level: 75, upgrades: [21e27, 52.499e27, 209e27, 1.679e30]},
  {name: "Dread Knight", cost: 1e40, damage: 1.46e32 * 20, level: 0, has5x: true, upgrades: [1e41, 2.5e41, 1e42, 0, 8e42]},
  {name: "Atlas", cost: 1e55, damage: 1.075e45 * 20, level: 0, has5x: true, upgrades: [1e56, 2.5e56, 1e57, 0, 8e57]},
  {name: "Terra", cost: 1e70, damage: 7.926e57 * 20, level: 0, has5x: true, upgrades: [1e71, 2.5e71, 1e72, 0, 8e72]},
  {name: "Phthalo", cost: 1e85, damage: 5.839e70 * 20, level: 0, has5x: true, upgrades: [1e86, 2.5e86, 1e87, 0, 8e87]},
  {name: "Orntchya Gladeye, Didensy Banana", cost: 1e100, damage: 3.302e83 * 20, level: 0, has5x: true, upgrades: [1e101, 2.5e101, 1e102, 0, 8e102]},
  {name: "Lilin", cost: 1e115, damage: 3.17e96 * 20, level: 0, has5x: true, upgrades: [1e116, 2.5e116, 1e117, 0, 8e117]},
  {name: "Cadmia", cost: 1e130, damage: 2.335e109 * 20, level: 0, has5x: true, upgrades: [1e131, 2.5e131, 1e132, 0, 8e132]},
  {name: "Alabaster", cost: 1e145, damage: 1.721e122 * 20, level: 0, has5x: true, upgrades: [1e146, 2.5e146, 1e147, 0, 8e147]},
  {name: "Astraea", cost: 1e160, damage: 1.268e135 * 20, level: 0, has5x: true, upgrades: [1e161, 2.5e161, 1e162, 0, 8e162]}
];


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


function LevelingPlan(argaiv, damageFactor) {
  this.argaiv = argaiv;
  this.dogcog = 0;
  this.damageFactor = damageFactor;
  
  //Compute DPS component of the hero at the given level
  this.Damage = function(hero, lvl) {
    var x10 = Math.min(Math.floor(lvl / 1000), 3);
    var x4 = Math.min(Math.max(Math.floor((lvl - 175) / 25), 0) - x10, 154);
    var x5 = (hero.has5x ? Math.min(Math.max(Math.floor((lvl - 500) / 25), 0), 9) : 0);
    return hero.damage * (1 + (0.5 + 0.02 * this.argaiv) * hero.gilded) * lvl * Math.pow(4, x4) * Math.pow(10, x10) * Math.pow(1.25, x5) * this.damageFactor;
  };
  
  //Compute cost to level hero to the given level
  this.Cost = function(hero, lvl) {
    if (lvl == 0)
      return 0;
      
    var cost = hero.cost * Math.pow(1.07, lvl) / 0.07 * (1 - 0.02 * this.dogcog);
    
    //Assume all upgrades are purchased to the current level
    if (lvl >= 10 && hero.upgrades.length >= 1)
      cost += hero.upgrades[0];
    if (lvl >= 25 && hero.upgrades.length >= 2)
      cost += hero.upgrades[1];
    if (lvl >= 50 && hero.upgrades.length >= 3)
      cost += hero.upgrades[2];
    if (lvl >= 75 && hero.upgrades.length >= 4)
      cost += hero.upgrades[3];
    if (lvl >= 100 && hero.upgrades.length >= 5)
      cost += hero.upgrades[4];
    if (lvl >= 125 && hero.upgrades.length >= 6)
      cost += hero.upgrades[5];
    if (lvl >= 150 && hero.upgrades.length >= 7)
      cost += hero.upgrades[6];
      
    return cost;
  };
  
  //Find the next level of the hero that will attain the given target dps
  this.NextBest = function(hero, level, target) {
    var curDmg = this.Damage(hero, level);
    var curCost = this.Cost(hero, level);
    
    //Allow single level increments up to level 25
    for (var i = level + 1; i <= 25; i++) {
      var newDmg = this.Damage(hero, i);
      if (newDmg < target) {
        continue;
      }
      var newCost = this.Cost(hero, i) - curCost;
      var newRatio = (newDmg - curDmg) / (newCost - curCost);
      return {hero: hero, level: i, ratio: newRatio, increase: newDmg - curDmg, costIncrease: newCost - curCost};
    }
    //Ignore leveling past 4100
    for (var i = level + 25; i <= 4100; i += 25) {
      var newDmg = this.Damage(hero, i);
      if (newDmg < target) {
        continue;
      }
      var newCost = this.Cost(hero, i) - curCost;
      var newRatio = (newDmg - curDmg) / (newCost - curCost);
      return {hero: hero, level: i, ratio: newRatio, increase: newDmg - curDmg, costIncrease: newCost - curCost};
    }
    
    //unattainable before 4100
    return null;
  };
  //result plan steps 
  this.plan = [];
  //cache of next required hero level (per hero)
  this.bestList = [];
  var curDamage = 0;
  var curLevels = [];
  //at each plan step, we aim to increase the total dps to this multiplier
  var dmgTargetRatio = 1.05;
  
  //Compute baseline damage and levels
  for (var i = 0; i < Heroes.length; i++) {
    curDamage += this.Damage(Heroes[i], Heroes[i].level);
    curLevels.push(Heroes[i].level);
  }
  
  //Compute baseline bestList
  for (var i = 0; i < Heroes.length; i++) {
    this.bestList.push(this.NextBest(Heroes[i], Heroes[i].level, curDamage * dmgTargetRatio));
  }
  
  //Compute plan steps!
  while (true) {
    var nextBest = -1;
  
    //Find next target
    for (var i = 0; i < this.bestList.length; i++) {
      if (this.bestList[i] && (nextBest < 0 || this.bestList[i].costIncrease < this.bestList[nextBest].costIncrease)) {
        nextBest = i;
      }
    }
    if (nextBest < 0) {
      //Plan over, implies highest hero is maxed
      break;
    }
  
    curLevels[nextBest] = this.bestList[nextBest].level;
    this.plan.push({hero: nextBest, heroName: Heroes[nextBest].name, level: curLevels[nextBest]});
  
    //Update target
    curDamage += this.bestList[nextBest].increase;
  
    //recompute bestList
    for (var i = 0; i < Heroes.length; i++) {
      if (this.bestList[i]) {
        this.bestList[i] = this.NextBest(Heroes[i], Heroes[i].level, curDamage * dmgTargetRatio);
      }
    }
  }

  //Fill in real computed plan damage and costs for each step
  this.Start = function(argaiv, dogcog) {
    this.argaiv = argaiv;
    this.dogcog = dogcog;
    this.planPos = 0;
    var heroes = [];
    var curDamage = 0;
    var curCost = 0;
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
  
  //Get damage attainable with the given amount of gold
  //This just follows the plan until the gold is expended
  this.GetDamage = function(gold) {
    while (this.planPos < this.plan.length && gold >= this.plan[this.planPos].cost) {
      this.curDamage = this.plan[this.planPos].damage;
      this.planPos++;
    }
    if (gold < this.curCost) {
      //Early game (pre-FrostLeaf unlocked)
      return this.curDamage * Math.pow(gold / this.curCost, 0.8);
    } else if (this.planPos < this.plan.length) {
      //Mid game (during leveling plan)
      var costRatio = (gold - this.curCost) / (this.plan[this.planPos].cost - this.curCost);
      return this.curDamage + (this.plan[this.planPos].damage - this.curDamage) * costRatio;
    } else {
      //Late game (after final hero capped to 4100)
      return this.curDamage * (1 + Math.log(gold / this.curCost) / (Math.log(1.07) * 4100));
    }
  };
  
  this.GetOptimalHeroSouls = function(gold) {
    if (gold < Heroes[24].cost) {
      return 0;
    }
    //Close enough for simulation
    return Math.log(gold) / Math.log(10) * .25;
  
    //The following, while accurate, is very slow!
    var curLevels = [];
    var heroCopy = $.extend(true, {}, Heroes);
    heroCopy[-1] = {name: "Cid, the Helpful Adventurer", cost: 5, damage: 0, level: 0, upgrades: []};

    //Zero current levels
    for (var i in heroCopy) {
      curLevels[i] = 0;
    }
    
    //Increment cheapest hero by 25 till gold is exhausted
    while (true) {
      var cheapest = 0;
      var cheapestCost = 0;
      for (var i in heroCopy) {
        var newCost = this.Cost(heroCopy[i], curLevels[i] + 25);
        if (cheapestCost == 0 || newCost < cheapestCost) {
          cheapest = i;
          cheapestCost = newCost;
        }
      }
      
      if (cheapestCost > gold)
        break;
        
      gold -= cheapestCost;
      curLevels[cheapest] += 25;
    }
    
    //Sum levels
    var totalLevels = 0;
    for (var i = 0; i < curLevels.length; i++) {
      totalLevels += curLevels[i];
    }
    
    return totalLevels;
  }
}

function AncientPrice(ancient, level) {
  var price = Math.round(Math.pow(level, Ancients[ancient].power));
  if (ancient == "kumawakamaru") {
    price *= 10;
  }
  return price;
}