class TextPool {
	
	static init(){
		TextPool.Strings = {
			en : {
				CreatedBy : "Created by",
				Release : "Release",
				Downloads : "downloads",
				Description : "Description",
				Games : "Games",
				Bundle : "Bundle",
				Hits : "Hits",
				Database : "Database",
				BrowserCleanMessage : "The Browser will clear data stored where users clear their browsing history and data for privacy reasons.",
				Settings : "Settings",
				showUploadButtonTitle : "Show upload button",
				showUploadButtonText : "If no cover has been found for a particular game, a button will be displayed which will take the user to the upload page of SteamGameCovers.com.",
				showBundleCoversTitle : "Show Bundle-Cover",
				showBundleCoversText : "It also displays the covers of the bundles in which the current game is present.",
				showEnglishCoversTitle : "Show English-language covers",
				showEnglishCoversText : "Cover will be displayed in the English language.",
				showSpanishCoversTitle : "Show Spanish-language covers",
				showSpanishCoversText : "Cover will be displayed in the Spanish language.",
				showGermanCoversTitle : "Show German-language cover",
				showGermanCoversText : "Cover will be displayed in the German language.",
				showFrenchCoversTitle : "Show French-language cover",
				showFrenchCoversText : "Cover will be displayed in the French language.",
				showItalianCoversTitle : "Show Italian-language cover",
				showItalianCoversText : "Cover will be displayed in the Italian language.",
				translateDescriptionTitle : "Translate description",
				translateDescriptionText : "Automatically translate the description of the cover into the language used by Steam. (Google translate)",
				TranslatedByGoogle : "Translated by Google",
			},
			de : {
				CreatedBy : "Erstellt von",
				Release : "Erstellt am",
				Downloads : "downloads",
				Description : "Beschreibung",
				Games : "Spiele",
				Bundle : "Bündel",
				Hits : "Treffer",
				Database : "Datanbank",
				BrowserCleanMessage : "Der Browser wird die Daten entfernen sobald Sie die den Browser zurcksetzen.",
				Settings : "Einstellungen",
				showUploadButtonTitle : "Upload-Button anzeigen",
				showUploadButtonText : "Falls keine Cover für ein bestimmtes Spiel gefunden wurde, wird eine Schaltfläche angezeigt über welche der Nutzer auf die Upload-Seite von SteamGameCovers.com gelangt.",
				showBundleCoversTitle : "Bündel-Cover anzeigen",
				showBundleCoversText : "Es werden auch die Cover von den Bündeln angezeigt in welchen das derzeitige Spiel vorhanden ist.",
				showEnglishCoversTitle : "Englisch-sprachige Cover anzeigen",
				showEnglishCoversText : "Es werden Cover in der englischen Sprache angezeigt.",
				showSpanishCoversTitle : "Spanisch-sprachige Cover anzeigen",
				showSpanishCoversText : "Es werden Cover in der spanischen Sprache angezeigt.",
				showGermanCoversTitle : "Deutsch-sprachige Cover anzeigen",
				showGermanCoversText : "Es werden Cover in der deutschen Sprache angezeigt.",
				showFrenchCoversTitle : "Französisch-sprachige Cover anzeigen",
				showFrenchCoversText : "Es werden Cover in der französischen Sprache angezeigt.",
				showItalianCoversTitle : "Italienisch-sprachige Cover anzeigen",
				showItalianCoversText : "Es werden Cover in der italienischen Sprache angezeigt.",
				translateDescriptionTitle : "Beschreibung übersetzen",
				translateDescriptionText : "Übersetze die Beschreibung vom Cover automatisch in die von Steam verwendete Sprache. (Google translate)",
				TranslatedByGoogle : "Übersetzt von Google",
			}
		}
	}
	
	static getString(key)
	{
		if(TextPool.Strings == null)
		{
			TextPool.init();
		}
		var lang = TextPool.getLanguageCode();
		
		if(TextPool.Strings[lang] == null)
			lang = "en";
		
		var value = TextPool.Strings[lang][key];
		if(value == null || typeof value == "undefined")
		{
			return "<b>[Error, Key '"+key+"' not found in '"+lang+"'] </b>";
		}
		return value;
	}
	
	static getLanguageCode()
	{
		if(TextPool.lang == null)
		{
			TextPool.lang = document.documentElement.lang;
			if(TextPool.lang == null || TextPool.lang == "")
			{
				TextPool.lang = window.navigator.language;
			}
		}
		return TextPool.lang;
	}
	
	static getLanguageFormCode()
	{
		switch(TextPool.getLanguageCode())
		{
			case "de":
				return "de-DE";
		}
		return "en-US";
	}
	
	static translate(sourceText, sourceLang, targetLang, callback, tag) {
		if (sourceText == null){
			sourceText = "";
		}
	  
		sourceText = TextPool.decodeHTMLEntities(sourceText);
		
		if (sourceLang == null){
			sourceLang = "auto";
		}
	 
		if (targetLang== null){
			targetLang = TextPool.getLanguageCode();
		}
	  
		var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status === 200) { 
					var data = JSON.parse(request.responseText);
					var translation = data[0][0][0];
					
					if(callback != null)
						callback(translation, tag);
				}
			}
		};
		request.send(null);
	}
	
	static decodeHTMLEntities(text) {
		var entities = [
			['amp', '&'],
			['apos', '\''],
			['#x27', '\''],
			['#x2F', '/'],
			['#39', '\''],
			['#47', '/'],
			['lt', '<'],
			['gt', '>'],
			['nbsp', ' '],
			['quot', '"']
		];

		for (var i = 0, max = entities.length; i < max; ++i) 
			text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

		return text;
	}
}