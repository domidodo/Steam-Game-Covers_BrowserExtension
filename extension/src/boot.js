class Boot {
	static start() 
	{
		Settings.init();
		TextPool.init();
		
		var elem = document.getElementById("steamgamecover");
		if(elem !== null)
		{
			elem.parentNode.removeChild(elem);
		}

		var url = window.location.href;
		var steamGameId = Boot.getGameIdFromUrl(url);
		CoversManager.getCoversOfGame(steamGameId, true, function(coverArray){
			//alert(JSON.stringify(coverArray));
			SteamDOM.createAndAddDOM(coverArray);
		});
		
		
		//document.getElementById("game_area_purchase").appendChild(Boot.crateSectionNode());
	}
	
	static getGameIdFromUrl(url)
	{
		if(url.indexOf('store.steampowered.com/app/') >= 0)
		{
			url = url.substring(url.indexOf('/app/')+5);
			url = url.substring(0, url.indexOf('/'));
		}
		return url;
	}
	
}

Boot.start();