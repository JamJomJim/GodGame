var time = 0;
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
var water = 0;
var rocks = 0;
var sand = 0;
var planets = 0;
var nebulas = 0;
var stars = 0;
var starSystems = 0;
var blackHoles = 0;
var atoms = {
	hydrogen: new atom("hydrogen", 0, 1, 1, 1, .1),
	carbon: new atom("carbon", 0, 6, 6, 6, .5),
	oxygen: new atom("oxygen", 0, 8, 8, 8, 1),
	silicon: new atom("silicon", 0, 14, 14, 14, 1.5),
	iron: new atom("iron", 0, 26, 33, 26, 3)
};
var life = {
    humans: {
        number: 0
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
var waterCost = [2, 1, .2, .1, 3]; // [hydrogen, oxygen, hydrogen production rate, oxygen production rate, atomic value]
var rockValues = [2, 1, 2, .01, .01, .01, 5]; // [iron, silicon, oxygen, sand production, iron production, rock decay rate, atomic value]
var sandValues = [1, 2, .01, .02, 3]; // [silicon, oxygen, silicon production rate, oxygen production rate, atomic value]
var planetCost = [10000, 100, 10000]; // [iron, iron production rate, atom cost]
var nebulaCost = [1000000, .01, 1000, 1000000]; // [hydrogen, star production rate, hydrogen production rate, atom cost]
var starCost = [.001, 10, 1000]; // [nebulas, hydrogen production rate, atom cost]

function achievement(requirement, amount, state, divName, message) {
    this.requirement = requirement;
    this.amount = amount;
    this.divName = divName;
    this.state = state;
    this.message = message;
}

function atom(type, amount, electronCost, neutronCost, protonCost, matterGain) {
	this.type = type;
	this.amount = amount;
	this.electronCost = electronCost;
	this.neutronCost = neutronCost;
	this.protonCost = protonCost;
	this.matterGain = matterGain;
}

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
    if (atoms.hydrogen.amount >= 2 && atoms.oxygen.amount >= 1 && unlocks.water === false) {
        waterDiv = document.getElementById("waterSection");
        waterDiv.style.display = "block";
        unlocks.water = true;
    }
    if (atoms.silicon.amount >= 1 * rockValues[1] && atoms.oxygen.amount >= 1 * rockValues[2] && atoms.iron.amount >= 1 * rockValues[0] && unlocks.rock === false) {
        rockDiv = document.getElementById("rockSection");
        rockDiv.style.display = "block";
        unlocks.rock = true;
    }
    if (water >= planetCost[1] * 1 && atoms.iron.amount >= 1 * planetCost[0] && rocks >= planetCost[2] * 1 && unlocks.planets === false) {
        planetDiv = document.getElementById("planetSection");
        planetDiv.style.display = "block";
        unlocks.planets = true;
    }
    if (atoms.hydrogen.amount >= nebulaCost[0] && unlocks.stars === false) {
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
		atoms: atoms,
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
    if (typeof savegame.atoms.hydrogen.amount !== "undefined") atoms.hydrogen.amount = savegame.atoms.hydrogen.amount;
    if (typeof savegame.atoms.carbon.amount !== "undefined") atoms.carbon.amount = savegame.atoms.carbon.amount;
    if (typeof savegame.atoms.oxygen.amount !== "undefined") atoms.oxygen.amount = savegame.atoms.oxygen.amount;
    if (typeof savegame.atoms.iron.amount !== "undefined") atoms.iron.amount = savegame.atoms.iron.amount;
    if (typeof savegame.atoms.silicon.amount !== "undefined") atoms.silicon.amount = savegame.atoms.silicon.amount;
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
    var value = number + number * (atoms.hydrogen.amount * atoms.hydrogen.matterGain + atoms.oxygen.amount * atoms.oxygen.matterGain + atoms.silicon.amount * atoms.silicon.matterGain + atoms.iron.amount * atoms.iron.matterGain);
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
        atoms.hydrogen.amount += number * water * waterCost[2];
    } else atoms.oxygen.amount += number * water * waterCost[3];
}

function updateAllValues() {
    determineTimePlayed();
    totalAtoms = atoms.hydrogen.amount + atoms.oxygen.amount + atoms.iron.amount + Math.floor(water) * waterCost[4] + Math.floor(planets) * planetCost[2] + Math.floor(nebulas) * nebulaCost[3] + Math.floor(stars) * starCost[2];
    a = totalAtoms / atomsInUniverse;
    energyCost = Math.floor(blackHoles);
    document.getElementById("totalAtoms").innerHTML = Math.floor(totalAtoms);
    document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
    document.getElementById("totalAchievements").innerHTML = achievements.length;
    document.getElementById("completedAchievements").innerHTML = numAchievements;
    document.getElementById("electrons").innerHTML = Math.floor(electrons);
    document.getElementById("protons").innerHTML = Math.floor(protons);
    document.getElementById("neutrons").innerHTML = Math.floor(neutrons);
    document.getElementById("hydrogenAtoms").innerHTML = Math.floor(atoms.hydrogen.amount);
    document.getElementById("hydrogenRate").innerHTML = Math.floor(atoms.hydrogen.amount * atoms.hydrogen.matterGain);
    document.getElementById("oxygenAtoms").innerHTML = Math.floor(atoms.oxygen.amount);
    document.getElementById("oxygenRate").innerHTML = Math.floor(atoms.oxygen.amount * atoms.oxygen.matterGain);
    document.getElementById("siliconAtoms").innerHTML = Math.floor(atoms.silicon.amount);
    document.getElementById("siliconRate").innerHTML = Math.floor(atoms.silicon.amount * atoms.silicon.matterGain);
    document.getElementById("carbonAtoms").innerHTML = Math.floor(atoms.carbon.amount);
    document.getElementById("carbonRate").innerHTML = Math.floor(atoms.carbon.amount * atoms.carbon.matterGain);
    document.getElementById("ironAtoms").innerHTML = Math.floor(atoms.iron.amount);
    document.getElementById("ironRate").innerHTML = Math.floor(atoms.iron.amount * atoms.iron.matterGain);
    document.getElementById("water").innerHTML = Math.floor(water);
    document.getElementById("rocks").innerHTML = rocks.toFixed(1);
    document.getElementById("sand").innerHTML = sand.toFixed(1);
    document.getElementById("planets").innerHTML = Math.floor(planets);
    document.getElementById("nebulas").innerHTML = nebulas.toFixed(3);
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
    switch (unitType) {
        case "hydrogen":
			divisor = 1;
            if (electrons <= neutrons && electrons <= protons) max = electrons;
            else if (neutrons <= electrons && neutrons <= protons) max = neutrons;
            else if (protons <= electrons && protons <= neutrons && protons) max = protons; 
            buyAtom("hydrogen", Math.floor(max));
            break;
        case "carbon":
            divisor = 6;		
            if (electrons / 6 <= neutrons / 6 && electrons / 6 <= protons / 6) max = electrons;
            else if (neutrons / 6 <= electrons / 6 && neutrons / 6 <= protons / 6) max = neutrons;
			else if (protons / 6 <= electrons / 6 && protons / 6 <= neutrons / 6) max = protons;
            buyAtom("carbon", Math.floor(max/divisor));
            break;
        case "oxygen":
		    divisor = 8;
            if (electrons / 8 <= neutrons / 8 && electrons / 8 <= protons / 8) max = electrons;
            else if (neutrons / 8 <= electrons / 8 && neutrons / 8 <= protons / 8) max = neutrons;
            else if (protons / 8 <= electrons / 8 && protons / 8 <= neutrons / 8) max = protons;
            buyAtom("oxygen", Math.floor(max / divisor));
            break;
        case "silicon":
            divisor = 14;		
            if (electrons / 14 <= neutrons / 14 && electrons / 14 <= protons / 14) max = electrons;
            else if (neutrons / 14 <= electrons / 14 && neutrons / 14 <= protons / 14) max = neutrons;
            else if (protons / 14 <= electrons / 14 && protons / 14 <= neutrons / 14) max = neutrons;
            buyAtom("silicon", Math.floor(max / divisor));
            break;
        case "iron":
			divisor = 26;
            if (electrons / atoms.iron.electronCost <= neutrons / atoms.iron.neutronCost && electrons / atoms.iron.electronCost <= protons / atoms.iron.protonCost) max = electrons;
            else if (neutrons / atoms.iron.neutronCost <= electrons / atoms.iron.electronCost && neutrons / atoms.iron.neutronCost <= protons / atoms.iron.protonCost) {
                max = neutrons;
                divisor = 33;
            } 
			else if (protons / atoms.iron.protonCost <= electrons / atoms.iron.electronCost && protons / atoms.iron.protonCost <= neutrons / atoms.iron.neutronCost) max = protons;
            buyAtom("iron", Math.floor(max / divisor));
            break;
        case "water":
            if (atoms.hydrogen.amount / 2 <= atoms.oxygen.amount) {
                max = atoms.hydrogen.amount;
                divisor = 2;
            } else {
                max = atoms.oxygen.amount;
                divisor = 1;
            }
            buyWater(Math.floor(max / divisor));
            break;
        case "rock":
            if (atoms.iron.amount / 2 <= atoms.silicon.amount && atoms.iron.amount <= atoms.oxygen.amount) {
                max = atoms.iron.amount;
                divisor = 2;
            } else if (atoms.silicon.amount <= atoms.iron.amount / 2 && atoms.silicon.amount <= atoms.oxygen.amount / 2) {
                max = atoms.silicon.amount;
                divisor = 1;
            } else {
                max = atoms.oxygen.amount;
                divisor = 2;
            }
            buyRock(Math.floor(max / divisor));
            break;
        case "sand":
            if (atoms.silicon.amount <= atoms.oxygen.amount / 2) {
                max = atoms.silicon.amount;
                divisor = 1;
            } else {
                max = atoms.oxygen.amount;
                divisor = 2;
            }
            buySand(Math.floor(max / divisor));
            break;
        case "planet":
            max = atoms.iron.amount;
            divisor = planetCost[0];
            buyPlanet(Math.floor(max / divisor));
            break;
        case "nebula":
            max = atoms.hydrogen.amount;
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

function buyAtom(atom, number) {
	if(electrons >= number * atoms[atom].electronCost && protons >= number * atoms[atom].protonCost && neutrons >= atoms[atom].neutronCost){
		atoms[atom].amount += number;
        electrons = electrons - number * atoms[atom].electronCost;
        protons = protons - number * atoms[atom].protonCost;
        neutrons = neutrons - number * atoms[atom].neutronCost;
		totalUnits += number;
        updateAllValues();
	}
}

function buyWater(number) {
    if (atoms.hydrogen.amount >= waterCost[0] * number && atoms.oxygen.amount >= waterCost[1] * number) {
        water = water + number;
        atoms.hydrogen.amount = atoms.hydrogen.amount - waterCost[0] * number;
        atoms.oxygen.amount = atoms.oxygen.amount - waterCost[1] * number;
        totalUnits += number;
        updateAllValues();
    }
}

function buyRock(number) {
    if (atoms.iron.amount >= rockValues[0] * number && atoms.silicon.amount >= rockValues[1] * number && atoms.oxygen.amount >= rockValues[2] * number) {
        rocks = rocks + number;
        atoms.iron.amount = atoms.iron.amount - rockValues[0] * number;
        atoms.silicon.amount = atoms.silicon.amount - rockValues[1] * number;
        atoms.oxygen.amount = atoms.oxygen.amount - rockValues[2] * number;
        totalUnits += number;
        updateAllValues();
    }
}

function rockGain(number) {
    sand = sand + rockValues[3] * number;
    atoms.iron.amount = atoms.iron.amount + rockValues[4] * number;
    rocks = rocks - rockValues[5] * number;
}

function buySand(number) {
    if (atoms.silicon.amount >= sandValues[0] * number && atoms.oxygen.amount >= sandValues[1] * number) {
        sand = sand + number;
        atoms.silicon.amount = atoms.silicon.amount - sandValues[0] * number;
        atoms.oxygen.amount = atoms.oxygen.amount - sandValues[1] * number;
        totalUnits += number;
        updateAllValues();
    }
}

function sandGain(number) {
    atoms.silicon.amount = atoms.silicon.amount + sandValues[2] * number;
    atoms.oxygen.amount = atoms.oxygen.amount + sandValues[3] * number;
}

function buyPlanet(number) {
    if (atoms.iron.amount >= number * planetCost[0]) {
        planets = planets + number;
        atoms.iron.amount = atoms.iron.amount - number * planetCost[0];
        totalUnits += number;
        updateAllValues();
    }
}

function planetGain(number) {
    water = water + planetCost[1] * number;
}

function buyNebula(number) {
    if (atoms.hydrogen.amount >= number * nebulaCost[0]) {
        nebulas = nebulas + number;
        atoms.hydrogen.amount = atoms.hydrogen.amount - number * nebulaCost[0];
        totalUnits += number;
        updateAllValues();
    }
}

function nebulaGain(number) {
    atoms.hydrogen.amount = atoms.hydrogen.amount + nebulaCost[2] * number;
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
    atoms.iron.amount = atoms.iron.amount + starCost[1] * number;
    blackHoles = blackHoles + .0001 * Math.floor(stars);
    energy = energy + number;
}

setInterval(function() {
    rockGain(rocks);
    sandGain(sand);
    planetGain(planets);
    starGain(stars);
    nebulaGain(nebulas);
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