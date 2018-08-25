
<link rel="stylesheet" href="<?= hashify('main/island/island.css'); ?>"/>
<div id="island"><img id="islandrock" src="<?= hashify('images/rock.svg'); ?>"/>
  <div class="townhall"><img src="<?= hashify('images/townHall.svg'); ?>"/><a onclick="show('energies','fadeInUp', 1)" onmouseover="displayBuildingInfo('townhallHover')" onmouseout="hideBuildingInfo('townhallHover')">
      <hover id="townhallHover">Click to display townhall menu</hover></a></div>
  <div class="factory"><img src="<?= hashify('images/factory.svg'); ?>"/><a onclick="showFactoryMenu()" onmouseover="displayBuildingInfo('factorylHover')" onmouseout="hideBuildingInfo('factorylHover')">
      <hover id="factorylHover">Click to display factory menu</hover></a></div>
  <div class="extractor"> <img src="<?= hashify('images/extractor_3_animation.svg'); ?>"/><a onclick="show('extractor_menu','fadeInUp', 2);hide('analytics','fadeOutRight', 2);hide('notifications','fadeOutLeft', 2);" onmouseover="displayBuildingInfo('extractorHover')" onmouseout="hideBuildingInfo('extractorHover')">
      <hover id="extractorHover">Click to display extractor menu</hover></a></div>
</div>