

function start()
{
	//var GameStorage = window.localStorage.getItem("game");
	
	chrome.storage.local.get("game", function(result) {
		
		var GameStorage = result.game;
		
		var table = document.getElementById("cacheGamesTable").childNodes[3];
		
		for(var i = 0; i < GameStorage.length; i++)
		{
			var row = document.createElement('tr');
			
			if(GameStorage[i].steamId == "" || GameStorage[i].steamId == null)
			{
				row.style.color = "red";
			}
			
			var column1 = document.createElement('td');
			var column2 = document.createElement('td');
			var column3 = document.createElement('td');
			
			if(GameStorage[i].steamId != "" && GameStorage[i].steamId != null)
			{
				column1.innerHTML = "<a href='https://store.steampowered.com/app/"+GameStorage[i].steamId+"' alt='"+GameStorage[i].steamId+"'>"+GameStorage[i].steamId+"</a>";
			}
			column2.innerHTML = GameStorage[i].name;
			column3.innerHTML = "<a href='http://steamgamecovers.com/"+GameStorage[i].path+"' alt='"+GameStorage[i].path+"'>"+GameStorage[i].path+"</a>";
			
			row.appendChild(column1);
			row.appendChild(column2);
			row.appendChild(column3);
			
			table.appendChild(row);
		}
		cacheGamesTableHits.innerHTML = GameStorage.length+" Hits";
    });
}

function cleanCache(e){
	
	//alert("btnCleanCache");
	
}



start();
//document.getElementById("btnCleanCache").addEventListener("click", cleanCache());