
var refreshButton = document.querySelector('.refresh');
var refreshClickSream = Rx.Observable.fromEvent(refreshButton, 'click');

var requestStream = refreshClickSream.startWith('refresh click')
	.map(function(){
		var since = Math.floor(Math.random() * 500);
		return 'data/users.json?since=' + since;
	});

var responseStream = requestStream.flatMap(function(requestUrl){
	return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
});

var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var suggestion1Stream = createSuggestion(Rx.Observable.fromEvent(closeButton1, 'click'));
var suggestion2Stream = createSuggestion(Rx.Observable.fromEvent(closeButton2, 'click'));
var suggestion3Stream = createSuggestion(Rx.Observable.fromEvent(closeButton3, 'click'));

suggestion1Stream.subscribe(function(item){
	renderSuggestion(item, '.suggestion1');
});

suggestion2Stream.subscribe(function(item){
	renderSuggestion(item, '.suggestion2');
});

suggestion3Stream.subscribe(function(item){
	renderSuggestion(item, '.suggestion3');
});


function createSuggestion(closeButtonStream){
	return responseStream
	.combineLatest(closeButtonStream.startWith('close click'), function(list, event){
		return list[Math.floor(Math.random() * list.length)];
	});
}

// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser, selector) {
    var suggestionEl = document.querySelector(selector);
    if (suggestedUser === null) {
        suggestionEl.style.visibility = 'hidden';
    } else {
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username');
        usernameEl.href = suggestedUser.html_url;
        usernameEl.textContent = suggestedUser.login;
        var imgEl = suggestionEl.querySelector('img');
        imgEl.src = "";
        imgEl.src = suggestedUser.avatar_url;
    }
}

