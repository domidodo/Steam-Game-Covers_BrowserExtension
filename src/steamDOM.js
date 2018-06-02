class SteamDOM {

	static createAndAddDOM(coverArray)
	{
		var elem = document.getElementById("steamgamecover");
		if(elem !== null)
		{
			elem.parentNode.removeChild(elem);
		}
		
		var sectionNode = SteamDOM.createElement("div", {"id":"steamgamecover", "classes": "game_area_cover_section","display":true});
		
		var panel = SteamDOM.createBody(coverArray);
		
		sectionNode.appendChild(SteamDOM.createHeader());
		sectionNode.appendChild(panel);
		sectionNode.appendChild(SteamDOM.createScrollBar(panel));
		
		document.getElementById("game_area_purchase").appendChild(sectionNode);
	}
	
	static createHeader()
	{
		var topic = SteamDOM.createElement("h2", {"classes":"gradientbg", "innerHTML": "Cover"});
		var topicButton = SteamDOM.createElement("span", {"classes":"note"});
		var topicButtonLink = SteamDOM.createElement('a', {"href":"http://www.steamgamecovers.com/", "innerHTML":"Steamgamecovers.com"});
		
		topicButton.appendChild(topicButtonLink);
		topic.appendChild(topicButton);
		
		return topic;
	}
	
	static createBody(coverArray)
	{
		var body = SteamDOM.createElement('div', {"classes":"store_horizontal_autoslider_ctn", "height": 200, "paddingTop": 5});
		
		var innerScrollPanel = SteamDOM.createElement('div', {"id":"steamgamecover_block_content", "classes": "block_responsive_horizontal_scroll store_horizontal_autoslider block_content nopad", "overflowX": "scroll"});
		
		for(var i = 0; i < coverArray.length; i++)
		{
			var coverData = coverArray[i];
			
			var cover = SteamDOM.createElement('a', {"classes":"small_cap app_impression_tracked", "href": coverData.url });
			
			var coverImage = SteamDOM.createElement('img', {"classes": "coverimage", "src": coverData.large_image, "height" : 132});
			
			
			var coverRanking = SteamDOM.createElement('img', {"src": chrome.runtime.getURL("img/"+coverData.rating.value.replace(".", "")+"star.png")});
			
			//var coverDownloadCount = document.createElement('h4');
			//coverDownloadCount.innerHTML = 'Downloads: '+data.downloads;
			//cover.appendChild(coverDownloadCount)
			
			var coverArtist = SteamDOM.createElement('h5', {"innerHTML": 'Created by: '+coverData.creator.name});
			
			
			cover.appendChild(coverImage);
			cover.appendChild(coverRanking);
			cover.appendChild(coverArtist);
			
			
			innerScrollPanel.appendChild(cover)	
		}
		
		body.appendChild(innerScrollPanel);
		
		return body;
	}
	
	static createScrollBar(panel){
		
		var scrollBar = SteamDOM.createElement('div', {"id":"steamgamecoverScrollBar", "classes": "slider_ctn store_autoslider", "display": false});
		
		var btnLeft  = SteamDOM.createElement('div', {"classes": "slider_left", "innerHTML": "<span></span>"});
			
		var btnRight  = SteamDOM.createElement('div', {"classes": "slider_right", "innerHTML": "<span></span>"});
		
		var sliederBackground  = SteamDOM.createElement('div', {"classes": "slider_bg"});
			
		var sliederPanel  = SteamDOM.createElement('div', {"classes": "slider"});
			
		var slieder  = SteamDOM.createElement('div', {"classes": "handle", "position": "absolute"});
		
				
		sliederPanel.appendChild(slieder);
			
		scrollBar.appendChild(btnLeft);
		scrollBar.appendChild(btnRight);
		scrollBar.appendChild(sliederBackground);
		scrollBar.appendChild(sliederPanel);
		
		
		var controller = new SteamScrollBarController(panel, function(isUsed){
			if(isUsed)
				scrollBar.style.display = "block";
			else
				scrollBar.style.display = "none";
		});
		controller.addSlieder(sliederPanel, slieder);
		controller.addButtonLeft(btnLeft);
		controller.addButtonRight(btnRight);
		

		return scrollBar;
	}
	
	/*
	data = {
		"id" - string
		"classes" - string
		"display" - boolean
		"height" - int
		"width" - int
		"padding" - int
		"paddingTop" - int
		"paddingRight" - int
		"paddingBottom" - int
		"paddingLeft" - int
		"overflowX" - string
		"overflowY" - string
		"href" - string
		"src" - string
		"innerHTML" - string
		"position" - string
	}
	*/
	static createElement(type, data)
	{
		var obj = document.createElement(type);
		
		if(data.id != null)
			obj.id = data.id;
		
		if(data.classes != null)
			obj.className = data.classes;
		
		if(data.display != null)
			if(data.display)
				obj.style.display = "block";
			else
				obj.style.display = "none";
		
		if(data.height != null)
			obj.style.height = data.height+"px";
		
		if(data.width != null)
			obj.style.width = data.width+"px";
		
		if(data.padding != null)
			obj.style.padding = data.padding+"px";
		
		if(data.paddingTop != null)
			obj.style.paddingTop = data.paddingTop+"px";
		
		if(data.paddingRight != null)
			obj.style.paddingRight = data.paddingRight+"px";
		
		if(data.paddingBottom != null)
			obj.style.paddingBottom = data.paddingBottom+"px";
		
		if(data.paddingLeft != null)
			obj.style.paddingLeft = data.paddingLeft+"px";
		
		if(data.overflowX != null)
			obj.style.overflowX = data.overflowX+"px";
		
		if(data.overflowY != null)
			obj.style.overflowY = data.overflowY+"px";
		
		if(data.position != null)
			obj.style.position = data.position;
		
		if(data.href != null)
			obj.setAttribute("href", data.href);
		
		if(type == "a")
		{
			obj.setAttribute("target", "_blank");
			obj.setAttribute("rel", "noopener");
		}
		
		if(data.src != null)
			obj.setAttribute("src", data.src);
		
		
		if(data.innerHTML != null)
			obj.innerHTML = data.innerHTML;
		
		
		return obj;
	}

}
//alert(JSON.stringify(coverArray));