$(function() {

  var url = chrome.extension.getURL("controls.html");
  $(".col-1 .col-3, .col-1 .col-2").append($('<div>').load(url, function() {

    $("a.hide-user-sub").click(function(e) {
      e.preventDefault();
      toggleUserSubmittedResults();
    });

    $("a.show-user-sub").click(function(e) {
      e.preventDefault();
      toggleUserSubmittedResults();
    });

  }));
});

function toggleUserSubmittedResults()
{
  $("ul#matching li a").each(function() {
    if ($(this).html().charAt(0) == "*")
    {
      $(this).parent().toggle();
      $("a.hide-user-sub").toggle();
      $("a.show-user-sub").toggle();
    }
  });
}

