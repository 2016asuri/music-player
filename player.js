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
        	document.getElementById("drive_player").style.visibility="hidden";
        	videoId = youtube_id_from_link(song_to_play.id);
        	alert(videoId)
        	youtube_load()   
        }
        else if(song_to_play.platform == 'Google Drive'){
        	document.getElementById("youtube_player").style.visibility="hidden";
        	var driveLink = drive_id_from_link(song_to_play.id);
        	drive_play(driveLink)

        }
        else if(song_to_play.platform == 'SoundCloud' || 
        		song_to_play.platform == 'AudioMack'){
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



});


