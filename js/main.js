var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');
var input = $('#country-name');
var nav = $('#nav');
var searchBtn = $('#fixSearch');

$( document ).ready(function() {
    $(searchBtn).hide();	
});

$('#search').click(searchCountries);

$(searchBtn).click(function(e) {
	$(nav).css("opacity", "1");
	$(nav).css("height", "100%");
	$(searchBtn).hide();
});

$(input).keypress(function(e) {
    if(e.which == 13) {
        searchCountries();
    }
});

function searchCountries() {
  	var countryName = $(input).val();
  	if(!countryName.length) countryName = jumpBtn();
  	$.ajax ({
  		url: url + countryName,
  		method: 'GET',
  		statusCode: {
    		404: function() {
      			jumpBtn();
    		}
  		},
  		success: showCountriesList
  	});
}

function jumpBtn() {
	$(input).css("animation", "jump .9s infinite");
	$(input).css("color", "#FF0004");
	$(input).val("Oops data no found");
	function rmvAtrr () {
		$(input).css("animation", "");
		$(input).css("color", "#000000");
		$(input).val("");
	}
	setTimeout(rmvAtrr, 2000);
}

function showCountriesList(resp) {
	countriesList.empty();
	$(input).val("");
	$(nav).css("opacity", "0");
	$(nav).css("height", "0px");
	$(searchBtn).show();

	resp.forEach(function(item) {
		var infoElement = $('<div/>', {
	    	class: "search__countries--box",
		}).appendTo(countriesList);
		$('<h2>').text(item.name).appendTo(infoElement);
		$('<img/>', {
	    	class: "flagImg",
   	 		src: item.flag,
		}).appendTo(infoElement);
	    $('<p>').text("Capital Name: " + item.capital).appendTo(infoElement);
	    $('<p>').text("Population: " + item.population).appendTo(infoElement);
	    var languages = item.languages;
	    function showLanguages(languages) {
	    	languages.forEach(function(la) {
	    		$('<p>').text("Languages: " + la.name).appendTo(infoElement);
	    	});
	    }
	    var currencies = item.currencies;
	    function showCurrencies(currencies) {
	    	currencies.forEach(function(cu) {
	    		$('<p>').text("Currency: " + cu.name).appendTo(infoElement);
	    	});
	    }
	    showCurrencies(currencies);
	    showLanguages(languages);
	 });
}


