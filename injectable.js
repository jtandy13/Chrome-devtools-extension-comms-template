function overrideConfirm(){
    confirm = function() {
        alert("Ha! confirm() is now overridden!");
    }
    confirm();
}

window.addEventListener("myCmdEvent", function(event) {
    console.log("im here!");
    debugger;
    if (event.detail === "overrideConfirm"){
        overrideConfirm();
    }
});