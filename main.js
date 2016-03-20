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
var rocks = 0;
var sand = 0;
var planets = 0
var nebulas = 0;
var stars = 0;
var starSystems = 0;
var hydrogenCost = [1, 1, 1, .01, 1] // [electrons, protons, neutrons, EPN production rate, atomic value]
var oxygenCost = [8, 8, 8, .08, 1] // [electrons, protons, neutrons, EPN production rate, atomic value]
var ironCost = [26, 26, 33, .26, .33, 1]// [electrons, protons, neutrons, EP production rate, N production rate, atom cost]
var siliconValues = [14, 14, 14, .14, 1]// [electrons, protons, neutrons, EPN production rate, atomic value]
var waterCost = [2, 1, .02, .01, 3] // [hydrogen, oxygen, hydrogen production rate, oxygen production rate, atomic value]
var rockValues = [2, 1, 2, .005, .01, .001, 5]// [iron, silicon, oxygen, sand production, iron production, rock decay rate, atomic value]
var sandValues = [1, 2, .01, .02, 3]// [silicon, oxygen, silicon production rate, oxygen production rate, atomic value]
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
	document.getElementById("hydrogenAtoms").innerHTML = hydrogenAtoms.toFixed(3);
	document.getElementById("oxygenAtoms").innerHTML = oxygenAtoms.toFixed(3);
	document.getElementById("siliconAtoms").innerHTML = siliconAtoms.toFixed(3);	
	document.getElementById("ironAtoms").innerHTML = ironAtoms.toFixed(3);
	document.getElementById("water").innerHTML = water.toFixed(3);
	document.getElementById("rocks").innerHTML = rocks.toFixed(3);
	document.getElementById("sand").innerHTML = sand.toFixed(3);	
	document.getElementById("planets").innerHTML = planets.toFixed(3);
	document.getElementById("nebulas").innerHTML = nebulas.toFixed(3);
	document.getElementById("stars").innerHTML = stars.toFixed(3);
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
			var divisor = 0;
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
				divisor = 26;
			}
			else if(neutrons / ironCost[2] <= electrons / ironCost[0] && neutrons / ironCost[2] <= protons/ ironCost[1]){
				max = neutrons;
				divisor = 33;
			}
			else{
				max = protons;
				divisor = 26;
			}
			buyIron(Math.floor(max/divisor));
			break;		
		case "water":
			var max = 0;
			if(hydrogenAtoms / 2 <= oxygenAtoms){
				max = hydrogenAtoms;
				divisor = 2;
			}
			else{
				max = oxygenAtoms;
				divisor = 1;
			}
			buyWater(Math.floor(max/divisor));
			break;	
		case "rock":
			var max = 0;
			if(ironAtoms / 2 <= siliconAtoms && ironAtoms <= oxygenAtoms){
				max = ironAtoms;
				divisor = 2;
			}
			else if(siliconAtoms <= ironAtoms / 2 && siliconAtoms <= oxygenAtoms / 2){
				max = siliconAtoms;
				divisor = 1;
			}
			else{
				max = oxygenAtoms;
				divisor = 2;
			}
			buyRock(Math.floor(max/divisor));
			break;	
		case "sand":
			var max = 0;
			if(siliconAtoms <= oxygenAtoms / 2){
				max = siliconAtoms;
				divisor = 1;
			}
			else{
				max = oxygenAtoms;
				divisor = 2;
			}
			buySand(Math.floor(max/divisor));
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
function buyWater(number){
	if(hydrogenAtoms >= waterCost[0] * number && oxygenAtoms >= waterCost[1] * number){                                  
        water = water + number;                                  
    	hydrogenAtoms = hydrogenAtoms - waterCost[0] * number;     
    	oxygenAtoms = oxygenAtoms - waterCost[1] * number;  
		updateAllValues();
	}
}
function waterGain(number){
	hydrogenAtoms = hydrogenAtoms + waterCost[2] * number;
	oxygenAtoms = oxygenAtoms + waterCost[3] * number;
}
function buyRock(number){
	if(ironAtoms >= rockValues[0] * number && siliconAtoms >= rockValues[1] * number && oxygenAtoms >= rockValues[2] * number){
		rocks = rocks + number;
		ironAtoms = ironAtoms - rockValues[0] * number;
		siliconAtoms = siliconAtoms - rockValues[1] * number;
		oxygenAtoms = oxygenAtoms - rockValues[2] * number;
		updateAllValues();
	}
}
function rockGain(number){
	sand = sand + rockValues[3] * number;
	ironAtoms = ironAtoms + rockValues[4] * number;
	rocks = rocks - rockValues[5] * number;
}
function buySand(number){
	if(siliconAtoms >= sandValues[0] * number && oxygenAtoms >= sandValues[1] * number){                                  
        sand = sand + number;                                  
    	siliconAtoms = siliconAtoms - sandValues[0] * number;     
    	oxygenAtoms = oxygenAtoms - sandValues[1] * number;  
		updateAllValues();
	}	
}
function sandGain(number){
	siliconAtoms = siliconAtoms + sandValues[2] * number;
	oxygenAtoms = oxygenAtoms + sandValues[3] * number;	
}
function buyAsteroid(number){
	
}
function asteroidGain(number){
	
}
function buyAsteroidBelt(number){
	
}
function asteroidBeltGain(number){
	
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
	rockGain(rocks);
	sandGain(sand);
	planetGain(planets);
	starGain(stars);
	nebulaGain(nebulas);
	starSystemGain(starSystems);
	baseGain(1);
	time = time + 1;
}, 1000);
