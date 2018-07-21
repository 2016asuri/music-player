var app = angular.module('musicApp', []);
app.controller("musicCtrl", function($scope) {
    $scope.products = [{name: 'Song1', platform: 'YouTube', link:'bWwBJqVYSZI'}, 
    				   {name: 'Song2', platform: 'Google Drive', link:'0001'}, 
    				   {name: 'Song3', platform: 'Spotify', link:'0002'}];
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addSongName || !$scope.addSongPlatform || !$scope.addSongLink) {return;}
        if ($scope.products.indexOf($scope.addMe) == -1) {
        	var song = {name: $scope.addSongName, platform: $scope.addSongPlatform, link:$scope.addSongLink}
            $scope.products.push(song);
        } else {
            $scope.errortext = "The item is already in your music collection.";
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.products.splice(x, 1);
    } 

    $scope.playSong = function (x) {
        $scope.errortext = "";
        song_to_play = $scope.products[x]
        if(song_to_play.platform == 'YouTube'){
        	videoId = song_to_play.link;
        	youtube_load()   
        }
        else if(song_to_play.platform == 'Google Drive'){
        	var driveLink = song_to_play.link;
        	drive_play(driveLink)

        }
             
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
		d_player.src = "https://drive.google.com/file/d/1PjMwTche8fahR1hxKZeBdKxb45rkv6oT/preview"

	}    
});


