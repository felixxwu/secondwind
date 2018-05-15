
<h3>Energy Values</h3>
<div id="energytest">
  <table>
    <tr>
      <td id="humanEnergy"></td>
      <td id="attackEnergy"></td>
      <td id="powerEnergy"></td>
      <td id="intelligenceEnergy"></td>
      <td id="buildingEnergy"></td>
    </tr>
  </table>
</div>
<h3>Energy Allocation</h3>
<p class="energyTitle">Human</p>
<div class="slidecontainer">
  <input class="slider" id="human" type="range" min="-20" max="20" value="0"/>
</div>
<div class="demo" id="valueHuman"> </div>
<p></p>
<p class="energyTitle">Attack</p>
<div class="slidecontainer">
  <input class="slider" id="attack" type="range" min="-20" max="20" value="0"/>
</div>
<div class="demo" id="valueAttack"> </div>
<p></p>
<p class="energyTitle">Power</p>
<div class="slidecontainer">
  <input class="slider" id="power" type="range" min="-20" max="20" value="0"/>
</div>
<div class="demo" id="valuePower"> </div>
<p></p>
<p class="energyTitle">Intelligence </p>
<div class="slidecontainer">
  <input class="slider" id="intelligence" type="range" min="-20" max="20" value="0"/>
</div>
<div class="demo" id="valueIntelligence"></div>
<p></p>
<p class="energyTitle">Building</p>
<div class="slidecontainer">
  <input class="slider" id="building" type="range" min="-20" max="20" value="0"/>
</div>
<div class="demo" id="valueBuilding"></div>
<button id="submit" onclick="submitEnergyAllocation()" style="display: none;">DONE</button>
<div id="confirmMessage"></div>