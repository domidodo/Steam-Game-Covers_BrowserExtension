class CoversManager {
	static getCoversOfGame(id, doAutoUpdate, callback) 
	{
		chrome.storage.local.get("coversStore", function(result) {
			var coversStore = result.coversStore;
			
			if(coversStore == null)
			{
				coversStore = {
					"games" : new Array(),
					"bundles" : new Array()
				};
			}
			
			var coverMetaData = new Array();
			var list = coversStore.games;
			for(var i = 0; i < list.length; i++)
			{
				if(list[i].steamId == id)
				{
					coverMetaData.push(list[i]);
				}
			}
			
			if(Settings.get("showBundleCovers", true))
			{
				list = coversStore.bundles;
				for(var i = 0; i < list.length; i++)
				{
					var items = list[i].bundlItems;
					for(var j = 0; j < items.length; j++)
					{
						if(items[j] == id)
						{
							coverMetaData.push(list[i]);
						}
					}
				}
			}
			
			if(coverMetaData.length <= 0)
			{
				if(doAutoUpdate)
				{
					CoversManager.updateGames(coversStore, function(){ 
						chrome.storage.local.set({"coversStore": coversStore}, null);
						CoversManager.getCoversOfGame(id, false, callback);
					});
				}
				else
				{
					if(callback != null)
					{
						callback(new Array());
					}
				}
			}
			else
			{
				CoversManager.buildCoverArray(coverMetaData, null, null, callback);
			}
		});		
	}
	
	static buildCoverArray(coverMetaData, index, coverArray, callback)
	{
		if(index == null)
			index = 0;
		
		if(coverArray == null)
			coverArray = new Array();
			
		var request = new XMLHttpRequest();
		request.open("GET", "https://www.steamgamecovers.com/api/game/v1/alias="+coverMetaData[index].alias, true);
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status === 200) { 
					var data = JSON.parse(request.responseText).game[0].covers;
					
					var list = data.single_disc_labels;
					for(var j = 0; j < list.length; j++)
					{
						if(CoversManager.isLanguageActivated(list[j].language))
						{
							list[j].type = "single_disc_labels";
							list[j].metadata = coverMetaData[index];
							list[j] = CoversManager.convergeImgUrlToSsh(list[j]);
							coverArray.push(list[j]);
						}
					}
					
					list = data.multi_disc_labels;
					for(var j = 0; j < list.length; j++)
					{
						if(CoversManager.isLanguageActivated(list[j].language))
						{
							list[j].type = "multi_disc_labels";
							list[j].metadata = coverMetaData[index];
							list[j] = CoversManager.convergeImgUrlToSsh(list[j]);
							coverArray.push(list[j]);
						}
					}
					
					list = data.disc_case_covers;
					for(var j = 0; j < list.length; j++)
					{
						if(CoversManager.isLanguageActivated(list[j].language))
						{
							list[j].type = "disc_case_covers";
							list[j].metadata = coverMetaData[index];
							list[j] = CoversManager.convergeImgUrlToSsh(list[j]);
							coverArray.push(list[j]);
						}
					}
				}
				
				if(index >= coverMetaData.length-1)
				{
					if(callback != null)
					{
						callback(coverArray);
					}
				}
				else
				{
					index++;
					CoversManager.buildCoverArray(coverMetaData, index, coverArray, callback);
				}
			}
		};
		
		request.send(null);
	}
	
	static convergeImgUrlToSsh(cover)
	{
		cover.large_image = cover.large_image.replace("http://", "https://"); 
		cover.thumbnail = cover.thumbnail.replace("http://", "https://"); 
		return cover;
	}
	
	static isLanguageActivated(lang)
	{
		switch(lang)
		{
			case "English":
				return Settings.get("showEnglishCovers", true);
			case "Spanish":
				return Settings.get("showSpanishCovers", true);
			case "German":
				return Settings.get("showGermanCovers", true);
			case "Franch":
				return Settings.get("showFrenchCovers", true);
			case "Italian":
				return Settings.get("showItalianCovers", true);
		}
		return true;
	}
	
	static updateGames(coversStore, callback)
	{
		var request = new XMLHttpRequest();
		request.open("GET", "https://www.steamgamecovers.com/api/games/v1/", true);
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status === 200) { 
					var data = JSON.parse(request.responseText).games;
					var finCounter = coversStore.games.length + coversStore.bundles.length;
					
					if(finCounter == data.length && callback != null)
					{
						callback();
					}
					else
					{		
						for(var i = 0; i < data.length; i++)
						{
							if(!CoversManager.isCoverExistInArray(coversStore, data[i]))
							{
								CoversManager.addSteamData(data[i], function(item){
									
									if(item.steamType == "app")
									{
										coversStore.games.push(item);
									}
									else
									{
										coversStore.bundles.push(item);
									}
									finCounter++;
									
									if(finCounter == data.length && callback != null)
									{
										callback();
									}
								});
							}
						}
					}
				}
			}
		};
		request.send(null);
	}
	
	static addSteamData(item, callback)
	{
		var url = item.steam_url;
		var steamId = null;
		var steamType = null;
		
		var index = url.indexOf('.com/');
		if(index >= 0)
		{
			url = url.substring(index+5);
			
			index = url.indexOf('/');
			if(index >= 0)
			{
				steamType = url.substring(0, index);
				url = url.substring(index+1);
				
				index = url.indexOf('/');
				if(index >= 0)
				{
					url = url.substring(0, index);	
				}
				steamId = url;
			}
		}
		
		item.steamId = steamId;
		item.steamType = steamType;
		
		if(steamType == "app")
		{
			if(callback != null)
			{
				callback(item);
			}
		}
		else
		{
			CoversManager.addBundlItems(item, callback);
		}
	}
	
	static addBundlItems(item, callback)
	{
		item.bundlItems = new Array();
		
		if(item.steamType == "sub")
		{	
			var request = new XMLHttpRequest();
			request.open("GET", "https://store.steampowered.com/api/packagedetails?packageids="+item.steamId, true);
			request.onreadystatechange = function () {
				if (request.readyState === 4) {  
					if (request.status === 200) {  
						var obj = JSON.parse(request.responseText);
						obj = obj[Object.keys(obj)[0]]; // Springe in das erste Attribut
						
						if(obj.success)
						{
							for(var i = 0; i < obj.data.apps.length; i++)
							{
								item.bundlItems.push(obj.data.apps[i].id);
							}
						}
					}
					
					if(callback != null)
					{
						callback(item);
					}
				}
			};
			request.send(null);
		}
		else
		{
			if(callback != null)
			{
				callback(item);
			}
		}
		
	}
	
	static isCoverExistInArray(coversStore, cover)
	{
		var path = cover.url;
		var array = coversStore.bundles;
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].url == path)
			{
				return true;
			}
		}
		
		array = coversStore.games;
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].url == path)
			{
				return true;
			}
		}
		
		return false;
	}
	
}