chrome.runtime.onInstalled.addListener(function (object) {
	
	chrome.storage.local.get("coversSettings", function(result) {
		var coversSettings = result.coversSettings;
		
		if(coversSettings == null){
			coversSettings = {};
		}
		
		chrome.storage.local.clear();
		
		
		if(coversSettings.showUploadButton == null)
		{
			coversSettings.showUploadButton = false;
		}
		if(coversSettings.showBundleCovers == null)
		{
			coversSettings.showBundleCovers = true;
		}
		if(coversSettings.showEnglishCovers == null)
		{
			coversSettings.showEnglishCovers = true;
		}
		if(coversSettings.showSpanishCovers == null)
		{
			coversSettings.showSpanishCovers = true;
		}
		if(coversSettings.showGermanCovers == null)
		{
			coversSettings.showGermanCovers = true;
		}
		if(coversSettings.showFrenchCovers == null)
		{
			coversSettings.showFrenchCovers = true;
		}
		if(coversSettings.showItalianCovers == null)
		{
			coversSettings.showItalianCovers = true;
		}
		if(coversSettings.translateDescription == null)
		{
			coversSettings.translateDescription = true;
		}
		
		chrome.storage.local.set({"coversSettings": coversSettings}, null);
	});
	
    //chrome.tabs.create({url: "https://bitbucket.org/domidodo/steam-game-covers-add-on/wiki/Sync"}, null);
});