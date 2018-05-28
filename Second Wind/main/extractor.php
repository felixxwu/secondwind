
<div id="extractor_menu" style="display:none">
  <div id="factory_header">header</div>
  <div id="factory_items">
     items<br/>
    <itemList id="itemList"></itemList>
  </div>
  <div id="factory_actions">actions
    <button id="combine" onclick="combineItems()">Combine items</button>
    <div id="testItems"></div>
    <div id="errorItems"></div>
    <button id="hideMenu" onclick="hide('extractor_menu','fadeOutDown', 1)">Close Menu</button>
  </div>
  <div id="energy_cores">cores</div>
  <div id="factory_progress"> 
    <button id="updateCombinations" onclick="retrieveCombinationTimes()">update Combinations</button>
    <div id="progress_bars"></div>
  </div>
</div>