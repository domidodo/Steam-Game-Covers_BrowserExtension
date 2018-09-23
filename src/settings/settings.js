
function init()
{
	var inputs = document.querySelectorAll("input[type='checkbox']");
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('click', function() {
			changeSetting(this.id, this.checked);
		});
	}
	
	
	document.getElementById("gamesTitle").innerHTML = TextPool.getString("Games");
	document.getElementById("bundleTitle").innerHTML = TextPool.getString("Bundle");
	document.getElementById("databaseTitle").innerHTML = TextPool.getString("Database");
	document.getElementById("BrowserCleanMessage").innerHTML = "("+TextPool.getString("BrowserCleanMessage")+")";
	document.getElementById("SettingsTitle").innerHTML = TextPool.getString("Settings");
	document.getElementById("showUploadButtonTitle").innerHTML = TextPool.getString("showUploadButtonTitle");
	document.getElementById("showUploadButtonText").innerHTML = TextPool.getString("showUploadButtonText");
	document.getElementById("showBundleCoversTitle").innerHTML = TextPool.getString("showBundleCoversTitle");
	document.getElementById("showBundleCoversText").innerHTML = TextPool.getString("showBundleCoversText");
	document.getElementById("showEnglishCoversTitle").innerHTML = TextPool.getString("showEnglishCoversTitle");
	document.getElementById("showEnglishCoversText").innerHTML = TextPool.getString("showEnglishCoversText");
	document.getElementById("showSpanishCoversTitle").innerHTML = TextPool.getString("showSpanishCoversTitle");
	document.getElementById("showSpanishCoversText").innerHTML = TextPool.getString("showSpanishCoversText");
	document.getElementById("showGermanCoversTitle").innerHTML = TextPool.getString("showGermanCoversTitle");
	document.getElementById("showGermanCoversText").innerHTML = TextPool.getString("showGermanCoversText");
	document.getElementById("showFrenchCoversTitle").innerHTML = TextPool.getString("showFrenchCoversTitle");
	document.getElementById("showFrenchCoversText").innerHTML = TextPool.getString("showFrenchCoversText");
	document.getElementById("showItalianCoversTitle").innerHTML = TextPool.getString("showItalianCoversTitle");
	document.getElementById("showItalianCoversText").innerHTML = TextPool.getString("showItalianCoversText");
	document.getElementById("translateDescriptionTitle").innerHTML = TextPool.getString("translateDescriptionTitle");
	document.getElementById("translateDescriptionText").innerHTML = TextPool.getString("translateDescriptionText");
	
	
	chrome.storage.local.get("coversSettings", function(result) {
		// Standardwert in der "installed/installed.js" festlegen
		
		var coversSettings = result.coversSettings;
		
		if(coversSettings.showUploadButton != null)
		{
			document.getElementById("showUploadButton").checked = coversSettings.showUploadButton;
		}
		if(coversSettings.showBundleCovers != null)
		{
			document.getElementById("showBundleCovers").checked = coversSettings.showBundleCovers;
		}
		if(coversSettings.showEnglishCovers != null)
		{
			document.getElementById("showEnglishCovers").checked = coversSettings.showEnglishCovers;
		}
		if(coversSettings.showSpanishCovers != null)
		{
			document.getElementById("showSpanishCovers").checked = coversSettings.showSpanishCovers;
		}
		if(coversSettings.showGermanCovers != null)
		{
			document.getElementById("showGermanCovers").checked = coversSettings.showGermanCovers;
		}
		if(coversSettings.showFrenchCovers != null)
		{
			document.getElementById("showFrenchCovers").checked = coversSettings.showFrenchCovers;
		}
		if(coversSettings.showItalianCovers != null)
		{
			document.getElementById("showItalianCovers").checked = coversSettings.showItalianCovers;
		}
		if(coversSettings.translateDescription != null)
		{
			document.getElementById("translateDescription").checked = coversSettings.translateDescription;
		}
	});
}

function start()
{
	var GamesTableHits = document.getElementById("GamesTableHits");
	var PackageTableHits = document.getElementById("PackageTableHits");
	
	chrome.storage.local.get("coversStore", function(result) {
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
		GamesTableHits.innerHTML = games.length + " "+TextPool.getString("Hits");
		
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
			
			if(bundles[i].steamId != null)
			{
				column1.innerHTML = "<a href='"+bundles[i].steam_url+"' alt='"+bundles[i].steam_url+"'>"+bundles[i].steamId+"</a>";
			}
			
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
		PackageTableHits.innerHTML = bundles.length + " "+TextPool.getString("Hits");
    });
}

function changeSetting(key, value)
{
	chrome.storage.local.get("coversSettings", function(result) {
		var coversSettings = result.coversSettings;
		if(coversSettings == null){
			coversSettings = {};
		}
		coversSettings[key] = value;
		chrome.storage.local.set({"coversSettings": coversSettings}, null);
	});
}


init();
start();