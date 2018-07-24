	// // Get the hash of the url
	// const hash = window.location.hash
	// .substring(1)
	// .split('&')
	// .reduce(function (initial, item) {
	//   if (item) {
	//     var parts = item.split('=');
	//     initial[parts[0]] = decodeURIComponent(parts[1]);
	//   }
	//   return initial;
	// }, {});
	// window.location.hash = '';

	// // Set token
	// let _token = hash.access_token;
	
	// const authEndpoint = 'https://accounts.spotify.com/authorize';

	// // Replace with your app's client ID, redirect URI and desired scopes
	// const clientId = '7695986a5d7446fab30e5366b1ddfd4f';
	// //const redirectUri = 'https://spotify-web-playback.glitch.me';
	// const scopes = [
	//   'streaming',
	//   'user-read-birthdate',
	//   'user-read-private',
	//   'user-modify-playback-state'
	// ];

	// // Set up the Web Playback SDK

	// window.onSpotifyPlayerAPIReady = () => {
	//   const player = new Spotify.Player({
	//     name: 'Web Playback SDK Template',
	//     getOAuthToken: cb => { cb(_token); }
	//   });

	//   // Error handling
	//   player.on('initialization_error', e => console.error(e));
	//   player.on('authentication_error', e => console.error(e));
	//   player.on('account_error', e => console.error(e));
	//   player.on('playback_error', e => console.error(e));

	//   // Playback status updates
	//   player.on('player_state_changed', state => {
	//     console.log(state)
	//     $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
	//     $('#current-track-name').text(state.track_window.current_track.name);
	//   });

	//   // Ready
	//   player.on('ready', data => {
	//     console.log('Ready with Device ID', data.device_id);
	    
	//     // Play a track using our new device ID
	//     play(data.device_id);
	//   });

	//   // Connect to the player!
	//   player.connect();
	// }

	// // Play a specified track on the Web Playback SDK's device ID
	// function play(device_id) {
	//   $.ajax({
	//    url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
	//    type: "PUT",
	//    data: '{"uris": ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"]}',
	//    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
	//    success: function(data) { 
	//      console.log(data)
	//    }
	//   });
	// }

/*	window.onSpotifyWebPlaybackSDKReady = () =>{
	 	$.ajax({
   		url: "https://api.spotify.com/v1/me/player/play" + device_id,
   		type: "PUT",
   		data: '{"uris": ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"]}',
   		beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   		success: function(data) { 
     		console.log(data)
   			}
		});
	}*/

/*	window.onSpotifyWebPlaybackSDKReady = () => {
  	// You can now initialize Spotify.Player and use the SDK
  	const play = ({
  		spotify_uri,
  		playerInstance: {
   			_options: {
      		//getOAuthToken,
      		id
    		}
  		}
	}) //=> {
 //  	getOAuthToken(access_token => {
 //    	fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
 //      		method: 'PUT',
 //      		body: JSON.stringify({ uris: [spotify_uri] }),
 //      		headers: {
 //        		'Content-Type': 'application/json',
 //        		'Authorization': `Bearer ${access_token}`
 //      			},
 //    		});
 //  		});
	// };

	play({
		spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
  		playerInstance: new Spotify.Player({ name: "..." }),
  		
	});
	
	};*/