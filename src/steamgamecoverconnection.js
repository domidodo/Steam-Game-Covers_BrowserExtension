// https://developer.chrome.com/apps/storage
/*
function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  //alert("Could not create HTTP request object.");
}
*/
function updateGameData(doneCallback)
{
	//var GameStorage = window.localStorage.getItem("game");
	var stateBar = document.getElementById("MappingSteamGameCoverProgressBar");
	if(stateBar == null)
	{
		stateBar = document.createElement('div');
		stateBar.id = "MappingSteamGameCoverProgressBar";
		stateBar.setAttribute("style", " position: fixed; left: 0px; top: 0px; z-index: 999999; padding:5px; background-color: coral; color: black;"); 
		stateBar.innerHTML = "Updating Steam-Game-Covers...";
		stateBar.style.display = "none";
		document.getElementById("game_area_purchase").appendChild(stateBar);
	}

	browser.storage.local.get("game", function(result) {
		var gameStorage = result.game;
		
		if(gameStorage == null)
			gameStorage = new Array();
		
		
		var request = new XMLHttpRequest();
		request.open("GET", "http://www.steamgamecovers.com/browse.php", true);
		request.onreadystatechange = function () {
			
			if (request.readyState === 4) {
				if (request.status === 200) { 
				
					var htmlDoc = request.responseText;
					
					htmlDoc = htmlDoc.substring(htmlDoc.indexOf('<div class="gameList" style="float:left;">'));
					htmlDoc = htmlDoc.substring(0, htmlDoc.indexOf('<!-- End content -->'));
					htmlDoc = htmlDoc.substring(0, htmlDoc.lastIndexOf('</div>'));
					htmlDoc = htmlDoc.replace(/&nbsp;/g, '');
					htmlDoc = htmlDoc.replace(/<br\s*\/?>/gi,'');
					htmlDoc = htmlDoc.replace(/(<img.+?src=)(["\']?)([^\'"]+?)([^\/]+)(\2.*?\/?>)/gi,'SteamGameCoverSplitPosForFFEdonQWERGRTQB');
					
					var items = htmlDoc.split('SteamGameCoverSplitPosForFFEdonQWERGRTQB');
					var progress = 1;
					for(var i = 0; i < items.length; i++)
					{
						var itemString = items[i];
						
						
						var startUrlIndex = itemString.indexOf("href=")+6;
						if(startUrlIndex > 5)
						{
							var item = {
								"steamType" : null,
								"steamId" : null,
								"blebundlItems" : null,
								"name" : null,
								"path" : null,
								"count" : null
							};
							
							
							itemString = itemString.substring(startUrlIndex);
							var endUrlIndex = itemString.indexOf('"');
							if(endUrlIndex >= 0)
							{
								item.path = itemString.substring(0, endUrlIndex);
								
								if(gameStorage.findIndex(x => x.path === item.path) < 0)
								{	
									//Name ermitteln
									itemString = itemString.substring(endUrlIndex);
									
									var startNameIndex = itemString.indexOf('>');
									if(startNameIndex >= 0)
									{
										itemString = itemString.substring(startNameIndex+1);
										
										var endNameIndex = itemString.indexOf('</a>');
										if(endNameIndex >= 0)
										{
											item.name = itemString.substring(0, endNameIndex);
											
											addSteamIdToGameStorageItem(item, function(newItem){
												gameStorage.push(newItem);
												browser.storage.local.set({game: gameStorage}, null);
												
												updateStateBar(stateBar, progress++, items.length, doneCallback);
											});
										}
										else
										{
											updateStateBar(stateBar, progress++, items.length, doneCallback);
										}
									}
									else
									{
										updateStateBar(stateBar, progress++, items.length, doneCallback);
									}
								}
								else
								{
									updateStateBar(stateBar, progress++, items.length, doneCallback);
								}
							}
							else
							{
								updateStateBar(stateBar, progress++, items.length, doneCallback);
							}
						}
						else
						{
							updateStateBar(stateBar, progress++, items.length, doneCallback);
						}
					}
					
					if(items.length == 0)
					{
						updateStateBar(stateBar, progress, items.length, doneCallback);
					}
					
				} else {  
					//alert("Error: (" + request.status +") "+request.statusText);			   
				} 			
			}
			else
			{
				//alert("Error: request.readyState: "+request.readyState);
			}
			
		};
		
		request.send(null);
		
	});
}

function updateStateBar(stateBar, progress, max, doneCallback)
{
	stateBar.style.display = "block";
	stateBar.innerHTML = "Updating Steam-Game-Covers... ("+progress+ " / " +max+ ")";
	if(progress >= max)
	{
		document.getElementById("game_area_purchase").removeChild(stateBar);
		
		if(doneCallback != null)
			doneCallback();
	}
}

function addSteamIdToGameStorageItem(item, callback)
{
	var request = new XMLHttpRequest();
	request.open("GET", "http://steamgamecovers.com/"+item.path, true);
	
	request.onload = function () {
		if (request.status === 200) { 
			var htmlDoc = request.responseText;
			
			var startIndex = htmlDoc.indexOf('steampowered.com/app/');
			if(startIndex >= 0)
			{
				startIndex = startIndex + 21;
				item.steamType = "app";
			}
			else
			{
				startIndex = htmlDoc.indexOf('steamcommunity.com/app/');
				if(startIndex >= 0)
				{
					startIndex = startIndex + 23;
					item.steamType = "app";
				}
			}
			
			if(startIndex < 0)
			{
				startIndex = htmlDoc.indexOf('steampowered.com/sub/');
				if(startIndex >= 0)
				{
					startIndex = startIndex + 21;
					item.steamType = "sub";
				}
				else
				{
					startIndex = htmlDoc.indexOf('steamcommunity.com/sub/');
					if(startIndex >= 0)
					{
						startIndex = startIndex + 23;
						item.steamType = "sub";
					}
				}
			}
			
			if(startIndex < 0)
			{
				startIndex = htmlDoc.indexOf('steampowered.com/bundle/');
				if(startIndex >= 0)
				{
					startIndex = startIndex + 24;
					item.steamType = "bundle";
				}
				else
				{
					startIndex = htmlDoc.indexOf('steamcommunity.com/bundle/');
					if(startIndex >= 0)
					{
						startIndex = startIndex + 26;
						item.steamType = "bundle";
					}
				}
			}
			
			
			if(startIndex >= 0)
			{
				htmlDoc = htmlDoc.substring(startIndex);
				
				var endIndex = htmlDoc.indexOf('/');
				
				var posibleEndIndex = htmlDoc.indexOf('"');
				if(posibleEndIndex >= 0 && endIndex > posibleEndIndex)
				{
					endIndex = posibleEndIndex;
				}
				
				posibleEndIndex = htmlDoc.indexOf("'");
				if(posibleEndIndex >= 0 && endIndex > posibleEndIndex)
				{
					endIndex = posibleEndIndex;
				}
				
				item.steamId = htmlDoc.substring(0, endIndex);
				
				if(item.steamType == "sub")
				{
					addBlebundlItems(item);
				}
			}
			
		}else { 
		   //alert("Error: (" + request.status +") "+request.statusText);  
		}

		if(callback != null){
			callback(item);
		}   
	};
	request.onerror = function () {
		//alert("Error: (" + request.status +") "+request.statusText);  
	};
	request.send(null);
}

function addBlebundlItems(item, SubId)
{
	var request = new XMLHttpRequest();
	request.open("GET", "https://store.steampowered.com/api/packagedetails?packageids="+item.steamId, false);
	request.send();
	if (request.readyState === 4) {  
		if (request.status === 200) {  
			var obj = JSON.parse(request.responseText);
			obj = obj[Object.keys(obj)[0]]; // Springe in das erste Attribut
			
			if(obj.success)
			{
				item.blebundlItems = new Array();
				for(var i = 0; i < obj.data.apps.length; i++)
				{
					item.blebundlItems.push(obj.data.apps[i].id);
				}
			}
		}
	}
	
}

function getCoverArray(callback, firstTry)
{
	browser.storage.local.get("game", function(result) {
		
		var gameStorage = result.game;
		var dataArray = [];
	
		if(gameStorage == null)
		{
			updateGameData(function(){getCoverArray(callback, true)});
			return 0;
		}
	
		var steamId = getGameIdFromUrl(window.location.href);
		
		var gameStorageItemIndexArray = new Array();
		var isMainGameFind = false;
		for(var i = 0; i < gameStorage.length; i++)
		{
			if(gameStorage[i].steamId == steamId && gameStorage[i].steamType == "app")
			{
				gameStorageItemIndexArray.push(i);
				isMainGameFind = true;
			}
			
			if(gameStorage[i].steamType == "sub" && gameStorage[i].blebundlItems != null)
			{
				for(var j = 0; j < gameStorage[i].blebundlItems.length; j++)
				{
					if(gameStorage[i].blebundlItems[j] == steamId)
					{
						gameStorageItemIndexArray.push(i);
					}
				}
			}
		}
		
		var gameStorageItemIndex = gameStorage.findIndex(x => x.steamId === steamId);
		if(!isMainGameFind && firstTry)
		{
			updateGameData(function(){getCoverArray(callback, false)});
				return 0;
		}
		
		if(gameStorageItemIndexArray.length <= 0)
		{
			if(callback != null)
				callback(dataArray);
			return 0;
		}
		
		for(var x = 0; x < gameStorageItemIndexArray.length; x++)
		{
			var request = new XMLHttpRequest();
			request.open("GET", "http://www.steamgamecovers.com/"+gameStorage[gameStorageItemIndexArray[x]].path, false);
			request.send();
			if (request.readyState === 4) {  
				if (request.status === 200) {  
					var htmlDoc = request.responseText;
					
					var tmp = "";
					while(htmlDoc.indexOf('<table') >= 0)
					{
						htmlDoc = htmlDoc.substring(htmlDoc.indexOf('<table')+6);
						tmp += htmlDoc.substring(0, htmlDoc.indexOf('</table>')); 
						
					}
					htmlDoc = tmp;
					
					//htmlDoc = htmlDoc.substring(htmlDoc.indexOf('<table'));
					//var tmpTbl1 = htmlDoc.substring(0, htmlDoc.indexOf('</table>')); 
					//htmlDoc = htmlDoc.substring(htmlDoc.indexOf('</table>')+8);
					//htmlDoc = htmlDoc.substring(htmlDoc.indexOf('<table')+6);
					//htmlDoc = tmpTbl1 + htmlDoc.substring(0, htmlDoc.indexOf('</table>')+8);
					htmlDoc = htmlDoc.replace(/(<td>&nbsp;<\/td>)/g, '');
					
					var items = htmlDoc.split('<td');
					var progress = 1;
					for(var i = 0; i < items.length; i++)
					{
						var itemString = items[i];
						
						var startUrlIndex = itemString.indexOf('href=');
						if(startUrlIndex >= 0)
						{
							var item = {
								'url': null,
								'image': null,
								'downloads': null,
								'ranking': null,
								'artist' : null
							};
							
							itemString = itemString.substring(startUrlIndex+6);
							var endUrlIndex = itemString.indexOf('>');
							
							item.url = "http://www.steamgamecovers.com"+itemString.substring(0, endUrlIndex-1);
							
							itemString = itemString.substring(endUrlIndex);
							
							var startImageIndex = itemString.indexOf('thumbs/');
							if(startImageIndex >= 0)
							{
								itemString = itemString.substring(startImageIndex+7);
								var endImageIndex = itemString.indexOf('"');
								
								item.image = "http://images.steamgamecovers.com/large/"+itemString.substring(0, endImageIndex);
								
								itemString = itemString.substring(endImageIndex);
								
								// Ranking
								
								var endRankingIndex = itemString.indexOf("star.jpg");
								if(endRankingIndex >= 0)
								{
									itemString = itemString.substring(endRankingIndex-3);
									var startRankingIndex = itemString.indexOf("/");
									
									if(startRankingIndex >= 0)
									{
										itemString = itemString.substring(startRankingIndex+1);
										endRankingIndex = itemString.indexOf("star.jpg");
										item.ranking = itemString.substring(0, endRankingIndex+4)
										
										var startArtistIndex = itemString.indexOf("Created");
										if(startArtistIndex >= 0)
										{
											itemString = itemString.substring(startArtistIndex);
											startArtistIndex = itemString.indexOf(">");
											
											if(startArtistIndex >= 0)
											{
												itemString = itemString.substring(startArtistIndex+1);
											
												var endArtistIndex = itemString.indexOf("<");
												if(endArtistIndex >= 0)
												{
													item.artist = itemString.substring(0, endArtistIndex);
													dataArray.push(item);
												}
											}
										}
									}
								}
							}	
						}
					}
				}
			}
		}
		if(callback != null)
			callback(dataArray);
	});
}

function getGameIdFromUrl(url)
{
	if(url.indexOf('store.steampowered.com/app/') >= 0)
	{
		url = url.substring(url.indexOf('/app/')+5);
		url = url.substring(0, url.indexOf('/'));
	}
	return url;
}