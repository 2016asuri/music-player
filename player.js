var app = angular.module('musicApp', []);
app.controller("musicCtrl",  function($scope, $http) {
	getSongs();
	function getSongs(){
		$http.post("http://localhost:8000/php/getSongs.php").then(function(response){
        $scope.songs = response.data;
    });
	}
	
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addSongName || !$scope.addSongPlatform || !$scope.addSongLink) {return;}
        if (true /*check if already in table */) {
        	var song = {name: $scope.addSongName, platform: $scope.addSongPlatform, link:$scope.addSongLink}
            //$scope.products.push(song);
            $http.post("http://localhost:8000/php/addSong.php?name="+song.name+"&platform="+song.platform+"&link="+song.link).then(function(response) {
            	$scope.errortext = "Song added successfully!"
            	getSongs();
            });

        } else {
            $scope.errortext = "The item is already in your music collection.";
        }
        document.getElementById("name").value = "";
        document.getElementById("platform").value="";
        document.getElementById("id").value="";

    }

    $scope.removeItem = function (x) {
        $scope.errortext = "";
        var song = $scope.songs[x];

        $http.post("http://localhost:8000/php/deleteSong.php?link="+song.id).then(function(response){
        	$scope.errortext = "Song deleted successfully!"
            getSongs();
        });
    } 

    $scope.playSong = function (x) {
        $scope.errortext = "";
        var song_to_play = $scope.songs[x];
        if(song_to_play.platform == 'YouTube'){
        	document.getElementById("youtube_player").style.visibility="visible";
        	document.getElementById("drive_player").style.visibility="hidden";
			document.getElementById("drive_player").src = null;

        	videoId = youtube_id_from_link(song_to_play.id);

        	if(player == undefined) youtube_load();
        	else {
        		stopVideo();
        		player.loadVideoById(videoId);
        	}   
        }
        else if(song_to_play.platform == 'Google Drive'){
        	if(player != undefined) stopVideo();
        	document.getElementById("youtube_player").style.visibility="hidden";
        	document.getElementById("drive_player").style.visibility="visible";
        	var driveLink = drive_id_from_link(song_to_play.id);
        	drive_play(driveLink)

        }
        else if(song_to_play.platform == 'Spotify'){
            if(player != undefined) stopVideo();
            document.getElementById("youtube_player").style.visibility="hidden";
            document.getElementById("drive_player").style.visibility="hidden";
            document.getElementById("drive_player").src = null;
            //spotify_play(song_to_play.id)
            play();
        }
        else if(song_to_play.platform== 'SoundCloud' || 
        		song_to_play.platform == 'AudioMack'){
            if(player != undefined) stopVideo();
            document.getElementById("youtube_player").style.visibility="hidden";
            document.getElementById("drive_player").style.visibility="hidden";
            document.getElementById("drive_player").src = null;
        	window.open(song_to_play.id, '_blank');
        }
             
    } 


    function youtube_id_from_link(link){
    	var id = link.split("v=")[1].split("&")[0];
    	return id
    }

    function drive_id_from_link(link){
    	var id = link.split("view")[0]+"preview";
    	return id
    }

    var videoId;
	function youtube_load()
	{
		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
		   var tag = document.createElement('script');
    		tag.src = "https://www.youtube.com/iframe_api";
    		var firstScriptTag = document.getElementsByTagName('script')[0];
    		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    		window.onYouTubePlayerAPIReady = function() {
      		onYouTubePlayer();
    	};

  	} else {

    	onYouTubePlayer();

  		}
	}
	var player;
	function onYouTubePlayer() 
	{
		player = new YT.Player('youtube_player', 
		{
		height: '390',
		width: '640',
		videoId: videoId,
		events: 
		{
		  'onReady': onPlayerReady,
		  'onStateChange': onPlayerStateChange
		},
		host: 'https://www.youtube.com'
		});
	} 
	function onPlayerReady(event) 
	{
		event.target.playVideo();
	}
	var done = false;
	function onPlayerStateChange(event) 
	{
		if (event.data == YT.PlayerState.PLAYING && !done) 
		{
		  	setTimeout(stopVideo, (player.getDuration()-1)*1000);
		  	done = true;
		}
	}
	function stopVideo() 
	{
		player.stopVideo();
	}


	function drive_play(file_link){
		var d_player = document.getElementById("drive_player");
		d_player.style.visibility = "visible";
		d_player.src = file_link; 

	}    


        // Get the hash of the url
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';

    // Set token
    let _token = hash.access_token;
    
    const authEndpoint = 'https://accounts.spotify.com/authorize';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = '7695986a5d7446fab30e5366b1ddfd4f';
    //const redirectUri = 'https://spotify-web-playback.glitch.me';
    const scopes = [
      'streaming',
      'user-read-birthdate',
      'user-read-private',
      'user-modify-playback-state'
    ];

    // Set up the Web Playback SDK

    window.onSpotifyPlayerAPIReady = () => {
      const player = new Spotify.Player({
        name: 'Web Playback SDK Template',
        getOAuthToken: cb => { cb(_token); }
      });

      // Error handling
      player.on('initialization_error', e => console.error(e));
      player.on('authentication_error', e => console.error(e));
      player.on('account_error', e => console.error(e));
      player.on('playback_error', e => console.error(e));

      // Playback status updates
      player.on('player_state_changed', state => {
        console.log(state)
        $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
        $('#current-track-name').text(state.track_window.current_track.name);
      });

      // Ready
      player.on('ready', data => {
        console.log('Ready with Device ID', data.device_id);
        
        // Play a track using our new device ID
        play(data.device_id);
      });

      // Connect to the player!
      player.connect();
    }

    // Play a specified track on the Web Playback SDK's device ID
    function play(device_id) {
      $.ajax({
       url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
       type: "PUT",
       data: '{"uris": ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"]}',
       beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
       success: function(data) { 
         console.log(data);
       }
      });
    }






});


