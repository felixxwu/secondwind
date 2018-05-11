
<html>
  <head>
    <title>Second Wind</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="libraries/ajax/AjaxHelper.js"></script>
  </head>
  <body>hello<br/><a onclick="getFive()">click me</a><br/>
    <div id="output"></div>
    <div id="ghost"></div>
    <script>
      function getFive() {
          var ajax = new AjaxHelper;
          ajax.loadVariables("output", {"variableExample": null, "variableWithArgExample": "heyo", "variableMultipleArgsExample": ["foo", "bar"]}, function() {
              console.log(variableExample);
              console.log(variableWithArgExample);
              console.log(variableMultipleArgsExample);
          })
      
          ajax.call("args",{0: "hey", 1: "there"}, function() {
              console.log("call done");
          });
      }
    </script>
  </body>
</html>