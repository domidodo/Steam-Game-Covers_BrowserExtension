
function loadDataAsync(innerScrollPanel, callback)
{
	var i = 0;
	getCoverArray(function(dataArray){
		
		for(i = 0; i < dataArray.length; i++)
		{
			var data = dataArray[i];
			
			var cover = document.createElement('a');
			cover.className = "small_cap app_impression_tracked";
			cover.setAttribute("href", data.url);
			cover.setAttribute("target", "_blank");
			cover.setAttribute("rel", "noopener");
			
			var coverImage = document.createElement('img');
			coverImage.className = "coverimage";
			coverImage.setAttribute("src", data.image);
			coverImage.setAttribute("style", "height: 132px;");
			cover.appendChild(coverImage)
			
			
			var coverRanking = document.createElement('img');
			//coverRanking.className = "coverimage";
			
			coverRanking.setAttribute("src", chrome.runtime.getURL("img/"+data.ranking+".png"));
			//coverRanking.setAttribute("style", "height: 132px;");
			cover.appendChild(coverRanking)
			
			//var coverDownloadCount = document.createElement('h4');
			//coverDownloadCount.innerHTML = 'Downloads: '+data.downloads;
			//cover.appendChild(coverDownloadCount)
			
			var coverArtist = document.createElement('h5');
			coverArtist.innerHTML = 'Created by: '+data.artist;
			cover.appendChild(coverArtist)
			
			
			
			innerScrollPanel.appendChild(cover)	
		}
		
		if(callback != null)
		{
			callback(dataArray.length)
		}
	}, true);
	
	
	/*
		<a class=\ "small_cap app_impression_tracked\" data-ds-appid=\ "730\" href=\ "https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?snr=1_5_9__300\">
			<img src=\ "http://images.steamgamecovers.com/large/5170.png\" class=\ "coverimage\">
			<h4>Downloads: 	3</h4>
			<div class=\ "discount_block  no_discount discount_block_inline\">
				<div class=\ "discount_prices\">
					<div class=\ "discount_final_price\">Created by: domidodo</div>
				</div>
			</div>
		</a>
	*/
}


function crateSectionNode()
{
	
	var sectionNode = document.createElement('div');
	sectionNode.id = "steamgamecover";
	sectionNode.style.display = "none";
	sectionNode.className = "game_area_cover_section";
	
		var topic = document.createElement('h2');
		topic.className = "gradientbg";
		topic.innerHTML = "Cover";
		
			var topicButton = document.createElement('span');
			topicButton.className = "note";
			
				var topicButtonLink = document.createElement('a');
				topicButtonLink.setAttribute("href", "http://www.steamgamecovers.com/");
				topicButtonLink.setAttribute("target", "_blank");
				topicButtonLink.setAttribute("rel", "noopener");
				topicButtonLink.innerHTML = "Steamgamecovers.com";
			topicButton.appendChild(topicButtonLink);
		topic.appendChild(topicButton);
		
	sectionNode.appendChild(topic);
		
		var scrollPanel = document.createElement('div');
		scrollPanel.className = "store_horizontal_autoslider_ctn";
		scrollPanel.setAttribute("style", "height: 200px; padding-top: 5px;");
		
		
			var innerScrollPanel = document.createElement('div');
			innerScrollPanel.id = "steamgamecover_block_content";
			innerScrollPanel.className = "block_responsive_horizontal_scroll store_horizontal_autoslider block_content nopad";
			innerScrollPanel.setAttribute("style", "overflow-x: scroll;");
			
			loadDataAsync(innerScrollPanel, function(hitsCounter){
				if(hitsCounter > 0)
				{
					sectionNode.style.display = "block";
				}
			});
		
		scrollPanel.appendChild(innerScrollPanel);
		
		
	sectionNode.appendChild(scrollPanel);
	sectionNode.appendChild(createScrollBar(innerScrollPanel));
	
	//sectionNode.innerHTML = getHtml();
	
	return sectionNode;
}

var elem = document.getElementById("steamgamecover");
if(elem !== null)
{
	elem.parentNode.removeChild(elem);
}

document.getElementById("game_area_purchase").appendChild(crateSectionNode());
//updateScrollBar();
//document.body.style.border = "5px solid red";
