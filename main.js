//Initialisation of variables
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
	hydrogen: new unit("hydrogen", 0, 1, [], []),
	carbon: new unit("carbon", 0, 1, [], []),
	nitrogen: new unit("nitrogen", 0, 1, [], []),	
	oxygen: new unit("oxygen", 0, 1, [], []),
	silicon: new unit("silicon", 0, 1, [], []),
	iron: new unit("iron", 0, 1, [], []),
	water: new unit("water", 0, 3, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),
	carbonDioxide: new unit("carbonDioxide", 0, 3, ["carbon", 1, "oxygen", 2], ["carbon", 0.1, "oxygen", 0.2]),
	silica: new unit("silica", 0, 3, ["silicon", 1, "oxygen", 2], ["silicon", 0.1, "oxygen", 0.1]),
	rock: new unit("rock", 0, 3, ["silica", 1, "iron", 2], ["silica", 0.1]),
	waterDrop: new unit("waterDrop", 0, 3, ["silica", 1, "iron", 2], []),	
	river: new unit("river", 0, 3, ["silica", 1, "iron", 2], []),	
	asteroid: new unit("asteroid", 0, 3, ["hydrogen", 1000000], []),
	asteroidBelt: new unit("asteroidBelt", 0, 3, ["asteroid", 1000, "water", 1000000], []),	
	planet: new unit("planet", 0, 1, ["hydrogen", 2, "oxygen", 1], []),	
	nebula: new unit("nebula", 0, 1, ["hydrogen", 2, "oxygen", 1], []),			
	star: new unit("star", 0, 1, ["hydrogen", 2, "oxygen", 1], []),
	solarSystem: new unit("solarSystem", 0, 3, ["star", 1, "planet", 8, "asteroidBelt", 1], []),
	blackhole: new unit("blackhole", 0, 3, ["star", 1], []),
	galaxy: new unit("galaxy", 0, 3, ["supermassiveBlackhole", 2, "solarSystem", 1000000000], []),
	galaxySuperCluster: new unit("galaxySuperCluster", 0, 3, ["galaxy", 100], []),	
	supermassiveBlackhole: new unit("supermassiveBlackhole", 0, 3, ["blackhole", 1000], []),		
	nucleotide: new unit("nucleotide", 0, 1, ["carbon", 5, "hydrogen", 6, "nitrogen", 2, "oxygen", 2], []),
	DNA: new unit("DNA", 0, 1, ["nucleotide", 6000000000], []),
	cell: new unit("cell", 0, 1, ["DNA", 1, "water", 5000000000], []),
	amoeba: new unit("amoeba", 0, 1,["cell", 1], []),
	human: new unit("human", 0, 1, ["hydrogen", 2, "oxygen", 1], []),
};
var achievements = {
    timeOne: new achievement("timeOne", ["stats", "time", 900], false),
    recordBreaker: new achievement("recordBreaker",["unit", "human", 1], false)
};
//Remove divname from object and use the property name instead. Theyre redundant
var events = {
    newGame: new evt("newGame", ["stats", "time", 2], false, "You're a god now. But what's a god without a universe?"),
    firstClick: new evt("firstClick", ["stats", "totalClicks", 1], false, "Click the button to extract atoms from the ball."),
    tenClicks: new evt("tenClicks", ["stats", "totalClicks", 25], false, "You find that when you put energy into your universe, particles pop into existence out of complete nothingness"),
    tenUnits: new evt("tenUnits", ["stats", "totalUnits", 10], false, "It looks like you have a very small universe... but dont worry as your universe grows so does your ability to make what matters: matter."),
    createdWater: new evt("createdWater", ["units", "water", 1], false, "As you create water, you find that you can now produce atoms out of nothing too.")
};
var unlocks = {
	molecules: new unlock(["unit", "hydrogen", 10, "unit", "oxygen", 10], false),
	substance:  new unlock(["unit", "silica", 100], false),
	planetary:  new unlock(["unit", "rock", 10], false),
	space:  new unlock(["unit", "rock", 10], false),
	carbon: new unlock(["unit", "nitrogen", 10], false),
	nitrogen: new unlock(["unit", "iron", 10], false),
	silicon: new unlock(["unit", "oxygen", 10], false),
	iron: new unlock(["unit", "silicon", 10], false),
    water: new unlock(["unit", "hydrogen", 10], false),
    carbonDioxide: new unlock(["unit", "silica", 10], false),
    silica: new unlock(["unit", "silicon", 10], false),	
	rock: new unlock(["unit", "silica", 1000], false),
    waterDrop: new unlock(["unit", "DNA", 1], false),		
    river: new unlock(["unit", "DNA", 1], false),		
	asteroid: new unlock(["unit", "silica", 100000], false),
	asteroidBelt: new unlock(["unit", "asteroid", 100], false),
    planet: new unlock(["unit", "silica", 10000000000], false),
    star: new unlock(["unit", "nebula", 10], false),
	solarSystem: new unlock(["unit", "star", 1], false),
	blackhole: new unlock(["unit", "star", 10], false),
	supermassiveBlackhole: new unlock(["unit", "blackhole", 1000], false),
	galaxy: new unlock(["unit", "blackhole", 10], false),
	galaxySuperCluster: new unlock(["unit", "galaxy", 10], false),
	life: new unlock(["unit", "carbon", 10000], false),
	nucleotide: new unlock(["unit", "carbon", 10000], false),
    DNA: new unlock(["unit", "nucleotide", 10000], false),
    cell: new unlock(["unit", "DNA", 1], false),	
    amoeba: new unlock(["unit", "DNA", 1], false),	
    human: new unlock(["unit", "DNA", 1], false),		
};
//Class Constructors
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
//remove divname
function evt(divName, condition, state, message) {
    this.condition = condition;
    this.divName = divName;
    this.state = state;
	this.message = message;
}

function unlock(condition, state) {
    this.condition = condition;
    this.state = state;
}
//Condition Checks
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
			// Temporarily unlock everything to help with formatting
			unlocks[unlock].state = true;	
		}
	}	
}

function create(type) {
	var prod = 1;	
	for(unit in units) {
		if(units[unit].production.length > 0){
			for(i = 0; i < units[unit].production.length; i += 2){
				if(units[unit].production[i] == type){
					prod += units[unit].production[i + 1] * units[unit].amount;
				}
			}
		}
	}
	if(prod > determineMax(type)) prod = determineMax(type);
	buyUnit(type, prod);
	updateAllValues();
}

function buyUnit(type, number) {
	if(units[type].cost.length > 0 ){	
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
		}
	}
	else units[type].amount += number;
}

function determineMax(unit) {
	var ratios = [];
	for(i = 0; i < units[unit].cost.length; i += 2) {
		ratios.push(units[units[unit].cost[i]].amount / units[unit].cost[i+1]);
	}
	return Math.floor(Array.min(ratios));
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

function openUnitTab(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontentUnit");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinksUnit");
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
		if (unlocks[unlock].state === true) document.getElementById(unlock + "Section").style.display = "block";
	}
}

function updateAllValues() {
	info.units = units;
	stats.totalUnits = 0;
	stats.totalAtoms = 0;
	for(unit in units) {
		document.getElementById(unit).innerHTML = units[unit].amount.toFixed(0);
		stats.totalUnits += units[unit].amount;
		stats.totalAtoms += units[unit].amount * units[unit].atoms;
	}
	for(var unitA in units) {
		var number = 1;
		for(var unitB in units) {
			if(units[unitB].production != null){
				for(i = 0; i < units[unitB].production.length; i++){
					if(units[unitB].production[i] == units[unitA].type){
						number += units[unitB].production[i + 1] * units[unitB].amount;
					}
				}
			}
		}
		if(number > determineMax(unitA)) number = determineMax(unitA);
		number = Math.floor(number * 10) / 10;
		document.getElementById(unitA + "AmountCreated").innerHTML = number;
		for(i = 1; i <= (units[unitA].production.length / 2); i++) document.getElementById(unitA + "Effect" + i.toString()).innerHTML = units[unitA].amount * units[unitA].production[1 + (i-1) * 2]; 
	}	
    determineTimePlayed();
    a = stats.totalAtoms / atomsInUniverse;
    document.getElementById("totalAtoms").innerHTML = Math.floor(stats.totalAtoms);
    document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
    document.getElementById("totalAchievements").innerHTML = Object.keys(achievements).length;
    document.getElementById("completedAchievements").innerHTML = stats.numAchievements;
}

// Helper Functions
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

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