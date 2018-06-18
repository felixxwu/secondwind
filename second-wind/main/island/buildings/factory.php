
<factory_menu id="factory_menu" style="display:none">
  <div id="factory_header"> 
    <text>FACTORY</text>
  </div>
  <div id="factory_items"> 
    <div id="item_header"> 
      <text>Items</text>
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
    <button id="testImg" onclick="startAnimation()"></button>
    <action_title>actions</action_title>
    <button id="combine" onclick="newCombineItems()">Combine items</button>
    <div id="testItems"></div>
    <div id="errorItems"></div>
    <button id="hideMenu" onclick="hideFactoryMenu()">Close Menu</button>
  </div>
  <div id="factory_descriptions">
    <div id="combinationText">Combining Items</div>
    <bar id="ratiosBar1"></bar>
    <div id="resultText">Result Item</div>
    <resultBar id="resultBar1"></resultBar>
  </div>
  <div id="factory_progress"> 
    <div id="progress_bars"></div>
  </div>
</factory_menu>