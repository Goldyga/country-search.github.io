var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');
var input = $('#country-name');

$('#search').click(searchCountries);
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
	$(input).val("Oops data no found or not entered");
	function rmvAtrr () {
		$(input).css("animation", "");
		$(input).val("");
	}
	setTimeout(rmvAtrr, 2000);
}

function showCountriesList(resp) {
	countriesList.empty();
	$(input).val("");

	resp.forEach(function(item) {
		var infoElement = $('<div/>', {
	    	class: "search__countries--box",
		}).appendTo(countriesList);
		$('<img/>', {
	    	class: "flagImg",
   	 		src: item.flag,
		}).appendTo(infoElement);
	    $('<p>').text("Country Name: " + item.name).appendTo(infoElement);
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


