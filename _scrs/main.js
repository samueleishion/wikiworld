var VIEWPOINTS = 0; 
var VIEWHEATMAP = 1; 

var map; 
var view; 
var points = []; 
var markers = []; 
var coords = []; 
var heatmap; 
var lines = "Empty"; 
var curr = ''; 
var guess; 

var temp_rand = ['mountain','wine','beach']; 

function initializeMap() {
	var center = new google.maps.LatLng(32.84,-22.67); 
	var options = {
		zoom: 3, 
		center: center, 
		mapTypeId: google.maps.MapTypeId.ROADMAP, 
		streetViewControl:false, 
		mapTypeControl:false 
	}; 
	
	map = new google.maps.Map(document.getElementById('map'), options); 
	map.set('styles', [
		{
			featureType:'all', 
			elementType:'all', 
			stylers: [
				{ visibility: 'simplified' }, 
				{ hue: '#d5bc96' }, 
				{ gamma: 2 }, 
				{ saturation: 32 }, 
				{ lightness: 20 }
			]
		}, {
			featureType:'water', 
			elementType:'geometry', 
			stylers: [
				{ color: '#9ec2fd' }, 
				{ weight: 1.6 }
			]
		}, {
			featureType:'all', 
			elementType:'labels', 
			stylers: [
				{ visibility: 'off' }
			]
		}, {
			featureType:'landscape.natural', 
			elementType:'all', 
			stylers: [
				{ color:'#e8e3da' }
			] 
		}
	]);
	
	view =  VIEWPOINTS; 
	$('.maptype #p').css('color','#000'); 
	$('.maptype #h').css('color','#999');
}

function selectViewType() {
	$('.maptype #p').click(function() {
		view = VIEWPOINTS; 
		$('.maptype #p').css('color','#000');
		$('.maptype #h').css('color','#999'); 
		if(curr!=null && curr!='' && curr.length>0)
			readFile(curr,view);  
	}); 
	
	$('.maptype #h').click(function() {
		view = VIEWHEATMAP; 
		$('.maptype #h').css('color','#000');
		$('.maptype #p').css('color','#999');
		if(curr!=null && curr!='' && curr.length>0)
			readFile(curr,view); 
	}); 
	
}

function activateSearch() {
	$('.options #s').click(function() {
		$('.search').fadeIn();
		$('.search #searchbox').focus();  
	}); 
	
	$('.search #searchbox').keyup(function(e) {
		var searchbox = $('.search #searchbox').val(); 
		if(searchbox.length>0 || 
			searchbox!='') {
			$('.search #searchbutton').val('Map it');
		} else $('.search #searchbutton').val('Back');  
		if(e.which==13) search(searchbox); 
	});
	$('.search #searchbutton').click(function() {
		search($('.search #searchbox').val()); 
	}); 
}

function search(word) {
	if(word!='' && word.length>0) {
		curr = word;
		showCurrent();
		readFile(word,view); 
	} 
	$('.search').hide();
	$('.search #searchbox').val('');
	$('.search #searchbutton').val('Back');    
}

function showCurrent() {
	load();  
	$('.current #word').html('<b>'+curr+'</b>'); 
}

function load() {
	$('.loading').hide().show(); 
	$('.loading').click(function() {
		$(this).hide(); 
	}); 
}

function activateRandom() {
	$('.options #r').click(function() {
		var rand = (Math.floor(Math.random()*10))%3;
		search(temp_rand[rand]);  
	}); 
}

function activatePlay() {
	$('.options #w').click(function() {
		$('.play').fadeIn();
		$('.play #guessbox').focus();  
		guess = 'mountain'; 
		curr = ' '; 
		for(var i = 0; i < guess.length; i++) {
			curr += '_ '; 
		}
		showCurrent(); 
		$('.loading').hide(); 
	}); 
	
	$('.play #guessbox').keyup(function(e) {
		var guessbox = $('.play #guessbox').val(); 
		if(guessbox.length>0 || 
			guessbox!='') {
			$('.play #guessbutton').val('Guess');
		} else $('.play #guessbutton').val('Stop');  
		if(e.which==13) search(guessbox); 
	});
	$('.play #guessbutton').click(function() {
		$('.play').fadeOut();  
		guess($('.play #guessbox').val());
	});
}

function guess(word) {
	return 0; 
}

function activateInfo() {
	$('.more #i').click(function() {
		$('.info').fadeIn();
	}); 
	 
	$('.info #close').click(function() {
		$('.info').fadeOut(); 
	}); 
}


function readFile(file,view) {
	clearMap(); 
	file = '_raw/enwiki-20130102.'+file.toLowerCase()+'.txt'; 
	viewType = view; 
	var txtFile = new XMLHttpRequest(); 
	txtFile.open("GET",file); 
	txtFile.onreadystatechange = function() {
		if(txtFile.readyState === 4) { // doc is ready to parse
			if(txtFile.status === 200) { // file is found  
				var temp; 
				var allText = txtFile.responseText; 
				lines= txtFile.responseText.split('\n'); 
				if(view==VIEWHEATMAP) {
					// var n = 0; 
					for(var i = 0; i < lines.length; i++) {
						if(lines[i].split("\t")[2]!=null) {
							// check for location intensity
							var intensity= parseInt(lines[i].split("\t")[9]); 
							var point; 
							if(intensity==null ||intensity<=1) intensity = 1;  
							
							temp = lines[i].split("\t")[2].split(',');  
							coords[i] = temp; 
							point = new google.maps.LatLng(temp[0],temp[1]); 
							points[i] =  {location: point, weight: intensity};  
							
							// Hacky apprach: simulating weight by placing
							//  points around actual coordinates
							// -==========================================
							// // check for how many times should a point be allocated
							// var iterations; 
							// if(lines[i].split("\t")[9]==null || 
								// lines[i].split("\t")[9]<=0) iterations = 0;  
							// else iterations = lines[i].split("\t")[9]-1; 
							//  							
							// // allocate actual point
							// temp = lines[i].split("\t")[2].split(','); 
							// coords[n] = temp; 
							// points[n] = new google.maps.LatLng(temp[0],temp[1]);
							// n++; 
							// 							
							// // allocate surrounding points for weight
							// var theta = 360/iterations;
							// var dist = 0.001;  
							// var prov; 
							// var x;
							// var y;  
							// for(var j = 0; j < iterations; j++) {
								// // calculate x coordinate
								// prov = Math.round(1000*temp[0])/1000;  
								// x = prov+(dist*Math.round(1000*Math.cos(j*theta/180*Math.PI))/1000);
								// // calculate y coordinate
								// prov = Math.round(1000*temp[1])/1000;  
								// y = prov+(dist*Math.round(1000*Math.sin(j*theta/180*Math.PI))/1000);
								// // add point  
								// points[n] = new google.maps.LatLng(x,y); 
								// n++; 
							// }
						} 
					}
					heatmap = new google.maps.visualization.HeatmapLayer({
					  data: points, 
					  radius: 10
					});
					heatmap.setMap(map);					
				} else {
					for(var i = 0; i < lines.length; i++) {
						if(lines[i].split("\t")[2]!=null) {
							temp = lines[i].split("\t")[2].split(','); 
							coords[i] = temp; 
							points[i] = new google.maps.LatLng(temp[0],temp[1]); 
							markers[i] = new google.maps.Marker({
								position: points[i], 
								map: map, 
								icon: '_imgs/marker.png'
							});
						} 
					}
				}
			}
		}
	}
	txtFile.send(null);
	$('.loading').hide();  
}

function clearMap() {
	if(heatmap!=null)
		heatmap.setMap(null); 
	for(var i = 0; i < markers.length; i++) {
		markers[i].setMap(null); 
	}
}

$(document).ready(function() {
	initializeMap(); 
	selectViewType(); 
	activateSearch();
	activateRandom(); 
	activatePlay();  
	activateInfo(); 
}); 