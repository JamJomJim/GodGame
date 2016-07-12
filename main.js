var time = 900;
var days, hours, minutes, seconds;
var numAchievements = 0;
var currentEventOne = " ";
var currentEventTwo = " ";
var currentEventThree = " ";
var currentEventFour = " ";
var totalAtoms = 0;
var totalUnits = 0;
var totalClicks = 0;
var percentOfUniverse = 0;
var atomsInUniverse = Math.pow(10, 80);
var energy = 0;
var energyCost = 0;
var electrons = 0;
var protons = 0;
var neutrons = 0;
var hydrogenAtoms = 0;
var carbonAtoms = 0;
var oxygenAtoms = 0;
var ironAtoms = 0;
var siliconAtoms = 0;
var water = 0;
var rocks = 0;
var sand = 0;
var planets = 0;
var nebulas = 0;
var stars = 0;
var starSystems = 0;
var blackHoles = 0;
var life = {
    humans: {
        number: 1
    }
};
var achievements = [
    new achievement("time", 900, false, "timeOne"),
    new achievement("recordBreaker", 604800, false, "recordBreaker")
];
var events = [
    new achievement("time", 2, false, "newGame", "You're a god now. But what's a god without a universe?"),
    new achievement("totalClicks", 1, false, "firstClick", "Everything is made out of energy, so to grow your universe you must put your own energy into it."),
    new achievement("totalClicks", 25, false, "tenClicks", "You find that when you put energy into your universe, particles pop into existence out of complete nothingness"),
    new achievement("totalUnits", 1, false, "firstUnit", "It looks like you have a very small universe... but dont worry as your universe grows so does your ability to make what matters: matter."),
    new achievement("water", 1, false, "createdWater", "As you create water, you find that you can now produce atoms out of nothing too."),

];
var unlocks = {
    water: false,
    rock: false,
    planets: false,
    stars: false,
    starSystems: false,
    blackHoles: false
};
var hydrogenCost = [1, 1, 1, .1, 1]; // [electrons, protons, neutrons, EPN production rate, atomic value]
var carbonValues = [6, 6, 6, .5, 1]; // [electrons, protons, neutrons, EPN production rate, atomic value]
var oxygenCost = [8, 8, 8, .5, 1]; // [electrons, protons, neutrons, EPN production rate, atomic value]
var ironCost = [26, 26, 33, 2, 1]; // [electrons, protons, neutrons, EPN production rate, atom cost]
var siliconValues = [14, 14, 14, 1, 1]; // [electrons, protons, neutrons, EPN production rate, atomic value]
var waterCost = [2, 1, .2, .1, 3]; // [hydrogen, oxygen, hydrogen production rate, oxygen production rate, atomic value]
var rockValues = [2, 1, 2, .01, .01, .01, 5]; // [iron, silicon, oxygen, sand production, iron production, rock decay rate, atomic value]
var sandValues = [1, 2, .01, .02, 3]; // [silicon, oxygen, silicon production rate, oxygen production rate, atomic value]
var planetCost = [10000, 100, 10000]; // [iron, iron production rate, atom cost]
var nebulaCost = [1000000, .01, 1000, 1000000]; // [hydrogen, star production rate, hydrogen production rate, atom cost]
var starCost = [.001, 10, 1000]; // [nebulas, hydrogen production rate, atom cost]
function openTab(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function openLeftTab(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentLeft");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinksLeft");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function achievement(requirement, amount, state, divName, message) {
    this.requirement = requirement;
    this.amount = amount;
    this.divName = divName;
    this.state = state;
    this.message = message;
}

function conditionsMet(array, i) {
    array[i].state = true;
    if (array[i].message !== undefined) newEvent(array[i].message);
    else {
        document.getElementById(array[i].divName).style.display = "block";
        numAchievements += 1;
    }
}

function checkConditions(array) {
    for (i = 0; i < array.length; i++) {
        if (!array[i].state) {
            switch (array[i].requirement) {
                case "time":
                    if (time >= array[i].amount) conditionsMet(array, i);
                    break;
                case "totalClicks":
                    if (totalClicks >= array[i].amount) conditionsMet(array, i);
                    break;
                case "totalUnits":
                    if (totalUnits >= array[i].amount) conditionsMet(array, i);
                    break;
                case "water":
                    if (water >= array[i].amount) conditionsMet(array, i);
                    break;
                case "recordBreaker":
                    if (time <= 604800 && life.humans.number >= 1) conditionsMet(array, i);
                    break;
            }
        }
    }
    if (numAchievements >= 1) document.getElementById("noAchievements").style.display = "none";
}

function checkUnlocks() {
    if (hydrogenAtoms >= 2 && oxygenAtoms >= 1 && unlocks.water === false) {
        waterDiv = document.getElementById("waterSection");
        waterDiv.style.display = "block";
        unlocks.water = true;
    }
    if (siliconAtoms >= 1 * rockValues[1] && oxygenAtoms >= 1 * rockValues[2] && ironAtoms >= 1 * rockValues[0] && unlocks.rock === false) {
        rockDiv = document.getElementById("rockSection");
        rockDiv.style.display = "block";
        unlocks.rock = true;
    }
    if (water >= planetCost[1] * 1 && ironAtoms >= 1 * planetCost[0] && rocks >= planetCost[2] * 1 && unlocks.planets === false) {
        planetDiv = document.getElementById("planetSection");
        planetDiv.style.display = "block";
        unlocks.planets = true;
    }
    if (hydrogenAtoms >= nebulaCost[0] && unlocks.stars === false) {
        starDiv = document.getElementById("starSection");
        starDiv.style.display = "block";
        unlocks.stars = true;
    }
    if (stars >= 1 && unlocks.blackHoles === false) {
        ebhDiv = document.getElementById("currentEnergyAndBlackHoles");
        ebhDiv.style.display = "block";
        var spans = ["energyHydrogen", "energyCostHydrogen", "commaHydrogen", "energyOxygen", "energyCostOxygen", "commaOxygen", "energySilicon", "energyCostSilicon", "commaSilicon", "energyIron", "energyCostIron", "commaIron"];
        for (i = 0; i < spans.length; i++) {
            var currentSpan = document.getElementById(spans[i]);
            currentSpan.style.display = "inline";
        }
        unlocks.blackHoles = true;
    }
}

function loadUnlocks() {
    if (unlocks.water === true) document.getElementById("waterSection").style.display = "block";
    if (unlocks.rock === true) document.getElementById("rockSection").style.display = "block";
    if (unlocks.planets === true) document.getElementById("planetSection").style.display = "block";
    if (unlocks.stars === true) document.getElementById("starSection").style.display = "block";
    if (unlocks.blackHoles === true) {
        ebhDiv = document.getElementById("currentEnergyAndBlackHoles");
        ebhDiv.style.display = "block";
        var spans = ["energyHydrogen", "energyCostHydrogen", "commaHydrogen", "energyOxygen", "energyCostOxygen", "commaOxygen", "energySilicon", "energyCostSilicon", "commaSilicon", "energyIron", "energyCostIron", "commaIron"];
        for (i = 0; i < spans.length; i++) {
            var currentSpan = document.getElementById(spans[i]);
            currentSpan.style.display = "inline";
        }
        unlocks.blackHoles = true;
    }
}

function save() {
    var save = {
        time: time,
        numAchievements: numAchievements,
        achievements: achievements,
        events: events,
        unlocks: unlocks,
        totalUnits: totalUnits,
        totalClicks: totalClicks,
        electrons: electrons,
        protons: protons,
        neutrons: neutrons,
        energy: energy,
        hydrogenAtoms: hydrogenAtoms,
        oxygenAtoms: oxygenAtoms,
        ironAtoms: ironAtoms,
        siliconAtoms: siliconAtoms,
        water: water,
        rocks: rocks,
        sand: sand,
        planets: planets,
        nebulas: nebulas,
        stars: stars,
        blackHoles: blackHoles,
        starSystems: starSystems
    };
    localStorage.setItem("save", JSON.stringify(save));
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.time !== "undefined") time = savegame.time;
    if (typeof savegame.numAchievements !== "undefined") numAchievements = savegame.numAchievements;
    if (typeof savegame.achievements !== "undefined") achievements = savegame.achievements;
    if (typeof savegame.unlocks !== "undefined") unlocks = savegame.unlocks;
    if (typeof savegame.events !== "undefined") events = savegame.events;
    if (typeof savegame.totalClicks !== "undefined") totalClicks = savegame.totalClicks;
    if (typeof savegame.totalUnits !== "undefined") totalUnits = savegame.totalUnits;
    if (typeof savegame.electrons !== "undefined") electrons = savegame.electrons;
    if (typeof savegame.protons !== "undefined") protons = savegame.protons;
    if (typeof savegame.neutrons !== "undefined") neutrons = savegame.neutrons;
    if (typeof savegame.energy !== "undefined") energy = savegame.energy;
    if (typeof savegame.hydrogenAtoms !== "undefined") hydrogenAtoms = savegame.hydrogenAtoms;
    if (typeof savegame.oxygenAtoms !== "undefined") oxygenAtoms = savegame.oxygenAtoms;
    if (typeof savegame.ironAtoms !== "undefined") ironAtoms = savegame.ironAtoms;
    if (typeof savegame.siliconAtoms !== "undefined") siliconAtoms = savegame.siliconAtoms;
    if (typeof savegame.water !== "undefined") water = savegame.water;
    if (typeof savegame.rocks !== "undefined") rocks = savegame.rocks;
    if (typeof savegame.sand !== "undefined") sand = savegame.sand;
    if (typeof savegame.planets !== "undefined") planets = savegame.planets;
    if (typeof savegame.nebulas !== "undefined") nebulas = savegame.nebulas;
    if (typeof savegame.stars !== "undefined") stars = savegame.stars;
    if (typeof savegame.blackHoles !== "undefined") blackHoles = savegame.blackHoles;
    if (typeof savegame.starSystems !== "undefined") starSystems = savegame.starSystems;
}

function loadAchievements() {
    for (i = 0; i < achievements.length; i++)
        if (achievements[i].state === true) document.getElementById(achievements[i].divName).style.display = "block";
    if (numAchievements >= 1) document.getElementById("noAchievements").style.display = "none";
}

function determineTimePlayed() {
    seconds = ((time % 86400) % 3600) % 60;
    minutes = (((time - seconds) % 86400) % 3600) / 60;
    hours = (((time - seconds) - minutes * 60) % 86400) / 3600;
    days = (((time - seconds) - minutes * 60) - hours * 3600) / 86400;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function newEvent(message) {
    currentEventFour = currentEventThree;
    currentEventThree = currentEventTwo;
    currentEventTwo = currentEventOne;
    currentEventOne = message;
    document.getElementById("eventOne").innerHTML = currentEventOne;
    document.getElementById("eventTwo").innerHTML = currentEventTwo;
    document.getElementById("eventThree").innerHTML = currentEventThree;
    document.getElementById("eventFour").innerHTML = currentEventFour;
}

function createMatter(number) {
    var random = Math.floor(Math.random() * 3) + 1;
    var value = number + number * (hydrogenAtoms * hydrogenCost[3] + oxygenAtoms * oxygenCost[3] + siliconAtoms * siliconValues[3] + ironAtoms * ironCost[3]);
    totalClicks++;
    if (random == 1) {
        electrons += value;
        document.getElementById("electrons").innerHTML = Math.floor(electrons);
    } else if (random == 2) {
        protons += value;
        document.getElementById("protons").innerHTML = Math.floor(protons);
    } else {
        neutrons += value;
        document.getElementById("neutrons").innerHTML = Math.floor(neutrons);
    }
    random = Math.floor(Math.random() * 2) + 1;
    if (random == 1) {
        hydrogenAtoms += number * water * waterCost[2];
    } else oxygenAtoms += number * water * waterCost[3];
}

function updateAllValues() {
    determineTimePlayed();
    totalAtoms = Math.floor(hydrogenAtoms) * hydrogenCost[4] + Math.floor(oxygenAtoms) * oxygenCost[4] + Math.floor(ironAtoms) * ironCost[4] + Math.floor(water) * waterCost[4] + Math.floor(planets) * planetCost[2] + Math.floor(nebulas) * nebulaCost[3] + Math.floor(stars) * starCost[2];
    a = totalAtoms / atomsInUniverse;
    energyCost = Math.floor(blackHoles);
    document.getElementById("totalAtoms").innerHTML = Math.floor(totalAtoms);
    document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
    document.getElementById("totalAchievements").innerHTML = achievements.length;
    document.getElementById("completedAchievements").innerHTML = numAchievements;
    document.getElementById("electrons").innerHTML = Math.floor(electrons);
    document.getElementById("protons").innerHTML = Math.floor(protons);
    document.getElementById("neutrons").innerHTML = Math.floor(neutrons);
    document.getElementById("hydrogenAtoms").innerHTML = Math.floor(hydrogenAtoms);
    document.getElementById("hydrogenRate").innerHTML = (Math.floor(hydrogenAtoms) * hydrogenCost[3]).toFixed(1);
    document.getElementById("oxygenAtoms").innerHTML = Math.floor(oxygenAtoms);
    document.getElementById("oxygenRate").innerHTML = (Math.floor(oxygenAtoms) * oxygenCost[3]).toFixed(1);
    document.getElementById("siliconAtoms").innerHTML = Math.floor(siliconAtoms);
    document.getElementById("siliconRate").innerHTML = (Math.floor(siliconAtoms) * siliconValues[3]).toFixed(1);
    document.getElementById("carbonAtoms").innerHTML = Math.floor(carbonAtoms);
    document.getElementById("carbonRate").innerHTML = (Math.floor(carbonAtoms) * carbonValues[3]).toFixed(1);
    document.getElementById("ironAtoms").innerHTML = Math.floor(ironAtoms);
    document.getElementById("ironRate").innerHTML = (Math.floor(ironAtoms) * ironCost[3]).toFixed(1);
    document.getElementById("water").innerHTML = Math.floor(water);
    document.getElementById("rocks").innerHTML = rocks.toFixed(1);
    document.getElementById("sand").innerHTML = sand.toFixed(1);
    document.getElementById("planets").innerHTML = Math.floor(planets);
    document.getElementById("nebulas").innerHTML = Math.floor(nebulas);
    document.getElementById("stars").innerHTML = Math.floor(stars);
    document.getElementById("energy").innerHTML = Math.floor(energy);
    document.getElementById("blackHoles").innerHTML = Math.floor(blackHoles);
    document.getElementById("energyCostHydrogen").innerHTML = Math.floor(blackHoles);
    document.getElementById("energyCostOxygen").innerHTML = Math.floor(blackHoles);
    document.getElementById("energyCostIron").innerHTML = Math.floor(blackHoles);
    document.getElementById("energyCostSilicon").innerHTML = Math.floor(blackHoles);

}

function buyMax(unitType) {
	var max = 0;
	var divisor = 0;
    if (unitType == "hydrogen" || unitType == "oxygen" || unitType == "silicon" || unitType == "iron" || unitType == "carbon" && Math.floor(blackHoles) < 1) {
        switch (unitType) {
            case "hydrogen":
                if (electrons <= neutrons && electrons <= protons) {
                    max = electrons;
                } else if (neutrons <= electrons && neutrons <= protons) {
                    max = neutrons;
                } else {
                    max = protons;
                }
                buyHydrogen(Math.floor(max));
                break;
            case "carbon":
                if (electrons <= neutrons && electrons <= protons) {
                    max = electrons;
                } else if (neutrons <= electrons && neutrons <= protons) {
                    max = neutrons;
                } else {
                    max = protons;
                }
                buyCarbon(Math.floor(max / 6));
                break;
            case "oxygen":
                if (electrons <= neutrons && electrons <= protons) {
                    max = electrons;
                } else if (neutrons <= electrons && neutrons <= protons) {
                    max = neutrons;
                } else {
                    max = protons;
                }
                buyOxygen(Math.floor(max / 8));
                break;
            case "silicon":
                if (electrons <= neutrons && electrons <= protons) {
                    max = electrons;
                } else if (neutrons <= electrons && neutrons <= protons) {
                    max = neutrons;
                } else {
                    max = protons;
                }
                buySilicon(Math.floor(max / 14));
                break;
            case "iron":
                if (electrons / ironCost[0] <= neutrons / ironCost[2] && electrons / ironCost[0] <= protons / ironCost[1]) {
                    max = electrons;
                    divisor = 26;
                } else if (neutrons / ironCost[2] <= electrons / ironCost[0] && neutrons / ironCost[2] <= protons / ironCost[1]) {
                    max = neutrons;
                    divisor = 33;
                } else {
                    max = protons;
                    divisor = 26;
                }
                buyIron(Math.floor(max / divisor));
                break;
        }
    }
    switch (unitType) {
        case "hydrogen":
            if (electrons <= neutrons && electrons <= protons && electrons <= energy / energyCost) {
                max = electrons;
                divisor = 1;
            } else if (neutrons <= electrons && neutrons <= protons && neutrons <= energy / energyCost) {
                max = neutrons;
                divisor = 1;
            } else if (protons <= electrons && protons <= neutrons && protons <= energy / energyCost) {
                max = protons;
                divisor = 1;
            } else {
                max = energy;
                divisor = energyCost;
            }
            buyHydrogen(Math.floor(max / divisor));
            break;
        case "carbon":
            if (electrons / 6 <= neutrons / 6 && electrons / 6 <= protons / 6 && electrons / 6 <= energy / energyCost) {
                max = electrons;
                divisor = 6;
            } else if (neutrons / 6 <= electrons / 6 && neutrons / 6 <= protons / 6 && neutrons / 6 <= energy / energyCost) {
                max = neutrons;
                divisor = 6;
            } else if (protons / 6 <= electrons / 6 && protons / 6 <= neutrons / 6 && protons / 6 <= energy / energyCost) {
                max = protons;
                divisor = 6;
            } else {
                max = energy;
                divisor = energyCost;
            }
            buyCarbon(Math.floor(max / divisor));
            break;
        case "oxygen":
            if (electrons / 8 <= neutrons / 8 && electrons / 8 <= protons / 8 && electrons / 8 <= energy / energyCost) {
                max = electrons;
                divisor = 8;
            } else if (neutrons / 8 <= electrons / 8 && neutrons / 8 <= protons / 8 && neutrons / 8 <= energy / energyCost) {
                max = neutrons;
                divisor = 8;
            } else if (protons / 8 <= electrons / 8 && protons / 8 <= neutrons / 8 && protons / 8 <= energy / energyCost) {
                max = protons;
                divisor = 8;
            } else {
                max = energy;
                divisor = energyCost;
            }
            buyOxygen(Math.floor(max / divisor));
            break;
        case "silicon":
            if (electrons / 14 <= neutrons / 14 && electrons / 14 <= protons / 14 && electrons / 14 <= energy / energyCost) {
                max = electrons;
                divisor = 14;
            } else if (neutrons / 14 <= electrons / 14 && neutrons / 14 <= protons / 14 && neutrons / 14 <= energy / energyCost) {
                max = neutrons;
                divisor = 14;
            } else if (protons / 14 <= electrons / 14 && protons / 14 <= neutrons / 14 && protons / 14 <= energy / energyCost) {
                max = neutrons;
                divisor = 14;
            } else {
                max = energy;
                divisor = energyCost;
            }
            buySilicon(Math.floor(max / divisor));
            break;
        case "iron":
            if (electrons / ironCost[0] <= neutrons / ironCost[2] && electrons / ironCost[0] <= protons / ironCost[1] && electrons / ironCost[0] <= energy / energyCost) {
                max = electrons;
                divisor = 26;
            } else if (neutrons / ironCost[2] <= electrons / ironCost[0] && neutrons / ironCost[2] <= protons / ironCost[1] && neutrons / ironCost[2] <= energy / energyCost) {
                max = neutrons;
                divisor = 33;
            } else if (protons / ironCost[1] <= electrons / ironCost[0] && protons / ironCost[1] <= neutrons / ironCost[2] && protons / ironCost[1] <= energy / energyCost) {
                max = protons;
                divisor = 26;
            } else {
                max = energy;
                divisor = energyCost;
            }
            buyIron(Math.floor(max / divisor));
            break;
        case "water":
            if (hydrogenAtoms / 2 <= oxygenAtoms) {
                max = hydrogenAtoms;
                divisor = 2;
            } else {
                max = oxygenAtoms;
                divisor = 1;
            }
            buyWater(Math.floor(max / divisor));
            break;
        case "rock":
            if (ironAtoms / 2 <= siliconAtoms && ironAtoms <= oxygenAtoms) {
                max = ironAtoms;
                divisor = 2;
            } else if (siliconAtoms <= ironAtoms / 2 && siliconAtoms <= oxygenAtoms / 2) {
                max = siliconAtoms;
                divisor = 1;
            } else {
                max = oxygenAtoms;
                divisor = 2;
            }
            buyRock(Math.floor(max / divisor));
            break;
        case "sand":
            if (siliconAtoms <= oxygenAtoms / 2) {
                max = siliconAtoms;
                divisor = 1;
            } else {
                max = oxygenAtoms;
                divisor = 2;
            }
            buySand(Math.floor(max / divisor));
            break;
        case "planet":
            max = ironAtoms;
            divisor = planetCost[0];
            buyPlanet(Math.floor(max / divisor));
            break;
        case "nebula":
            max = hydrogenAtoms;
            divisor = nebulaCost[0];
            buyNebula(Math.floor(max / divisor));
            break;
        case "star":
            max = nebulas;
            divisor = starCost[0];
            buyStar(Math.floor(max / divisor));
            break;
        default:
            break;
    }
}

function buyHydrogen(number) {
    if (electrons >= number * hydrogenCost[0] && protons >= number * hydrogenCost[1] && neutrons >= number * hydrogenCost[2] && energy >= Math.floor(blackHoles) * number) {
        hydrogenAtoms = hydrogenAtoms + number;
        electrons = electrons - number;
        protons = protons - number;
        neutrons = neutrons - number;
        energy -= Math.floor(blackHoles) * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buyCarbon(number) {
    if (electrons >= number * carbonValues[0] && protons >= number * carbonValues[1] && neutrons >= number * carbonValues[2] && energy >= Math.floor(blackHoles) * number) {
        carbonAtoms = carbonAtoms + number;
        electrons = electrons - number;
        protons = protons - number;
        neutrons = neutrons - number;
        energy -= Math.floor(blackHoles) * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buyOxygen(number) {
    if (electrons >= number * oxygenCost[0] && protons >= number * oxygenCost[1] && neutrons >= number * oxygenCost[2] && energy >= Math.floor(blackHoles) * number) {
        oxygenAtoms = oxygenAtoms + number;
        electrons = electrons - oxygenCost[0] * number;
        protons = protons - oxygenCost[1] * number;
        neutrons = neutrons - oxygenCost[2] * number;
        energy -= Math.floor(blackHoles) * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buySilicon(number) {
    if (electrons >= number * siliconValues[0] && protons >= number * siliconValues[1] && neutrons >= number * siliconValues[2] && energy >= Math.floor(blackHoles) * number) {
        siliconAtoms = siliconAtoms + number;
        electrons = electrons - siliconValues[0] * number;
        protons = protons - siliconValues[1] * number;
        neutrons = neutrons - siliconValues[2] * number;
        energy -= Math.floor(blackHoles) * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buyIron(number) {
    if (electrons >= number * ironCost[0] && protons >= number * ironCost[1] && neutrons >= number * ironCost[2] && energy >= Math.floor(blackHoles) * number) {
        ironAtoms = ironAtoms + number;
        electrons = electrons - ironCost[0] * number;
        protons = protons - ironCost[1] * number;
        neutrons = neutrons - ironCost[2] * number;
        energy -= Math.floor(blackHoles) * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buyWater(number) {
    if (hydrogenAtoms >= waterCost[0] * number && oxygenAtoms >= waterCost[1] * number) {
        water = water + number;
        hydrogenAtoms = hydrogenAtoms - waterCost[0] * number;
        oxygenAtoms = oxygenAtoms - waterCost[1] * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buyRock(number) {
    if (ironAtoms >= rockValues[0] * number && siliconAtoms >= rockValues[1] * number && oxygenAtoms >= rockValues[2] * number) {
        rocks = rocks + number;
        ironAtoms = ironAtoms - rockValues[0] * number;
        siliconAtoms = siliconAtoms - rockValues[1] * number;
        oxygenAtoms = oxygenAtoms - rockValues[2] * number;
        totalUnits += number;
        updateAllValues();
    }
}

function rockGain(number) {
    sand = sand + rockValues[3] * number;
    ironAtoms = ironAtoms + rockValues[4] * number;
    rocks = rocks - rockValues[5] * number;
}

function buySand(number) {
    if (siliconAtoms >= sandValues[0] * number && oxygenAtoms >= sandValues[1] * number) {
        sand = sand + number;
        siliconAtoms = siliconAtoms - sandValues[0] * number;
        oxygenAtoms = oxygenAtoms - sandValues[1] * number;
        totalUnits += number;
        updateAllValues();
    }
}

function sandGain(number) {
    siliconAtoms = siliconAtoms + sandValues[2] * number;
    oxygenAtoms = oxygenAtoms + sandValues[3] * number;
}

function buyAsteroid(number) {

}

function asteroidGain(number) {

}

function buyAsteroidBelt(number) {

}

function asteroidBeltGain(number) {

}

function buyPlanet(number) {
    if (ironAtoms >= number * planetCost[0]) {
        planets = planets + number;
        ironAtoms = ironAtoms - number * planetCost[0];
        totalUnits += number;
        updateAllValues();
    }
}

function planetGain(number) {
    water = water + planetCost[1] * number;
}

function buyNebula(number) {
    if (hydrogenAtoms >= number * nebulaCost[0]) {
        nebulas = nebulas + number;
        hydrogenAtoms = hydrogenAtoms - number * nebulaCost[0];
        totalUnits += number;
        updateAllValues();
    }
}

function nebulaGain(number) {
    hydrogenAtoms = hydrogenAtoms + nebulaCost[2] * number;
    stars = stars + nebulaCost[1] * number;
}

function buyStar(number) {
    if (nebulas >= number * starCost[0]) {
        stars = stars + number;
        nebulas = nebulas - number * starCost[0];
        totalUnits += number;
        updateAllValues();
    }
}

function starGain(number) {
    ironAtoms = ironAtoms + starCost[1] * number;
    blackHoles = blackHoles + .0001 * Math.floor(stars);
    energy = energy + number;
}

function buyStarSystem(number) {
    if (stars >= number && planets >= 8 * number) {
        starSystems = starSystems + number;
        stars = stars - number;
        planets = planets - number * 8;
        totalUnits += number;
        updateAllValues();
    }
}

function starSystemGain(number) {}
setInterval(function() {
    rockGain(rocks);
    sandGain(sand);
    planetGain(planets);
    starGain(stars);
    nebulaGain(nebulas);
    starSystemGain(starSystems);
    time++;
    checkConditions(achievements);
    checkConditions(events);
    checkUnlocks();
    updateAllValues();
}, 1000);
setInterval(function() {
    save();
}, 60000);
window.onload = function() {
    load();
    loadAchievements();
    loadUnlocks();
};