<!DOCTYPE html>
<html>
  <head>
    <title>Second Wind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="css/style.css?h=<?= hash_file('crc32', 'css/style.css'); ?>"/>
    <link rel="stylesheet" href="css/animate.css"/>
    <link rel="stylesheet" href="css/mainStyle.css?h=<?= hash_file('crc32', 'css/mainStyle.css'); ?>"/>
    <link rel="stylesheet" href="css/buttons.css?h=<?= hash_file('crc32', 'css/buttons.css'); ?>"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="libraries/ajax/newAjaxHelper.js?h=<?= hash_file('crc32', 'libraries/ajax/newAjaxHelper.js'); ?>"></script>
    <script src="libraries/account/functions.js?h=<?= hash_file('crc32', 'libraries/account/functions.js'); ?>"></script>
    <script src="libraries/account/secureLoad.js?h=<?= hash_file('crc32', 'libraries/account/secureLoad.js'); ?>"></script>
    <script src="libraries/utility/general.js?h=<?= hash_file('crc32', 'libraries/utility/general.js'); ?>"></script>
    <script src="libraries/utility/animation.js?h=<?= hash_file('crc32', 'libraries/utility/animation.js'); ?>"></script>
    <script src="libraries/utility/hashNavigation.js?h=<?= hash_file('crc32', 'libraries/utility/hashNavigation.js'); ?>"></script>
    <script src="libraries/energy/energy.js?h=<?= hash_file('crc32', 'libraries/energy/energy.js'); ?>"></script>
    <script src="libraries/items/items.js?h=<?= hash_file('crc32', 'libraries/items/items.js'); ?>"></script>
    <script src="libraries/slider/sliderdemo.js?h=<?= hash_file('crc32', 'libraries/slider/sliderdemo.js'); ?>"></script>
    <script src="main/menu/menu.js?h=<?= hash_file('crc32', 'main/menu/menu.js'); ?>"></script>
    <script src="main/notifications/notifications.js?h=<?= hash_file('crc32', 'main/notifications/notifications.js'); ?>"></script>
    <script src="main/map/map.js?h=<?= hash_file('crc32', 'main/map/map.js'); ?>"></script>
    <script src="init.js?h=<?= hash_file('crc32', 'init.js'); ?>"></script>
  </head>
  <body>
    <div id="noOverflow">
      <div id="ghost"> </div>
      <div id="ghosty"></div>
      <div id="loading">
        <text>loading...</text>
      </div><a class="absolute" href="login" style="z-index: -1;">if nothing happens, click here</a>
      <div id="main"></div>
    </div>
  </body>
</html>