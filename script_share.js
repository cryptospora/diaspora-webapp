// Handler for the share event
navigator.mozSetMessageHandler("activity", function(activity){
	if(activity.source.name == "share"){
		// obtain the URL from the activity
		var urlToShare = activity.source.data.url;
		if (window.localStorage.length > 1) {
		var div = document.getElementById('previousHandles');
		var existingHandlesLabel = document.createElement('p');
		existingHandlesLabel.id = 'existing-handles-label';
		existingHandlesLabel.setAttribute('data-l10n-id', 'select-id');
		div.appendChild(existingHandlesLabel);
		
		// Add handles to a list
		var ul = document.createElement('ul');
		for (var i = 0; i < window.localStorage.length; i++) {
			var handle = window.localStorage.key(i);
			var li = document.createElement('li');
			var linkToPod = document.createElement('a');
		 
			linkToPod.setAttribute('href', getShareUrl(handle, urlToShare));
			linkToPod.setAttribute('title', 'Share to my pod!');
			linkToPod.appendChild(document.createTextNode(handle));
		 
			li.appendChild(linkToPod);
			ul.appendChild(li);
		}
		div.appendChild(ul);
		}
		else if (window.localStorage.length == 1){
				//if only one account, share directly to it
				var handle = window.localStorage.key(0);
				window.location = getShareUrl(handle, urlToShare);
		}
			else{
				// If no diaspora* account has been defined. 
				//TODO: propose for configuration and continue
				alert(navigator.mozL10n.get('configuration-required'));
			}
		}
	}
});

// url to share something
function getShareUrl(handle, content) {
	var splitted = handle.split('@');
	return 'https://' + splitted[1] + '/bookmarklet?title=&url=' +	content;
}
