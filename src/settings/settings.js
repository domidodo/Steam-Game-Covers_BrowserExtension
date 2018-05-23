

function start()
{
	//var GameStorage = window.localStorage.getItem("game");
	
	chrome.storage.local.get("game", function(result) {
		
		var GameStorage = result.game;
		
		GameStorage.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} );
		
		var gameTable = document.getElementById("GamesTable").childNodes[3];
		var gameTableCount = 0;
		var packageTable = document.getElementById("PackageTable").childNodes[3];
		var packageTableCount = 0;
		
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
			var column4 = document.createElement('td');
			
			if(GameStorage[i].steamId != "" && GameStorage[i].steamId != null)
			{
				column1.innerHTML = "<a href='https://store.steampowered.com/"+GameStorage[i].steamType+"/"+GameStorage[i].steamId+"' alt='"+GameStorage[i].steamId+"'>"+GameStorage[i].steamId+"</a>";
			}
			column2.innerHTML = "";
			if(GameStorage[i].steamType == "sub")
			{
				var Items = GameStorage[i].blebundlItems;
				if(Items != null)
				{
					for(var j = 0; j < Items.length; j++)
					{
						column2.innerHTML += "<a href='https://store.steampowered.com/app/"+Items[j]+"' alt='"+Items[j]+"'>"+Items[j]+"</a> ";
					}
				}
				else
				{
					row.style.color = "red";
				}
			}
			column3.innerHTML = GameStorage[i].name;
			column4.innerHTML = "<a href='http://steamgamecovers.com/"+GameStorage[i].path+"' alt='"+GameStorage[i].path+"'>"+GameStorage[i].path+"</a>";
			
			row.appendChild(column1);
			if(GameStorage[i].steamType != "app")
			{
				row.appendChild(column2);
			}
			row.appendChild(column3);
			row.appendChild(column4);
			
			if(GameStorage[i].steamType == "app")
			{
				gameTable.appendChild(row);
				gameTableCount++;
			}
			else
			{
				packageTable.appendChild(row);
				packageTableCount++;
			}
		}
		GamesTableHits.innerHTML = gameTableCount + " Hits";
		PackageTableHits.innerHTML = packageTableCount + " Hits";
    });
}

function cleanCache(e){
	
	//alert("btnCleanCache");
	
}



start();
//document.getElementById("btnCleanCache").addEventListener("click", cleanCache());