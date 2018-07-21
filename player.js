var app = angular.module('musicApp', []);
app.controller("musicCtrl", function($scope) {
    $scope.products = [{name: 'Song1', platform: 'YouTube', link:'0000'}, 
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
        alert(song_to_play.name)
    } 
});


