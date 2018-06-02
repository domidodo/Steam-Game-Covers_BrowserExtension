
function start()
{
	var GamesTableHits = document.getElementById("GamesTableHits");
	var PackageTableHits = document.getElementById("PackageTableHits");
	
	browser.storage.local.get("coversStore", function(result) {
		var coversStore = result.coversStore;
		
		var games = coversStore.games;
		var bundles = coversStore.bundles;
		
		games.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} );
		bundles.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} );
		
		
		var gameTable = document.getElementById("GamesTable").childNodes[3];
		for(var i = 0; i < games.length; i++)
		{
			var row = document.createElement('tr');
			
			var column1 = document.createElement('td');
			var column2 = document.createElement('td');
			var column3 = document.createElement('td');
			
			column1.innerHTML = "<a href='"+games[i].steam_url+"' alt='"+games[i].steam_url+"'>"+games[i].steamId+"</a>";
			column2.innerHTML = games[i].name;
			column3.innerHTML = "<a href='"+games[i].url+"' alt='"+games[i].url+"'>"+games[i].alias+"</a>";
			
			row.appendChild(column1);
			row.appendChild(column2);
			row.appendChild(column3);
			
			gameTable.appendChild(row);
		}
		GamesTableHits.innerHTML = games.length + " Hits";
		
		var packageTable = document.getElementById("PackageTable").childNodes[3];
		for(var i = 0; i < bundles.length; i++)
		{
			var row = document.createElement('tr');
			
			var bundlItems = bundles[i].bundlItems;
			if(bundlItems.length <= 0 || bundles[i].steamId == "null")
			{
				row.style.color = "red";
			}
			
			var column1 = document.createElement('td');
			var column2 = document.createElement('td');
			var column3 = document.createElement('td');
			var column4 = document.createElement('td');
			
			column1.innerHTML = "<a href='"+bundles[i].steam_url+"' alt='"+bundles[i].steam_url+"'>"+bundles[i].steamId+"</a>";
			for(var j = 0; j < bundlItems.length; j++)
			{
				column2.innerHTML += "<a href='https://store.steampowered.com/app/"+bundlItems[j]+"' alt='"+bundlItems[j]+"'>"+bundlItems[j]+"</a> ";
			}
			column3.innerHTML = bundles[i].name;
			column4.innerHTML = "<a href='"+bundles[i].url+"' alt='"+bundles[i].url+"'>"+bundles[i].alias+"</a>";
			
			row.appendChild(column1);
			row.appendChild(column2);
			row.appendChild(column3);
			row.appendChild(column4);
			
			packageTable.appendChild(row);
		}
		PackageTableHits.innerHTML = bundles.length + " Hits";
    });
}

function cleanCache(e){
	
}

start();