$(document).ready(function() {

	var URL = '';

	$('form').submit(function(e) {
		var searchTerm = $('#search').val();
		buildURL(searchTerm);
		buildThumbs();
		e.preventDefault();
		//console.log();
	});

	$('ul').click(function () {
		$('#video-section').find('a').colorbox();
	});

	function buildURL(searchTerm) {
	URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=' + searchTerm + '&key=AIzaSyBSzkEPkvOAQLAXhbrooCDeF8xbU40eq_0';
	}



	// Get data and build video thumbnail section
	function buildThumbs() {
		$.getJSON(URL, function(data) {

			$('#video-section').html('');

			var myData = data.items;

			for (var x in myData) {
				var idLink = myData[x].id.videoId;
				var thumbLink = myData[x].snippet.thumbnails.medium.url;
				var title = myData[x].snippet.title;

				if(title.length > 35) {
					title = title.substring(0,35)+"..."; 
				}

				var ytURL = 'https://www.youtube.com/watch?v=';
				$('#video-section').append('<li><p>' + title + '<br /><a target="_blank" href=' + ytURL + idLink + '><img src="' + thumbLink + '"></a></p></li>');
				//.append('<li><p>' + title + '</p><a target="_blank" href=' + ytURL + idLink + '><img src="' + thumbLink + '"></a></li.block>');
				//console.log(myData[x].snippet.thumbnails.medium.url);
			}
		});

	}


});