class Settings {
	
	static init()
	{
		browser.storage.local.get("coversSettings", function(result) {
			Settings.coversSettings = result.coversSettings;
			if(Settings.coversSettings != null){
				var value = Settings.coversSettings[key];
				if(value != null)
					return value;
			}
		});
	}
	
	static get(key, defaultValue)
	{
		if(Settings.coversSettings != null){
			var value = Settings.coversSettings[key];
			if(value != null)
				return value;
		}
		return defaultValue;
	}
	
}