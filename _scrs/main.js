var VIEWPOINTS = 0; 
var VIEWHEATMAP = 1; 

var map; 
var view; 
var curr; 

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
	}); 
	
	$('.maptype #h').click(function() {
		view = VIEWHEATMAP; 
		$('.maptype #h').css('color','#000');
		$('.maptype #p').css('color','#999');
	}); 
}

function activateSearch() {
	$('.options #s').click(function() {
		$('.search').fadeIn();
		$('.search #searchbox').focus();  
	}); 
	
	$('.search #searchbox').keyup(function(e) {
		if($('.search #searchbox').val().length>0) {
			$('.search #searchbutton').val('Map it');
		} else $('.search #searchbutton').val('Back');  
		if(e.which==13) search($('.search #searchbox').val()); 
	});
	$('.search #searchbutton').click(function() {
		search($('.search #searchbox').val()); 
	}); 
}

function search(word) {
	if(curr!='') {
		curr = word;
		showCurrent();
	} 
	$('.search').fadeOut();
	$('.search #searchbox').delay(1000).val('');   
}

function showCurrent() {
	$('.current #word').html('<b>'+curr+'</b>'); 
}

$(document).ready(function() {
	initializeMap(); 
	selectViewType(); 
	activateSearch(); 
}); 