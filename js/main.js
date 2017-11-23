var url = 'https://api.icndb.com/jokes/random';
var button = document.getElementById('get-joke');
var paragraph = document.getElementById('joke');

window.addEventListener('load', function() {
	getJoke();
});

button.addEventListener('click', function(){
  getJoke();
});

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(){
    var response = JSON.parse(xhr.response);
    paragraph.innerHTML = response.value.joke;
  });
  xhr.send();
}



var url = 'https://api.icndb.com/jokes/random';
var $paragraph = $('#joke');

var $button = $('#get-joke').click(function() {
	getJoke();
});

function getJoke() {
$.ajax({
	method: 'GET',
	url: url,
	success: function(res) {
		$paragraph.text(res.value.joke);
	}

});
}

