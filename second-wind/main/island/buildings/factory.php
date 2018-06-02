
<factory_menu id="factory_menu" style="display:none">
  <div id="factory_header"> 
    <text>Factory</text>
  </div>
  <div id="factory_items"> 
    <div id="item_header"> 
      <text>items</text>
    </div><br/>
    <table id="itemList">
      <tr>
        <th>Item</th>
        <th>Level</th>
        <th>Amount</th>
        <th>H</th>
        <th>A</th>
        <th>P</th>
        <th>I</th>
        <th>B</th>
      </tr>
    </table>
  </div>
  <div id="factory_actions"> 
    <action_title>actions</action_title>
    <button id="combine" onclick="newCombineItems()">Combine items</button>
    <div id="testItems"></div>
    <div id="errorItems"></div>
    <button id="hideMenu" onclick="hide('factory_menu','fadeOutDown', 1);show('analytics','fadeInRight', 2);show('notifications','fadeInLeft', 2)">Close Menu</button>
  </div>
  <div id="factory_descriptions">
    <canvas id="doughnut-chart"></canvas>
  </div>
  <div id="factory_progress"> 
    <div id="progress_bars"></div>
  </div>
</factory_menu>