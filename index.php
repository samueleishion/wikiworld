<?
?>
<!DOCTYPE html>
<html><head>
 <title></title>
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
 <input type="submit" id="searchbutton" value="Back">
</div>
<!-- GoogleMap -->
<div id="map"> </div>

</body></html>