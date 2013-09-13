$(function() {

  var url = chrome.extension.getURL("controls.html");
  $(".col-1 .col-3, .col-1 .col-2").append($('<div>').load(url, function() {

    $("a.show-hide-user-sub").click(function(e) {
      e.preventDefault();
      toggleUserSubmittedResults();
    });

    $("#filter-by-text").keyup(function() {
      hideNonMatchingResults($(this).val().toLowerCase().trim())
    });

  }));
});





function hideNonMatchingResults(needle)
{
  if (needle == "")
  {
    $("ul#matching li").each(function() {
      $(this).show();
    });
  } else {

    $("ul#matching li a").each(function() {
      if ($(this).html().toLowerCase().indexOf(needle) == -1)
      {
        $(this).parent().hide();
      } else {
        $(this).parent().show();
      }
    });
  }
}


function toggleUserSubmittedResults()
{
  $("a.show-hide-user-sub").toggle();
  $("ul#matching li a").each(function() {
    if ($(this).html().charAt(0) == "*")
    {
      $(this).parent().toggle();
    }
  });
}

