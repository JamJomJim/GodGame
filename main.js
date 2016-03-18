var totalAtoms = 0;
var percentOfUniverse = 0;
var atomsInUniverse = Math.pow(10, 80);
var electrons = 0;
var protons = 0;
var neutrons = 0;
var hydrogenAtoms = 0;
var oxygenAtoms = 0;
var water = 0;

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
	document.getElementById("totalAtoms").innerHTML = parseInt(hydrogenAtoms.toFixed(0)) + parseInt(oxygenAtoms.toFixed(0));
	document.getElementById("percentOfUniverse").innerHTML = a.toFixed();
	document.getElementById("electrons").innerHTML = electronsDisplay;
    document.getElementById("protons").innerHTML = protonsDisplay;
    document.getElementById("neutrons").innerHTML = neutronsDisplay;
	document.getElementById("hydrogenAtoms").innerHTML = hydrogenAtoms.toFixed(0);
	document.getElementById("oxygenAtoms").innerHTML = oxygenAtoms.toFixed(0);
	document.getElementById("water").innerHTML = water;

}
function updateBaseValues(){
	electronsDisplay = Math.floor(electrons);
	protonsDisplay = Math.floor(protons);
	neutronsDisplay = Math.floor(neutrons);
	document.getElementById("electrons").innerHTML = electronsDisplay;
    document.getElementById("protons").innerHTML = protonsDisplay;
    document.getElementById("neutrons").innerHTML = neutronsDisplay;
}
function buyHydrogen(number){   
    if(electrons >= number && protons >= number && neutrons >= number){                                  
        hydrogenAtoms = hydrogenAtoms + number;                                  
    	electrons = electrons - number;     
    	protons = protons - number; 
    	neutrons = neutrons - number;
		updateAllValues();
    }
}
function hydrogenGain(number){
	electrons = electrons + .1*number;
	protons = protons + .1*number;
	neutrons = neutrons + .1*number;
}
function buyOxygen(number){
	if(electrons >= number * 8 && protons >= number * 8&& neutrons >= number * 8){                                  
        oxygenAtoms = oxygenAtoms + number;                                  
    	electrons = electrons - 8 * number;     
    	protons = protons - 8 * number; 
    	neutrons = neutrons - 8 * number; 
		totalAtoms = totalAtoms + number;
		updateAllValues();
    }  
}
function oxygenGain(number){
	electrons = electrons + .8*number;
	protons = protons + .8*number;
	neutrons = neutrons + .8*number;
}
function buyWater(number){
	if(hydrogenAtoms >= 2 * number && oxygenAtoms >= number ){                                  
        water = water + number;                                  
    	hydrogenAtoms = hydrogenAtoms - 2 * number;     
    	oxygenAtoms = oxygenAtoms - number;  
		updateAllValues();
	}
}
function waterGain(number){
	hydrogenAtoms = hydrogenAtoms + .2 * water;
	oxygenAtoms = oxygenAtoms + .1 * water;
}
window.setInterval(function(){	
	hydrogenGain(hydrogenAtoms);
	oxygenGain(oxygenAtoms);
	waterGain(water);
	baseGain(1);
}, 1000);