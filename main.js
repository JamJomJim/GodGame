//Initialisation of variables
var stats = {
	time: 0,
	numAchievements: 0,
	totalClicks: 0,
	totalUnits: 0,
	totalAtoms: 0
};
var currentEvents = {
	currentEventOne: " ",
	currentEventTwo: " ",
	currentEventThree: " ",
	currentEventFour: " "	
}
var units = {
	//(costString, effectString, type, amount, atoms, cost, production)
	hydrogen: new unit("Cost: You can create this directly from the ball.", "Used to build more complex things.", "atoms", 0, 1, [], []),
	carbon: new unit("Cost: You can create this directly from the ball.", "Used to build more complex things.", "atoms", 0, 1, [], []),
	nitrogen: new unit("Cost: You can create this directly from the ball.", "Used to build more complex things.", "atoms", 0, 1, [], []),	
	oxygen: new unit("Cost: You can create this directly from the ball.", "Used to build more complex things.", "atoms", 0, 1, [], []),
	silicon: new unit("Cost: You can create this directly from the ball.", "Used to build more complex things.", "atoms", 0, 1, [], []),
	iron: new unit("Cost: You can create this directly from the ball.", "Used to build more complex things.", "atoms", 0, 1, [], []),
	water: new unit("test", "test", "molecules", 0, 0, ["hydrogen", 2, "oxygen", 1], ["hydrogen", 0.2, "oxygen", 0.1]),
	carbonDioxide: new unit("test", ["<span id='carbonDioxideEffect1'>1</span>", "<span id='carbonDioxideEffect2'>4</span>"], "molecules", 0, 0, ["carbon", 1, "oxygen", 2], ["carbon", 0.1, "oxygen", 0.2]),
	silica: new unit("test", "test", "molecules", 0, 0, ["silicon", 1, "oxygen", 2], ["silicon", 0.1, "oxygen", 0.1]),
	rock: new unit("test", "test", "substance", 0, 0, ["silica", 1, "iron", 2], ["silica", 0.1]),
	waterML: new unit("test", "test", "substance", 0, 0, ["silica", 1, "iron", 2], []),	
	river: new unit("test", "test", "planetary", 0, 0, ["silica", 1, "iron", 2], []),	
	asteroid: new unit("test", "test", "space", 0, 0, ["hydrogen", 1000000], []),
	asteroidBelt: new unit("test", "test", "space", 0, 0, ["asteroid", 1000, "water", 1000000], []),	
	planet: new unit("test", "test", "space", 0, 0, ["hydrogen", 2, "oxygen", 1], []),	
	nebula: new unit("test", "test", "space", 0, 0, ["hydrogen", 2, "oxygen", 1], []),			
	star: new unit("test", "test", "space", 0, 0, ["hydrogen", 2, "oxygen", 1], []),
	solarSystem: new unit("test", "test", "space", 0, 0, ["star", 1, "planet", 8, "asteroidBelt", 1], []),
	blackhole: new unit("test", "test", "space", 0, 0, ["star", 1], []),
	galaxy: new unit("test", "test", "space", 0, 0, ["supermassiveBlackhole", 2, "solarSystem", 1000000000], []),
	galaxySuperCluster: new unit("test", "test", "space", 0, 0, ["galaxy", 100], []),	
	supermassiveBlackhole: new unit("test", "test", "space", 0, 0, ["blackhole", 1000], []),		
	nucleotide: new unit("test", "test", "life", 0, 0, ["carbon", 5, "hydrogen", 6, "nitrogen", 2, "oxygen", 2], []),
	DNA: new unit("test", "test", "life", 0, 0, ["nucleotide", 6000000000], []),
	cell: new unit("test", "test", "life", 0, 0, ["DNA", 1, "water", 5000000000], []),
	amoeba: new unit("test", "test", "life", 0, 0,["cell", 1], []),
	human: new unit("test", "test", "life", 0, 0, ["hydrogen", 2, "oxygen", 1], []),
};
var achievements = {
	//(condition, state)
    timeOne: new achievement(["stats", "time", 900], false),
    recordBreaker: new achievement(["unit", "human", 1], false)
};
var events = {
	//(condition, state, message)
    newGame: new evt(["stats", "time", 2], false, "You're a god now. But what's a god without a universe?"),
    firstClick: new evt(["stats", "totalClicks", 1], false, "Click the button to extract atoms from the ball."),
    tenClicks: new evt(["stats", "totalClicks", 25], false, "You find that when you put energy into your universe, particles pop into existence out of complete nothingness"),
    tenUnits: new evt(["stats", "totalUnits", 10], false, "It looks like you have a very small universe... but dont worry as your universe grows so does your ability to make what matters: matter."),
    createdWater: new evt(["units", "water", 1], false, "As you create water, you find that you can now produce atoms out of nothing too.")
};
var unlocks = {
	//(condition, state)
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
    waterML: new unlock(["unit", "DNA", 1], false),		
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
function unit(costString, effectString, type, amount, atoms, cost, production){
	this.costString = costString;
	this.effectString = effectString;
	this.type = type;
	this.amount = amount;
	this.atoms = atoms;
	this.cost = cost;
	this.production = production;
}
	//achievement and unlock class are the same. Event is very similar.
function achievement(condition, state) {
    this.condition = condition;
    this.state = state;
}

function evt(condition, state, message) {
    this.condition = condition;
    this.state = state;
	this.message = message;
}

function unlock(condition, state) {
    this.condition = condition;
    this.state = state;
}
//Gameplay Functions
function newUnit(unit) {
	
}

function calcUnitAtoms(unit){
	//determines how many atoms there are in a specific unit.
	var numAtoms = 0;	
	for(i = 0; i < units[unit].cost.length; i += 2){
		if(units[units[unit].cost[i]].atoms !== 0){
			numAtoms += units[units[unit].cost[i]].atoms * units[unit].cost[i + 1];
		}
		else{
			calcUnitAtoms(units[unit].cost[i]);
		}
	}	
	units[unit].atoms = numAtoms;
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

function updateAllValues() {
	stats.totalUnits = 0;
	stats.totalAtoms = 0;
	//updates the current number of every unit
	for(unit in units) {
		document.getElementById(unit + "Amount").innerHTML = units[unit].amount.toFixed(0);
		stats.totalUnits += units[unit].amount;
		stats.totalAtoms += units[unit].amount * units[unit].atoms;
	}
	//updates the amount of a unit you create per click as well as their effect
	for(var unitA in units) {
		var number = 1;
		for(var unitB in units) {
			if(units[unitB].production != null){
				for(i = 0; i < units[unitB].production.length; i++){
					if(units[unitB].production[i] == unitA){
						number += units[unitB].production[i + 1] * units[unitB].amount;
					}
				}
			}
		}
		if(number > determineMax(unitA)) number = determineMax(unitA);
		document.getElementById(unitA + "CreateAmount").innerHTML = number.toFixed(1).replace(".0", "");
		if(typeof units[unitA].effectString == "object"){
			for(i = 1; i <= (units[unitA].effectString.length); i++){
				document.getElementById(unitA + "Effect" + i.toString()).innerHTML = (units[unitA].amount * units[unitA].production[1 + (i-1) * 2]).toFixed(1).replace(".0", ""); 
			}
		}
	}
	//updates various stats
    determineTimePlayed();
    a = stats.totalAtoms / Math.pow(10, 80);
    document.getElementById("totalAtoms").innerHTML = Math.floor(stats.totalAtoms);
    document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
    document.getElementById("totalAchievements").innerHTML = Object.keys(achievements).length;
    document.getElementById("completedAchievements").innerHTML = stats.numAchievements;
}

function newEvent(message) {
    currentEvents.currentEventFour =  currentEvents.currentEventThree;
    currentEvents.currentEventThree =  currentEvents.currentEventTwo;
    currentEvents.currentEventTwo =  currentEvents.currentEventOne;
    currentEvents.currentEventOne = message;
	loadEvents();
}

function create(type) {
	//determines the max amount of a unit that can be created per click and buys it.
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
	//processes the buying of units
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

function save() {
    var save = {
		units: units,
		stats: stats,
		achievements: achievements,
        events: events,
        unlocks: unlocks,
		currentEvents: currentEvents
    };
    localStorage.setItem("save", JSON.stringify(save));
}

function load() {
	if(localStorage.getItem("save") !== null){
		var savegame = JSON.parse(localStorage.getItem("save"));
		if (typeof savegame.units !== "undefined") units = savegame.units;
		if (typeof savegame.stats !== "undefined") stats = savegame.stats;
		if (typeof savegame.achievements !== "undefined") achievements = savegame.achievements;
		if (typeof savegame.unlocks !== "undefined") unlocks = savegame.unlocks;
		if (typeof savegame.events !== "undefined") events = savegame.events;
		if (typeof savegame.currentEvents !== "undefined") currentEvents = savegame.currentEvents;
		loadAchievements();
		loadEvents();
		loadUnlocks();
		updateAllValues();
	}
}

function loadAchievements() {
    for (achievement in achievements) {
        if (achievements[achievement].state === true) document.getElementById(achievements[achievement].divName).style.display = "block";
	}
	if(stats.numAchievements >= 1){
		document.getElementById("noAchievements").style.display = "none";
	}
}

function loadEvents() {
    document.getElementById("eventOne").innerHTML =  currentEvents.currentEventOne;
    document.getElementById("eventTwo").innerHTML =  currentEvents.currentEventTwo;
    document.getElementById("eventThree").innerHTML =  currentEvents.currentEventThree;
    document.getElementById("eventFour").innerHTML =  currentEvents.currentEventFour;	
}

function loadUnlocks() {
	for (unlock in unlocks) {
		if (unlocks[unlock].state === true) document.getElementById(unlock + "Section").style.display = "block";
	}
}

Array.min = function( array ){
	//returns the smallest value in an array of numbers
    return Math.min.apply( Math, array );
};

function determineTimePlayed() {
	var days, hours, minutes, seconds;	
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

function determineMax(unit) {
	//returns the bottleneck for purchasing a new unit
	var ratios = [];
	for(i = 0; i < units[unit].cost.length; i += 2) {
		ratios.push(units[units[unit].cost[i]].amount / units[unit].cost[i+1]);
	}
	return Math.floor(Array.min(ratios));
}

function openTab(evt, name, type) {
    var i, tabcontent, tablinks;
	//closes all other tabs
    tabcontent = document.getElementsByClassName("tabcontent " + type);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
	//sets the color of all tab links back to normal
    tablinks = document.getElementsByClassName("tablinks" + type);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
	//Opens the tab and changes the color of the link
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function newUnit(unit) {
	var unitDiv = document.createElement("div"); 
	unitDiv.id = unit + "Section";				
	var unitP = document.createElement("p"); 
	unitP.className = "unit";
	var btn = document.createElement("button");
	btn.onclick= function(arg) {
		return function() {
			create(arg);
		}
	}(unit);				
	btn.innerHTML = "Create (<span id='" + unit + "CreateAmount'>0</span>)";
	unitP.innerHTML = unit.charAt(0).toUpperCase() + unit.slice(1) + ": <span id='" + unit + "Amount'>0</span> ";	
	unitP.appendChild(btn);	
	unitP.appendChild(document.createElement("br"));	
	var cost = document.createTextNode(units[unit].costString);
	var effectDiv = document.createElement("div");
	var tempeffectString = "Effect: ";
	for(i = 0; i < units[unit].effectString.length; i++) {
		tempeffectString += units[unit].effectString[i];
	}
	effectDiv.innerHTML = tempeffectString;
	unitP.appendChild(cost);		
	unitP.appendChild(effectDiv);		
	unitDiv.appendChild(unitP);
	document.getElementById(units[unit].type).appendChild(unitDiv);
}
/*function findSciExp(number){
	var str = number.toString();
	str = str.substring(str.indexOf("+") + 1);
	number = parseInt(str);
}

function updateExponents(number) {
	
}
*/
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
	for(unit in units) {
		if(units[unit].atoms === 0){
			calcUnitAtoms(unit);
		}
		newUnit(unit);
	} 	
	load();
	//determines the number of atoms a unit has for all units


};