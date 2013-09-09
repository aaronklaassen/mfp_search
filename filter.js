$(function() {

  var url = chrome.extension.getURL("controls.html");
  $(".col-1 .col-3, .col-1 .col-2").append($('<div>').load(url, function() {
    $("a.hide-user-sub").click(function(e) {
      e.preventDefault();
      alert("clicky");
    });
  }));
});