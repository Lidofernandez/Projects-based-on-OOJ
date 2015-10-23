'use strict';

function CustomSearch () {

}

CustomSearch.prototype.toHTMLbody = function(dataLinks) {
	var	printLinks = '<ul class="links">';
	for (var i = 0; i < dataLinks.items.length; i += 1) {
		printLinks += '<div class="formatLinks">';
		printLinks += '<li class="tittleLink">';
		printLinks += dataLinks.items[i].htmlTitle + '</li>';
		printLinks += '<li><a href="' + dataLinks.items[i].link + '">'; 
		printLinks += dataLinks.items[i].link + '</a></li>';
		if (dataLinks.items[i].pagemap !== undefined) {
		printLinks += '<table class="description"><tr><td><a href="';
		printLinks += dataLinks.items[i].link;
		printLinks += '"><img src="';
		printLinks += dataLinks.items[i].pagemap.cse_image[0].src;
		printLinks += '" alt = "imgSection"></a></td>';
		}
		printLinks += '<td><p>' + dataLinks.items[i].snippet;
		printLinks += '</p></td></tr></table>';
		printLinks += '</div>';
	}
		printLinks += '</ul>';
	document.getElementById("displayWebResults").innerHTML = printLinks;
};

CustomSearch.prototype.toHTMLnav = function(dataLinks) {
	if (parseInt(dataLinks.queries.request[0].totalResults) > 0) {
		var pages = Math.round(parseInt(dataLinks.queries.request[0].totalResults)/10);
		// console.log(pages);
		if (pages > 10) {
			for (var i = 0; i <= 9; i+=1) {
				this.addPages(i);
			}
		}
	}
};

CustomSearch.prototype.addPages = function (i) {
 	var element = document.createElement("button");
	  	element.setAttribute("type", "button");
	  	element.innerHTML = i + 1;
	  	element.onclick = searchEngine_UI.createNavigator.bind(null, i);
  	var pages = document.getElementById("displayPages");
  	pages.appendChild(element);
};

//API
CustomSearch.prototype.url = function (index) {
	/*......................................................*/
	var apiKey = "AIzaSyD2sISIBeqdQiCRoJiVOYjFk3NNfZ62Bts"; 
	var searchGoogleID = "004975204272958123692:mhgx86zgpoa";
	/*......................................................*/
	var searchInput = document.getElementById("search").value;
	var googleUrl = "https://www.googleapis.com/customsearch/v1?";
		googleUrl += "key=" + apiKey;
		googleUrl += "&cx=" + searchGoogleID;
		googleUrl += "&q=" + searchInput;
	if (index !== undefined) {
		googleUrl += "&start=" + index;
	}
	return googleUrl;
};

CustomSearch.prototype.footer =	function (url, toHTMLbody) {
	var hrxFooter = new XMLHttpRequest();
		hrxFooter.onreadystatechange = function () {
			if (hrxFooter.readyState === 4 ) {
				if (hrxFooter.status === 200 ) {				
					var dataNavigation = JSON.parse(hrxFooter.responseText); //
					toHTMLbody(dataNavigation);
					// console.log(dataLinks);
				} else {
					// console.log("HTTP error "+hrxFooter.status+" "+hrxFooter.statusText);
				}
			} else {
				// console.log(hrxFooter.readyState);
			}
		};
		hrxFooter.open("GET", url, true);
		// console.log(url);
		hrxFooter.send();
};


var prinWebResults = new CustomSearch();

//User Interface

var searchEngine_UI = {

	createNavigator: function (i) {
		prinWebResults.footer((prinWebResults.url(i*10+1)), prinWebResults.toHTMLbody);
	},

	googleSearchEngine: function (event) {
		if (document.getElementById("search").value !== "") {
			var hrx = new XMLHttpRequest();
			hrx.onreadystatechange = function () {
				if (hrx.readyState === 4 ) {
					if (hrx.status === 200 ) {				
						var dataLinks = JSON.parse(hrx.responseText); //
							prinWebResults.toHTMLbody(dataLinks);
							prinWebResults.toHTMLnav(dataLinks);
					} else {
						// console.log("HTTP error "+hrx.status+" "+hrx.statusText);
					}
				} else {
					// console.log(hrx.readyState);
				}
			};
			hrx.open("GET", prinWebResults.url(), true);
			// console.log(url);
			hrx.send();
		} else {
			// console.log("Please type a term for search");
		}
		event.preventDefault();
	}

};

//Main event Handler

var startSearching = document.getElementById("submit");
	startSearching.onclick = searchEngine_UI.googleSearchEngine; 

