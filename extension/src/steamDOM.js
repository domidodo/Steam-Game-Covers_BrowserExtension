class SteamDOM {

	static createAndAddDOM(coverArray)
	{
		var elem = document.getElementById("steamgamecover");
		if(elem !== null)
		{
			elem.parentNode.removeChild(elem);
		}
		
		if(coverArray.length >= 1)
		{
			var sectionNode = SteamDOM.createElement("div", {"id":"steamgamecover", "classes": "game_area_cover_section","display":true});
			
			var panel = SteamDOM.createBody(coverArray);
			
			sectionNode.appendChild(SteamDOM.createHeader());
			sectionNode.appendChild(panel);
			sectionNode.appendChild(SteamDOM.createScrollBar(panel));
			
			document.getElementById("game_area_purchase").appendChild(sectionNode);
		}
		else
		{
			if(Settings.get("showUploadButton", false))
			{
				var sectionNode = SteamDOM.createElement("div", {"id":"steamgamecover", "classes": "game_area_cover_section","display":true});
			
				var panel = SteamDOM.createElement("div", {"classes": "uploadButton"});
				var image = SteamDOM.createElement('img', {"src": chrome.runtime.getURL("img/upload.png"), "center": true});
				panel.appendChild(image);
				panel.setAttribute("onclick", "window.open('http://www.steamgamecovers.com/select.php', '_blank').focus();");
				
				sectionNode.appendChild(SteamDOM.createHeader());
				sectionNode.appendChild(panel);
				
				document.getElementById("game_area_purchase").appendChild(sectionNode);
			}
		}
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
			cover.setAttribute("onmouseenter", "GameHover( this, event, 'global_hover', {type:'app', id:'steamgamecover_"+coverData.id+"', v6:1} );");
			cover.setAttribute("onmouseleave", "HideGameHover( this, event, 'global_hover' )");
			SteamDOM.crateHoverContent(coverData);
			
			var coverImage = SteamDOM.createElement('img', {"classes": "coverimage", "src": coverData.large_image, "height" : 132});
			
			var coverRanking = SteamDOM.createElement('img', {"src": chrome.runtime.getURL("img/"+coverData.rating.value.replace(".", "")+"star.png")});
			
			var coverArtist = SteamDOM.createElement('h5', {"innerHTML": TextPool.getString("CreatedBy") +': '+coverData.creator.name});
			
			if(coverData.metadata.steamType != "app")
			{
				var bundleBanner = SteamDOM.createElement('img', {"position":"absolute", "top": 0, "right": 0, "zIndex":100,"height":50, "width":50, "src":chrome.runtime.getURL("img/bundleBanner.png")});
				cover.appendChild(bundleBanner);
			}
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
	
	
	static crateHoverContent(coverData)
	{
		var languageImage = SteamDOM.createElement('img', {"classes":"cover_language_flag", "src": chrome.runtime.getURL("img/flag_"+coverData.language+".png")});
		
		var hoverContent = SteamDOM.createElement('div', {"id":"hover_app_steamgamecover_"+coverData.id, "display": false});
		
		var topArea = SteamDOM.createElement('div', {"classes":"hover_top_area", "display": false});
		
		var title = SteamDOM.createElement('h4', {"innerHTML": coverData.type.substring(0, coverData.type.length-1).replace(/_/g, " ").toUpperCase()});
		
		var creator = SteamDOM.createElement('div', {"classes":"hover_release", "innerHTML": TextPool.getString("CreatedBy") + ": "+coverData.creator.name});
		var release = SteamDOM.createElement('div', {"classes":"hover_release", "innerHTML": TextPool.getString("Release") + ": "+new Date(coverData.date_posted).toLocaleString(TextPool.getLanguageFormCode())});
		
		var coverImageArea = SteamDOM.createElement('div', {"classes":"hover_screenshots"});
		var coverImage = SteamDOM.createElement('div', {"classes":"hover_coverimage", "backgroundImageUrl": coverData.large_image});
		coverImageArea.appendChild(coverImage);
	
	
		var ratingAreaDownloadsCountClass = " no_reviews";
		if(coverData.downloads >= 1 && coverData.downloads <= 10)
			ratingAreaDownloadsCountClass = "";
		if(coverData.downloads >= 11 && coverData.downloads <= 100)
			ratingAreaDownloadsCountClass = " mixed";
		if(coverData.downloads >= 101)
			ratingAreaDownloadsCountClass = " positive";
		
		var ratingArea = SteamDOM.createElement('div', {"classes":"hover_body"});
		var ratingAreaBody = SteamDOM.createElement('div', {"classes":"hover_review_summary"});
		var ratingAreaStars = SteamDOM.createElement('img', {"src": chrome.runtime.getURL("img/"+coverData.rating.value.replace(".", "")+"star.png")});
		var ratingAreaDownloadsText = SteamDOM.createElement('span', {"innerHTML":" "+TextPool.getString("Downloads")});
		var ratingAreaDownloadsCount = SteamDOM.createElement('span', {"classes": "game_review_summary"+ratingAreaDownloadsCountClass, "innerHTML": "<br/>"+coverData.downloads});
		var ratingAreaBottom = SteamDOM.createElement('div', {"clear":"left"});
		ratingAreaBody.appendChild(ratingAreaStars);
		ratingAreaBody.appendChild(ratingAreaDownloadsCount);
		ratingAreaBody.appendChild(ratingAreaDownloadsText);
		ratingArea.appendChild(ratingAreaBody);
		ratingArea.appendChild(ratingAreaBottom);
		
		var description = null;
		if(coverData.description != "")
		{
			// Alle Zeilenumbrüche ersetzen mit <br/>
			coverData.description = coverData.description.replace(/\n/g, "<br/>");
			coverData.description = coverData.description.replace(/\r/g, "");
			
			description = SteamDOM.createElement('p', {"innerHTML":"<b>"+TextPool.getString("Description")+":</b><br/>"+coverData.description});
			
			if(Settings.get("translateDescription", true))
			{
				var c_tag = {};
				c_tag.dom = description;
				c_tag.text = coverData.description;
				
				TextPool.translate(coverData.description, null, null, function(translation, tag){
					if(tag.text != translation)
					{
						tag.dom.innerHTML = "<b>"+TextPool.getString("Description")+"</b> <small>("+TextPool.getString("TranslatedByGoogle")+")</small><br/>"+translation;
					}
				}, c_tag);
			}
		}
		
		var tagsArea = SteamDOM.createElement('div', {"classes":"hover_body"});
		var tagsAreaBody = SteamDOM.createElement('div', {"classes":"hover_tag_row"});
		tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":coverData.language}));
		if(coverData.disc_number != null)
			tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":"Disc "+coverData.disc_number}));
		if(coverData.case_type != null)
			tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":coverData.case_type}));
		if(coverData.cover_location != null)
			tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":coverData.cover_location}));
		tagsArea.appendChild(tagsAreaBody);
		
		
		hoverContent.appendChild(languageImage);
		hoverContent.appendChild(topArea);
		hoverContent.appendChild(title);
		hoverContent.appendChild(release);
		hoverContent.appendChild(creator);
		hoverContent.appendChild(coverImageArea);
		hoverContent.appendChild(ratingArea);
		if(description != null){
			hoverContent.appendChild(description);
		}
		hoverContent.appendChild(tagsArea);
		
		document.getElementById("global_hover_content").appendChild(hoverContent);
	}
	
	/*
	data = {
		"id" - string
		"classes" - string
		"display" - boolean
		"height" - int
		"width" - int
		"fullWidth" - boolean
		"margin" -int
		"padding" - int
		"paddingTop" - int
		"paddingRight" - int
		"paddingBottom" - int
		"paddingLeft" - int
		"overflowX" - string
		"overflowY" - string
		"center" - boolean
		"borderWidth" - int
		"borderStyle" - dotted / dashed / solid / double / groove / ridge / inset / outset / none / hidden
		"borderColor" - string
		"borderRadius" - int
		"backgroundColor" - string
		"backgroundImageUrl" - string
		"href" - string
		"src" - string
		"innerHTML" - string
		"position" - string
		"zIndex" - int
		"top" - int
		"left" - int
		"right" - int
		"bottom " - int
		"clear" - string
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
		
		if(data.fullWidth != null && data.fullWidth)
			obj.style.width = "100%";
		
		if(data.margin != null)
			obj.style.margin = data.margin+"px";
		
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
		
		
		if(data.center != null && data.center)
		{
			obj.style.display = "block";
			obj.style.marginTop = "auto";
			obj.style.marginBottom = "auto";
			obj.style.marginLeft = "auto";
			obj.style.marginRight = "auto";
		}
		
		if(data.borderWidth != null)
			obj.style.borderWidth = data.borderWidth+"px";
		
		if(data.borderStyle != null)
			obj.style.borderStyle = data.borderStyle;
		
		if(data.borderColor != null)
			obj.style.borderColor = data.borderColor;
		
		if(data.borderRadius != null)
			obj.style.borderRadius = data.borderRadius+"px";
		
		if(data.position != null)
			obj.style.position = data.position;
		
		if(data.zIndex != null)
			obj.style.zIndex  = data.zIndex;
		
		if(data.top != null)
			obj.style.top  = data.top+"px";
		
		if(data.left != null)
			obj.style.left  = data.left+"px";
		
		if(data.right != null)
			obj.style.right  = data.right+"px";
		
		if(data.bottom != null)
			obj.style.bottom  = data.bottom+"px";
		
		if(data.clear != null)
			obj.style.clear = data.clear;
		
		if(data.backgroundColor != null)
			obj.style.backgroundColor = data.backgroundColor;
		
		if(data.backgroundImageUrl != null)
			obj.style.backgroundImage = "url('"+data.backgroundImageUrl+"')";
		
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