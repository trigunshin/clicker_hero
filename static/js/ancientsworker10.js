importScripts('shared.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.0/lodash.js');

for (var i = 0; i < Heroes.length; i++) {
  Heroes[i].gilded = Heroes[i].gilded ? Heroes[i].gilded : 0;
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

function Compute(e) {
  var levels = e.data.levels,
  used = e.data.used,
  souls = e.data.souls,
  gilded = e.data.gilded,
  activity = e.data.activity,
  damageFactor = e.data.damageFactor,
  retAncient = e.data.ancient,
  retHero = e.data.hero;
  relics = e.data.items;

  var relic_primal_bonus = .01 * _.reduce(_.values(relics), function(accum, item) {
    if(item.bonusType1 == 17) return accum+= item.bonus1Level;
    if(item.bonusType2 == 17) return accum+= item.bonus2Level;
    if(item.bonusType3 == 17) return accum+= item.bonus3Level;
    if(item.bonusType4 == 17) return accum+= item.bonus4Level;
  }, 0);

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
        souls *= 0.25 + 0.01 * levels.atman + relic_primal_bonus;
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
  if (activity) {
    curGold += 10 * MonsterLife(2 + levels.iris) * MonsterGoldFactor(2 + levels.iris) * (1 + 0.05 * levels.mammon);
  } else {
    curGold += 10 * MonsterLife(2 + levels.iris) * MonsterGoldFactor(2 + levels.iris) * (1 + 0.01 * IdleValue(levels.libertas)) * (1 + 0.05 * levels.mammon);
  }
    var curTime = 60;
    var curSouls = 0;
    var solomon = 1 + 0.01 * SolomonValue(levels.solomon);
    var clicks = 0;
    plan.Start(levels.argaiv, levels.dogcog);
    var best = null;
    for (var level = 5; level <= 4000; level += 5) {
      if (level < 2 + levels.iris) {
        continue;
      }
      var waves = Math.min(5, level - levels.iris);
      var numDelays = (9 - levels.kumawakamaru) * (waves - 1);
      var levelInfo = GetLevelInfo(level, 2 + levels.iris);

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

      var realSouls = curSouls + plan.GetOptimalHeroSouls(curGold);
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
    if (k == "iris" && levels[k] % 5 == 3) {
      //handle iris specially (skipping boss levels, which break the iterative optimizer)
      var price = 0;
      price = AncientPrice(k, levels[k] + 2) + AncientPrice(k, levels[k] + 1);
          if (souls >= price && (!Ancients[k].maxlvl || levels[k] < Ancients[k].maxlvl)) {
            levels[k] += 2;
            souls -= price;
            var info = Simulate();
            var factor = (info.ratio - current.ratio) / price;
            if (factor > bestFactor) {
              bestAncient = k;
              bestInfo = info;
              bestFactor = factor;
            }
            levels[k] -= 2;
            souls += price;
          }
    } else if (Ancients.hasOwnProperty(k) && levels[k] && k != "morgulis" && used[k]) {
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
    if (bestAncient == "iris" && levels[k] % 5 == 3) {
    souls -= AncientPrice(bestAncient, levels[bestAncient] + 1);
    souls -= AncientPrice(bestAncient, levels[bestAncient] + 2);
    levels[bestAncient] += 2;
    } else {
    souls -= AncientPrice(bestAncient, levels[bestAncient] + 1);
    levels[bestAncient] += 1;
    }
      current = bestInfo;

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

  var outFactor = Optimize(retAncient != null && retHero != null);

  self.postMessage({outFactor: outFactor, initFactor: initFactor, levels: levels, souls: souls, ancient: retAncient, hero: retHero});
}

this.onmessage = function(e) {
  Compute(e);
};
