
<link rel="stylesheet" href="<? hashify('main/minigame/minigame.css'); ?>"/>
<overlay id="chooseUnitOverlay" style="display:none">
  <div id="chooseUnitMenu">
    <h3>CHOOSE A UNIT</h3><br/>
    <div id="unitList"></div><a class="button iconButton" onclick="hide('chooseUnitOverlay','fadeOut',1)">close<img class="invert" src="material-icons/close.svg"/></a>
  </div>
</overlay>
<div id="minigame" style="display:none">
  <header>
    <div id="minigameHeader"></div>
    <div id="minigameTurn"></div>
  </header>
  <div id="board"></div>
  <footer id="footerBackgroundWorkaround"></footer>
  <footer>
    <div id="minigameTurnCounter"></div><a class="button" onclick="endTurn()">end turn</a><a class="button iconButton" onclick="closeMinigame()">close<img class="invert" src="material-icons/close.svg"/></a>
  </footer>
</div>
<script>initBoardButtons(4, 7);</script>