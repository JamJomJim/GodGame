var days, hours, minutes, seconds;
var percentOfUniverse = 0;
var atomsInUniverse = Math.pow(10, 80);
var stats = {
	time: 0,
	numAchievements: 0,
	totalClicks: 0,
	totalUnits: 0
}
var info = {
	units: units,
	currentEventOne: " ",
	currentEventTwo: " ",
	currentEventThree: " ",
	currentEventFour: " "	
}
var units = {
	electron:  new unit("electron", 0, 0, null, null),
	neutron:  new unit("neutron", 0, 0, null, null),
	proton:  new unit("proton", 0, 0, null, null),
	hydrogen: new unit("hydrogen", 11, 1, ["electron", 1, "neutron", 1, "proton", 1], ["electron", 0.1, "proton", 0.1, "neutron", 0.1]),
	carbon: new unit("carbon", 0, 1, ["electron", 6, "neutron", 6, "proton", 6], ["electron", 0.1, "proton", 0.1, "neutron", 0.1]),
	oxygen: new unit("oxygen", 0, 1, ["electron", 8, "neutron", 8, "proton", 8], ["electron", 0.8, "proton", 0.8, "neutron", 0.8]),
	silicon: new unit("silicon", 0, 1, ["electron", 14, "neutron", 14, "proton", 14], ["electron", 1.4, "proton", 1.4, "neutron", 1.4]),
	iron: new unit("iron", 0, 1, ["electron", 26, "neutron", 33, "proton", 26], ["electron", 2.6, "proton", 2.6, "neutron", 3.3]),
	water: new unit("water", 0, 3, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),
	nucleotide: new unit("nucleotide", 0, 1, ["carbon", 5, "hydrogen", 6, "nitrogen", 2, "oxygen", 2], ["hydrogen", 0.2, "oxygen", 0.1]),
	DNA: new unit("DNA", 0, 1, ["nucleotide", 6000000000], ["hydrogen", 0.2, "oxygen", 0.1]),
	cell: new unit("cell", 0, 1, ["DNA", 1, "water", 5000000000], ["hydrogen", 0.2, "oxygen", 0.1]),	
	silica: new unit("silica", 0, 3, ["silicon", 1, "oxygen", 2], ["hydrogen", 0.2, "oxygen", 0.1]),
	rock: new unit("rock", 0, 3, ["silicon", 1, "oxygen", 2], ["hydrogen", 0.2, "oxygen", 0.1]),
	asteroid: new unit("asteroid", 0, 3, ["rock", 1000000], ["hydrogen", 0.2, "oxygen", 0.1]),
	asteroidBelt: new unit("asteroidBelt", 0, 3, ["asteroid", 1000, "water", 1000000], ["hydrogen", 0.2, "oxygen", 0.1]),	
	planet: new unit("planet", 0, 1, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),	
	nebulas: new unit("nebula", 0, 1, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),			
	stars: new unit("star", 0, 1, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),
	solarSystem: new unit("solarSystem", 0, 3, ["star", 1, "planet", 8, "asteroidBelt", 1], ["hydrogen", 0.2, "oxygen", 0.1]),
	blackhole: new unit("blackhole", 0, 3, ["star", 1], null),
	galaxy: new unit("galaxy", 0, 3, ["supermassiveBlackhole", 2, "solarSystem", 1000000000], ["hydrogen", 0.2, "oxygen", 0.1]),
	galaxyCluster: new unit("galaxyCluster", 0, 3, ["galaxy", 1000], ["hydrogen", 0.2, "oxygen", 0.1]),
	galaxySuperCluster: new unit("galaxySuperCluster", 0, 3, ["galaxyCluster", 100], ["hydrogen", 0.2, "oxygen", 0.1]),	
	supermassiveBlackhole: new unit("supermassiveBlackhole", 0, 3, ["blackhole", 1000], null),		
	human: new unit("human", 0, 1, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),
};
var achievements = {
    timeOne: new achievement("timeOne", ["stats", "time", 900], false),
    recordBreaker: new achievement("recordBreaker",["unit", "human", 1], false)
};
var events = {
    newGame: new evt("newGame", ["stats", "time", 2], false, "You're a god now. But what's a god without a universe?"),
    firstClick: new evt("firstClick", ["stats", "totalClicks", 1], false, "Click the button to put energy into the universe and create matter."),
    tenClicks: new evt("tenClicks", ["stats", "totalClicks", 25], false, "You find that when you put energy into your universe, particles pop into existence out of complete nothingness"),
    tenUnits: new evt("tenUnits", ["stats", "totalUnits", 10], false, "It looks like you have a very small universe... but dont worry as your universe grows so does your ability to make what matters: matter."),
    createdWater: new evt("createdWater", ["units", "water", 1], false, "As you create water, you find that you can now produce atoms out of nothing too.")
};
var unlocks = {
    water: new unlock("waterSection", ["unit", "hydrogen", 10], false),
    silica: new unlock("silicaSection", ["unit", "hydrogen", 10], false),	
    nucleotide: new unlock("nucleotideSection", ["unit", "hydrogen", 10], false),
    DNA: new unlock("DNASection", ["unit", "hydrogen", 10], false),
    cell: new unlock("cellSection", ["unit", "hydrogen", 10], false),	
    rock: new unlock("rockSection", ["unit", "hydrogen", 10], false),
	asteroid: new unlock("asteroidSection", ["unit", "hydrogen", 10], false),
	asteroidBelt: new unlock("asteroidBeltSection", ["unit", "hydrogen", 10], false),
    planets: new unlock("planetSection", ["unit", "hydrogen", 10], false),
    stars: new unlock("starSection", ["unit", "hydrogen", 10], false),
	solarSystem: new unlock("solarSystemSection", ["unit", "hydrogen", 10], false),
	blackhole: new unlock("blackholeSection", ["unit", "hydrogen", 10], false),
	supermassiveBlackhole: new unlock("supermassiveBlackholeSection", ["unit", "hydrogen", 10], false),
	galaxy: new unlock("galaxySection", ["unit", "hydrogen", 10], false),
	galaxyCluster: new unlock("galaxyClusterSection", ["unit", "hydrogen", 10], false),
	galaxySuperCluster: new unlock("galaxySuperClusterSection", ["unit", "hydrogen", 10], false),
	life: new unlock("leftTab", ["unit", "nucleotide", 1000], false),
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function unit(type, amount, atoms, cost, production){
	this.type = type;
	this.amount = amount;
	this.atoms = atoms;
	this.cost = cost;
	this.production = production;
}

function achievement(divName, condition, state) {
    this.condition = condition;
    this.divName = divName;
    this.state = state;
}

function evt(divName, condition, state, message) {
    this.condition = condition;
    this.divName = divName;
    this.state = state;
	this.message = message;
}

function newEvent(message) {
    info.currentEventFour =  info.currentEventThree;
    info.currentEventThree =  info.currentEventTwo;
    info.currentEventTwo =  info.currentEventOne;
    info.currentEventOne = message;
    document.getElementById("eventOne").innerHTML =  info.currentEventOne;
    document.getElementById("eventTwo").innerHTML =  info.currentEventTwo;
    document.getElementById("eventThree").innerHTML =  info.currentEventThree;
    document.getElementById("eventFour").innerHTML =  info.currentEventFour;
}

function unlock(divName, condition, state) {
    this.condition = condition;
    this.divName = divName;
    this.state = state;
}

function checkAchievements(){
	for(achievement in achievements) {
		if(achievements[achievement].state !== true){
			var tempBool = false;
			for(i = 0; i < achievements[achievement].condition.length; i += 3){
				if(achievements[achievement].condition[i] == "unit") {
					if(units[achievements[achievement].condition[i + 1]].amount >= achievements[achievement].condition[i + 2]){
						tempBool = true;
					}
					else tempBool = false;
				}
				if(achievements[achievement].condition[i] == "stats") {
					if(stats[achievements[achievement].condition[i + 1]] >= achievements[achievement].condition[i + 2]){
						tempBool = true;
						}
					else tempBool = false;				
				}		
			}
			if(tempBool === true) {
				achievements[achievement].state = true;
				stats.numAchievements += 1;
			}
		}
	}
}

function checkEvents(){
	for(evt in events) {
		if(events[evt].state !== true){
			var tempBool = false;
			for(i = 0; i < events[evt].condition.length; i += 3){
				if(events[evt].condition[i] == "unit") {
					if(units[events[evt].condition[i + 1]].amount >= events[evt].condition[i + 2]){
						tempBool = true;
					}
					else tempBool = false;
				}
				if(events[evt].condition[i] == "stats") {
					if(stats[events[evt].condition[i + 1]] >= events[evt].condition[i + 2]){
						tempBool = true;
						}
					else tempBool = false;				
				}		
			}
			if(tempBool === true) {
				events[evt].state = true;
				newEvent(events[evt].message);
			}
		}
	}	
}

function checkUnlocks() {
	for(unlock in unlocks) {
		if(unlocks[unlock].state !== true){
			var tempBool = false;
			for(i = 0; i < unlocks[unlock].condition.length; i += 3){
				if(unlocks[unlock].condition[i] == "unit") {
					if(units[unlocks[unlock].condition[i + 1]].amount >= unlocks[unlock].condition[i + 2]){
						tempBool = true;
					}
					else tempBool = false;
				}
				if(unlocks[unlock].condition[i] == "stats") {
					if(stats[unlocks[unlock].condition[i + 1]] >= unlocks[unlock].condition[i + 2]){
						tempBool = true;
						}
					else tempBool = false;				
				}		
			}
			if(tempBool === true) {
				unlocks[unlock].state = true;
			}
		}
	}	
}

function createMatter(number) {	
	var randomEven = Math.floor(Math.random() * units[unit].production.length / 2) * 2;
	var randomOdd = randomEven + 1;
	for(unit in units) {
		if(units[unit].production != null){
			units[units[unit].production[randomEven]].amount += number * units[unit].amount * units[unit].production[randomOdd];
		}
	}
	var rand = Math.floor(Math.random() * 3) + 1;
	if(rand == 1) units.electron.amount++;
	else if(rand == 2) units.neutron.amount++;
	else units.proton.amount++;
	updateAllValues();
}

function buyUnit(type, number) {
	var enough = false;
	for(i = 0; i < units[type].cost.length; i += 2) {
		if(units[units[type].cost[i]].amount >= number * units[type].cost[i + 1]) {
			enough = true;
		}
		else {
			enough = false;
			break;
		}
	}
	if(enough){
		for(i = 0; i < units[type].cost.length; i += 2) {
			units[units[type].cost[i]].amount -= number * units[type].cost[i + 1];
		}
		units[type].amount += number;
		updateAllValues();
	}
}

function buyMax(unit) {
	var ratios = [];
	for(i = 0; i < units[unit].cost.length; i += 2) {
		ratios.push(units[units[unit].cost[i]].amount / units[unit].cost[i+1]);
	}
	buyUnit(unit, Array.min(ratios));
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

function save() {
    var save = {
		units: units,
		stats: stats,
		achievements: achievements,
        events: events,
        unlocks: unlocks,
    };
    localStorage.setItem("save", JSON.stringify(save));
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.units !== "undefined") units = savegame.units;
    if (typeof savegame.stats !== "undefined") stats = savegame.stats;
    if (typeof savegame.achievements !== "undefined") achievements = savegame.achievements;
    if (typeof savegame.unlocks !== "undefined") unlocks = savegame.unlocks;
    if (typeof savegame.events !== "undefined") events = savegame.events;
}

function loadAchievements() {
    for (achievement in achievements) {
        if (achievements[achievement].state === true) document.getElementById(achievements[achievement].divName).style.display = "block";
	}
	if(stats.numAchievements >= 1){
		document.getElementById("noAchievements").style.display = "none";
	}
}

function loadUnlocks() {
	for (unlock in unlocks) {
		if (unlocks[unlock].state === true) document.getElementById(unlocks[unlock].divName).style.display = "block";
	}
}

function determineTimePlayed() {
	time = stats.time;
    seconds = ((time % 86400) % 3600) % 60;
    minutes = (((time - seconds) % 86400) % 3600) / 60;
    hours = (((time - seconds) - minutes * 60) % 86400) / 3600;
    days = (((time - seconds) - minutes * 60) - hours * 3600) / 86400;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function updateAllValues() {
	info.units = units;
	stats.totalUnits = 0;
	stats.totalAtoms = 0;
	for(unit in units) {
		document.getElementById(units[unit].type).innerHTML = units[unit].amount.toFixed(0);
		stats.totalUnits += units[unit].amount;
		stats.totalAtoms += units[unit].amount * units[unit].atoms;
	}
    determineTimePlayed();
    a = stats.totalAtoms / atomsInUniverse;
    document.getElementById("totalAtoms").innerHTML = Math.floor(stats.totalAtoms);
    document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
    document.getElementById("totalAchievements").innerHTML = Object.keys(achievements).length;
    document.getElementById("completedAchievements").innerHTML = stats.numAchievements;
}

setInterval(function() {
    stats.time++;
    updateAllValues();
	checkAchievements();
	checkEvents();
	checkUnlocks();
    loadAchievements();
	loadUnlocks();
}, 1000);
setInterval(function() {
    save();
}, 60000);
window.onload = function() {
    load();
    loadAchievements();
    loadUnlocks();
};