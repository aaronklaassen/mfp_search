$(function() {

  var food_data = loadFoodData();


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

function loadFoodData()
{
  foods = new Array();

  $("ul#matching li a").each(function() {

    var url_tokens = $(this).attr("href").split("/");
    var food_id = url_tokens[url_tokens.length - 1];

    $(this).parent().addClass("food-" + food_id);

    $.get($(this).attr("href"), function(html) {
      // TODO
      // parse html, i.e. scrape confirmations, etc.
      // add the confirmation count to the li

      var line = $(html).find(".user_submitted").html();
      if (line !== undefined)
      {
        var confirmations = line.match(/\d+/)[0]

        $("ul#matching li.food-" + food_id).parent().append('<span class="confirmation-count">' + confirmations + '</li>');
      }
      

    });

  });

  return foods;
}