
<link rel="stylesheet" href="<? hashify('main/minigame/minigame.css'); ?>"/>
<div id="minigame" style="display:none">
  <header>
    <div id="minigameHeader"></div>
  </header>
  <div id="board"></div>
  <footer id="footerBackgroundWorkaround"></footer>
  <footer><a class="button" onclick="endTurn()">end turn</a><a class="button iconButton" onclick="closeMinigame()">close<img class="invert" src="material-icons/close.svg"/></a></footer>
</div>
<script>initBoardButtons(4, 7);</script>