$(function() {

  var url = chrome.extension.getURL("controls.html");
  $(".col-1 .col-3, .col-1 .col-2").append($('<div>').load(url, function() {

    $("a.show-hide-user-sub").click(function(e) {
      e.preventDefault();
      var hide = $(this).attr("href") == "#hide";
      $("#hide-user-subbed").val(hide ? 1 : 0);
      $("a.show-hide-user-sub").toggle();

      updateFilteredList();
    });

    $("#filter-by-text").keyup(updateFilteredList);

  }));
});

function updateFilteredList()
{
  var hideUserSubbed = $("#hide-user-subbed").val() == 1;
  var filterKeywords = $("#filter-by-text").val().toLowerCase().trim();

  $("ul#matching li a").each(function() {

    var foodName = $(this).html().toLowerCase();
    var filterMatch = foodName.indexOf(filterKeywords) != -1;

    var isUser = $(this).html().charAt(0) == "*";

    if ( (hideUserSubbed && isUser) || (filterKeywords.length > 0 && !filterMatch) )
    {
      $(this).parent().hide();
    } else {
      $(this).parent().show();
    }


  });

}