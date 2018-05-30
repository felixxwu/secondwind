
<factory_menu id="factory_menu" style="display:none">
  <div id="factory_header"> 
    <h2>header</h2>
    <factory_logo src="<? hashify('images/extractor_3_animation.svg'); ?>"></factory_logo>
  </div>
  <div id="factory_items"> 
    <div id="item_header"> 
      <p>items</p>
    </div><br/>
    <table id="itemList">
      <tr>
        <th>Item</th>
        <th>Level</th>
        <th>Amount</th>
        <th>Human</th>
        <th>Attack</th>
        <th>Power</th>
        <th>Intelligence</th>
        <th>Building</th>
        <th>Actions</th>
      </tr>
    </table>
  </div>
  <div id="factory_actions"> 
    <h2>actions</h2>
    <button id="combine" onclick="newCombineItems()">Combine items</button>
    <div id="testItems"></div>
    <div id="errorItems"></div>
    <button id="hideMenu" onclick="hide('factory_menu','fadeOutDown', 1);show('analytics','fadeInRight', 2);show('notifications','fadeInLeft', 2)">Close Menu</button>
  </div>
  <div id="energy_cores">cores</div>
  <div id="factory_progress"> 
    <button id="updateCombinations" onclick="retrieveCombinationTimes()">update Combinations</button>
    <div id="progress_bars"></div>
  </div>
</factory_menu>