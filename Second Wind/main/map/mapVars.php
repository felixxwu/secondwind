<?php

$islands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $_POST["username"] . "'", "island");
echoAsVar("islands", $islands);
echo "<script>
mapVarInit();
</script>";

?>