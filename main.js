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
var siliconAtoms = 0;
var water = 0;
var planets = 0
var nebulas = 0;
var stars = 0;
var starSystems = 0;
var hydrogenCost = [1, 1, 1, .01, 1] // [electrons, protons, neutrons, EPN production rate, atomic value]
var oxygenCost = [8, 8, 8, .08, 1] // [electrons, protons, neutrons, EPN production rate, atomic value]
var ironCost = [26, 26, 33, .26, .33, 1]// [electrons, protons, neutrons, EP production rate, N production rate, atom cost]
var siliconValues = [14, 14, 14, .14, 1]// [electrons, protons, neutrons, EPN production rate, atomic value]
var waterCost = [2, 1, .02, .01, 3] // [hydrogen, oxygen, hydrogen production rate, oxygen production rate, atomic value]
var planetCost = [10000, 100, 10000]// [iron, iron production rate, atom cost]
var nebulaCost = [1000000, .01, 1000, 1000000] // [hydrogen, star production rate, hydrogen production rate, atom cost]
var starCost = [.001, 10, 1000] // [nebulas, hydrogen production rate, atom cost]
function baseGain(number){
    electrons = electrons + number;
	protons = protons + number;
	neutrons = neutrons + number;
	updateAllValues();
}
function updateAllValues(){
	totalAtoms = Math.floor(hydrogenAtoms) * hydrogenCost[4] + Math.floor(oxygenAtoms) * oxygenCost[4] + Math.floor(ironAtoms) * ironCost[5] + Math.floor(water) * waterCost[4] + Math.floor(planets) * planetCost[2] + Math.floor(nebulas) * nebulaCost[3] + Math.floor(stars) * starCost[2];
	a = totalAtoms/atomsInUniverse; 
	document.getElementById("totalAtoms").innerHTML = Math.floor(totalAtoms)
	document.getElementById("percentOfUniverse").innerHTML = a.toFixed(20);
	document.getElementById("electrons").innerHTML = Math.floor(electrons);
	document.getElementById("protons").innerHTML = Math.floor(protons);
	document.getElementById("neutrons").innerHTML = Math.floor(neutrons);
	document.getElementById("hydrogenAtoms").innerHTML = Math.floor(hydrogenAtoms).toFixed(0);
	document.getElementById("oxygenAtoms").innerHTML = Math.floor(oxygenAtoms).toFixed(0);
	document.getElementById("siliconAtoms").innerHTML = Math.floor(siliconAtoms).toFixed(0);	
	document.getElementById("ironAtoms").innerHTML = Math.floor(ironAtoms).toFixed(0);
	document.getElementById("water").innerHTML = Math.floor(water).toFixed(0);
	document.getElementById("planets").innerHTML = Math.floor(planets).toFixed(0);
	document.getElementById("nebulas").innerHTML = Math.floor(nebulas).toFixed(0);
	document.getElementById("stars").innerHTML = Math.floor(stars).toFixed(0);
}
function updateBaseValues(){
	document.getElementById("electrons").innerHTML = Math.floor(electrons);
    document.getElementById("protons").innerHTML = Math.floor(protons);
    document.getElementById("neutrons").innerHTML = Math.floor(neutrons);
}
function buyMax(unitType){
	switch(unitType){
		case "hydrogen":
			var max = 0;
			if(electrons <= neutrons && electrons <= protons){
				max = electrons;
			}
			else if(neutrons <= electrons && neutrons <= protons){
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
			else if(neutrons <= electrons && neutrons <= protons){
				max = neutrons;
			}
			else{
				max = protons;
			}
			buyOxygen(Math.floor(max/8));
			break;
		case "silicon":
			var max = 0;
			if(electrons <= neutrons && electrons <= protons){
				max = electrons;
			}
			else if(neutrons <= electrons && neutrons <= protons){
				max = neutrons;
			}
			else{
				max = protons;
			}
			buySilicon(Math.floor(max/14));
			break;			
		case "iron":
			var max = 0;
			if(electrons / ironCost[0] <= neutrons / ironCost[2] && electrons / ironCost[0] <= protons / ironCost[1]){
				max = electrons;
			}
			else if(neutrons / ironCost[2] <= electrons / ironCost[0] && neutrons / ironCost[2] <= protons/ ironCost[1]){
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
			var	max = ironAtoms;
			divisor = planetCost[0];
			buyPlanet(Math.floor(max/divisor));
			break;			
		case "nebula":
			var	max = hydrogenAtoms;
			divisor = nebulaCost[0];
			buyNebula(Math.floor(max/divisor));
			break;			
		case "star":
			var	max = nebulas;
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
	electrons = electrons + hydrogenCost[3] * number;
	protons = protons + hydrogenCost[3] * number;
	neutrons = neutrons + hydrogenCost[3] * number;
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
	electrons = electrons + oxygenCost[3] * number;
	protons = protons + oxygenCost[3] * number;
	neutrons = neutrons + oxygenCost[3] * number;
}
function buySilicon(number){
	if(electrons >= number * siliconValues[0] && protons >= number * siliconValues[1] && neutrons >= number * siliconValues[2]){                                  
        siliconAtoms = siliconAtoms + number;                                  
    	electrons = electrons - siliconValues[0] * number;     
    	protons = protons - siliconValues[1] * number; 
    	neutrons = neutrons - siliconValues[2] * number; 
		updateAllValues();
    } 	
}
function siliconGain(number){
	electrons = electrons + siliconValues[3] * number;
	protons = protons + siliconValues[3] * number;
	neutrons = neutrons + siliconValues[3] * number;	
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
	electrons = electrons + ironCost[3] * number;
	protons = protons + ironCost[3] * number;
	neutrons = neutrons + ironCost[3] * number;	
}
function buyRock(number){
	
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
	hydrogenAtoms = hydrogenAtoms + waterCost[2] * water;
	oxygenAtoms = oxygenAtoms + waterCost[3] * water;
}
function buyAsteroid(number){
	
}
function buyAsteroidBelt(number){
	
}
function buyPlanet(number){
	if(ironAtoms >= number * planetCost[0]){
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
	siliconGain(siliconAtoms);
	ironGain(ironAtoms);
	waterGain(water);
	planetGain(planets);
	starGain(stars);
	nebulaGain(nebulas);
	starSystemGain(starSystems);
	baseGain(1);
	time = time + 1;
}, 100);
