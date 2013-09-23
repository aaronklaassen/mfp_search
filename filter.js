$(function() {

  var food_data = loadFoodData();

  var url = chrome.extension.getURL("controls.html");
  $(".col-1 .col-3, .col-1 .col-2").append($('<span>').load(url, function() {

    $("a.show-hide-user-sub").click(function(e) {
      e.preventDefault();
      var hide = $(this).attr("href") == "#hide";
      $("#hide-user-subbed").val(hide ? 1 : 0);
      $("a.show-hide-user-sub").toggle();

      updateFilteredList();
    });

    $("#filter-by-text").keyup(updateFilteredList);

    $("input#confirmation-sort").click(sortByConfirmations);

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

      foods[food_id] = html;

      var line = $(html).find(".user_submitted").html();
      if (line !== undefined)
      {
        var confirmations = line.match(/\d+/)[0]
        $("ul#matching li.food-" + food_id).prepend('<span class="confirmation-count">' + confirmations + '</li>');
      }
      

      $("ul#matching li.food-" + food_id).addClass("loaded");
      // TODO if loaded.count == li.count then enable confirmation sort

    });

  });

  return foods;
}

function sortByConfirmations()
{
  items = $("ul#matching").children("li").get();

  items.sort(function(li_a, li_b) {
    var conf_a = parseInt($(li_a).find(".confirmation-count").html());
    var conf_b = parseInt($(li_b).find(".confirmation-count").html());

    conf_a = isNaN(conf_a) ? 0 : conf_a
    conf_b = isNaN(conf_b) ? 0 : conf_b

    if (conf_a < conf_b)
      return -1;
    else if (conf_a > conf_b)
      return 1;
    else
      return 0;
  });

  items.reverse();

  $("ul#matching li").remove();
  $.each(items, function(i, item) {
    $("ul#matching").append(item);
  });
}