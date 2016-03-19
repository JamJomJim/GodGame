var time = 0;
var totalAtoms = 0;
var percentOfUniverse = 0;
var atomsInUniverse = Math.pow(10, 80);
var electrons = 0;
var protons = 0;
var neutrons = 0;
var hydrogenAtoms = 0;
var oxygenAtoms = 0;
var ironAtoms = 0;
var water = 0;
var planets = 0
var nebulas = 0;
var stars = 0;
var starSystems = 0;
var hydrogenCost = [1, 1, 1, .1] // [electrons, protons, neutrons, production rate]
var oxygenCost = [8, 8, 8, .1] // [electrons, protons, neutrons, production rate]
var ironCost = [26, 26, 33, .1]// [electrons, protons, neutrons, production rate]
var waterCost = [2, 1, .1] // [hydrogen, oxygen, production rate]
var planetCost = [10000, .1]// [iron, production rate]
var nebulaCost = [1000000, .1, 1000] // [hydrogen, star production, hydrogen production]
var starCost = [.001, .1] // [nebulas, production rate]
function baseGain(number){
    electrons = electrons + number;
	protons = protons + number;
	neutrons = neutrons + number;
	updateAllValues();
}
function updateAllValues(){
	electronsDisplay = Math.floor(electrons);
	protonsDisplay = Math.floor(protons);
	neutronsDisplay = Math.floor(neutrons);
	totalAtoms = hydrogenAtoms + oxygenAtoms;
	a = totalAtoms/atomsInUniverse; 
	document.getElementById("totalAtoms").innerHTML = parseInt(hydrogenAtoms.toFixed(0)) + parseInt(oxygenAtoms.toFixed(0)) + parseInt(ironAtoms.toFixed(0));
	document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
	document.getElementById("electrons").innerHTML = electronsDisplay;
    document.getElementById("protons").innerHTML = protonsDisplay;
    document.getElementById("neutrons").innerHTML = neutronsDisplay;
	document.getElementById("hydrogenAtoms").innerHTML = hydrogenAtoms.toFixed(0);
	document.getElementById("oxygenAtoms").innerHTML = oxygenAtoms.toFixed(0);
	document.getElementById("ironAtoms").innerHTML = ironAtoms.toFixed(0);
	document.getElementById("water").innerHTML = water.toFixed(0);
	document.getElementById("planets").innerHTML = planets.toFixed(0);
	document.getElementById("nebulas").innerHTML = nebulas.toFixed(0);
	document.getElementById("stars").innerHTML = stars.toFixed(0);

}
function updateBaseValues(){
	electronsDisplay = Math.floor(electrons);
	protonsDisplay = Math.floor(protons);
	neutronsDisplay = Math.floor(neutrons);
	document.getElementById("electrons").innerHTML = electronsDisplay;
    document.getElementById("protons").innerHTML = protonsDisplay;
    document.getElementById("neutrons").innerHTML = neutronsDisplay;
}
function buyMax(unitType){
	switch(unitType){
		case "hydrogen":
			var max = 0;
			if(electrons <= neutrons && electrons <= protons){
				max = electrons;
			}
			if(neutrons <= electrons && neutrons <= protons){
				max = neutrons;
			}
			else{
				max = protons;
			}
			buyHydrogen(max);
			break;
		case "oxygen":
			var max = 0;
			if(electrons <= neutrons && electrons <= protons){
				max = electrons;
			}
			if(neutrons <= electrons && neutrons <= protons){
				max = neutrons;
			}
			else{
				max = protons;
			}
			buyOxygen(Math.floor(max/8));
			break;
		case "iron":
			var max = 0;
			if(electrons / ironCost[0] <= neutrons / ironCost[2] && electrons / ironCost[0] <= protons / ironCost[1]){
				max = electrons;
			}
			if(neutrons / ironCost[2] <= electrons / ironCost[0] && neutrons / ironCost[2] <= protons/ ironCost[1]){
				max = neutrons;
			}
			else{
				max = protons;
			}
			buyIron(Math.floor(max/ironCost[2]));
			break;		
		case "water":
			var max = 0;
			if(hydrogenAtoms / 2 <= oxygenAtoms){
				max = hydrogenAtoms;
				divisor = waterCost[0]
			}
			else{
				max = oxygenAtoms;
				divisor = waterCost[1];
			}
			buyWater(Math.floor(max/divisor));
			break;			
		case "planet":
			var	max = iron;
			divisor = planetCost[0];
			buyPlanet(Math.floor(max/divisor));
			break;			
		case "nebula":
			var	max = hydrogenAtoms;
			divisor = nebulaCostCost[0];
			buyNebula(Math.floor(max/divisor));
			break;			
		case "star":
			var	max = nebula;
			divisor = starCost[0];
			buyStar(Math.floor(max/divisor));
			break;			
		default:
			break;
	}
}
function buyHydrogen(number){   
    if(electrons >= number * hydrogenCost[0] && protons >= number * hydrogenCost[1] && neutrons >= number * hydrogenCost[2]){                                  
        hydrogenAtoms = hydrogenAtoms + number;                                  
    	electrons = electrons - number;     
    	protons = protons - number; 
    	neutrons = neutrons - number;
		updateAllValues();
    }
}
function hydrogenGain(number){
	electrons = electrons + hydrogenCost[0] * hydrogenCost[3] * number;
	protons = protons + hydrogenCost[1] * hydrogenCost[3] * number;
	neutrons = neutrons + hydrogenCost[2] * hydrogenCost[3] * number;
}
function buyOxygen(number){
	if(electrons >= number * oxygenCost[0] && protons >= number * oxygenCost[1] && neutrons >= number * oxygenCost[2]){                                  
        oxygenAtoms = oxygenAtoms + number;                                  
    	electrons = electrons - oxygenCost[0] * number;     
    	protons = protons - oxygenCost[1] * number; 
    	neutrons = neutrons - oxygenCost[2] * number; 
		updateAllValues();
    }  
}
function oxygenGain(number){
	electrons = electrons + oxygenCost[0] * oxygenCost[3] * number;
	protons = protons + oxygenCost[1] * oxygenCost[3] * number;
	neutrons = neutrons + oxygenCost[2] * oxygenCost[3] * number;
}
function buyIron(number){
	if(electrons >= number * ironCost[0] && protons >= number * ironCost[1] && neutrons >= number * ironCost[2]){                                  
        ironAtoms = ironAtoms + number;                                  
    	electrons = electrons - ironCost[0] * number;     
    	protons = protons - ironCost[1] * number; 
    	neutrons = neutrons - ironCost[2] * number; 
		updateAllValues();
    } 	
}
function ironGain(number){
	electrons = electrons + ironCost[0] * ironCost[3] * number;
	protons = protons + ironCost[1] * ironCost[3] * number;
	neutrons = neutrons + ironCost[2] * ironCost[3] * number;	
}
function buyWater(number){
	if(hydrogenAtoms >= waterCost[0] * number && oxygenAtoms >= waterCost[1] * number ){                                  
        water = water + number;                                  
    	hydrogenAtoms = hydrogenAtoms - waterCost[0] * number;     
    	oxygenAtoms = oxygenAtoms - waterCost[1] * number;  
		updateAllValues();
	}
}
function waterGain(number){
	hydrogenAtoms = hydrogenAtoms + waterCost[0] * waterCost[2] * water;
	oxygenAtoms = oxygenAtoms + waterCost[1] * waterCost[2] * water;
}
function buyPlanet(number){
	if(ironAtoms >= planetCost[0]){
		planets = planets + number;
		ironAtoms = ironAtoms - number * planetCost[0];
		updateAllValues();
	}
}
function planetGain(number){
	water = water + planetCost[1] * number;
}
function buyNebula(number){
	if(hydrogenAtoms >= number * nebulaCost[0] ){
		nebulas = nebulas + number;
		hydrogenAtoms = hydrogenAtoms - number * nebulaCost[0];
		updateAllValues();
	}
}
function nebulaGain(number){
	hydrogenAtoms = hydrogenAtoms + nebulaCost[2] * number;
		stars = stars + nebulaCost[1] * number;
}
function buyStar(number){
	if(nebulas >= number * starCost[0]){
		stars = stars + number;
		nebulas = nebulas - number * starCost[0];
		updateAllValues();
	}
}
function starGain(number){
	ironAtoms = ironAtoms + starCost[1] * number ;
}
function buyStarSystem(number){
	if(stars >= number && planets >= 8 * number){
		starSystems = starSystems + number;
		stars = stars - number;
		planets = planets - number * 8;
		updateAllValues();
	}
}
function starSystemGain(number){
	
}
window.setInterval(function(){	
	hydrogenGain(hydrogenAtoms);
	oxygenGain(oxygenAtoms);
	ironGain(ironAtoms);
	waterGain(water);
	planetGain(planets);
	starGain(stars);
	nebulaGain(nebulas);
	starSystemGain(starSystems);
	baseGain(1);
	time = time + 1;
}, 1000);