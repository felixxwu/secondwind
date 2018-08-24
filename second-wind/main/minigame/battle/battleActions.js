//location list is :: [{x,y}]
function submitAction(battleID, turn, actionType, unitName, locationList) {
    ajaxSecureCall(
        "submitAction",
        {
            battleID: battleID,
            turn: turn,
            actionType: actionType,
            unitName: unitName,
            locationList: JSON.stringify(locationList)
        },
        function(response) {
            if (response == "fail") {
                console.warn("Illegal action. Battle ID: " + battleID);
            }
        }
    );
}
