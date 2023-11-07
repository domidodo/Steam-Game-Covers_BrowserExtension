class Settings {
	
	static init()
	{
		Settings.AppSettings = {};
		chrome.storage.local.get("coversSettings", function(result) {
			Settings.AppSettings.coversSettings = result.coversSettings;
		});
		
	}
	
	static get(key, defaultValue)
	{
		if(Settings.AppSettings.coversSettings != null){
			var value = Settings.AppSettings.coversSettings[key];
			if(value != null)
				return value;
		}
		return defaultValue;
	}
	
}