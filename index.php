<?
?>
<!DOCTYPE html>
<html><head>
 <title>WIKIWORLD</title>
 <link rel="stylesheet" type="text/css" href="_stys/global.css">
 <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization&sensor=false"></script>
 <script src="_scrs/jquery.min.js"></script>
 <script src="_scrs/main.js"></script>
</head><body>

<!-- Navigation Bar -->
<nav>
 <div class="logo"></div>
 <span id="title">WIKIWORLD</span> 
 <div class="maptype">
  <span id="p" alt="View data as points">o</span>
  <span id="h" alt="View data as heatmap">f</span>
 </div> 
 <div class="options">
  <span id="s" alt="Search for a word">s</span>
  <span id="r" alt="Random word">/</span>
  <span id="w" alt="Play a game">w</span>
 </div>
 <div class="more">
  <span id="i" alt="Information">i</span>
 </div>
</nav>
<!-- Current word display -->
<div class="current">
 Current word: <span id="word"> </span>
</div>
<!-- Word search -->
<div class="search">
 <input type="text" id="searchbox" placeholder="Type in a word from wikipedia!">
 <input type="button" id="searchbutton" value="Back">
</div>
<!-- Play -->
<div class="play">
 <input type="text" id="guessbox" placeholder="Guess a word">
 <input type="button" id="guessbutton" value="Stop">
</div>
<!-- Information -->
<div class="info">
 <p><span id="title">WIKIWORLD</span> is a research project by Samuel Acu&ntilde;a 
 for a computational linguistics project supervised by Dr. Baldridge at the University 
 of Texas at Austin. <span id="title">WIKIWORLD</span> catalogs every time a given 
 word appears in different wikipedia articles and plots points on a map based on 
 the article&rsquo;s geolocation. </p>
 <p>For a better explanation and to view, use, and/or share the code go to 
  <a href="http://github.com/samueleishion/wikiworld" target="_new">http://github.com/samueleishion/wikiworld</a></p>
 <p><a href="#" id="close">close</a></p>	
</div>
<!-- Loading -->
<div class="loading"> </div>
<!-- GoogleMap -->
<div id="map"> </div>

</body></html>