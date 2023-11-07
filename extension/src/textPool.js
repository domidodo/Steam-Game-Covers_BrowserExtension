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
				Information : "Information",
				Here: "Here",
				Version: "Version",
				Author: "Author",
				Help: "Help",
				Website: "Website",
				ReportError: "Report an error",
				Donation: "Donation",
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
				Information : "Informationen",
				Here: "Hier",
				Version: "Version",
				Author: "Author",
				Help: "Hilfe",
				Website: "Webseite",
				ReportError: "Fehler melden",
				Donation: "Spenden",
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
			},
			sp : {
				CreatedBy : "Creado por",
				Release : "Creado en",
				Downloads : "descargas",
				Description : "Descripción",
				Games : "Juegos",
				Bundle : "Haz",
				Information : "Información",
				Here: "Aquí",
				Version: "Versión",
				Author: "Autor",
				Help: "Ayuda",
				Website: "Aitio web",
				ReportError: "Informar errores",
				Donation: "Donar",
				Hits : "Golpe",
				Database : "Base de datos",
				BrowserCleanMessage : "El navegador eliminará los datos tan pronto como reinicie el navegador.",
				Settings : "Ajustes",
				showUploadButtonTitle : "Mostrar botón de carga",
				showUploadButtonText : "Si no se encuentra una cubierta para un juego específico, se muestra un botón a través del cual el usuario puede acceder a la página de carga de SteamGameCovers.com.",
				showBundleCoversTitle : "Mostrar cubierta de paquete",
				showBundleCoversText : "También muestra las portadas de los paquetes en los que está disponible el juego actual.",
				showEnglishCoversTitle : "Mostrar portadas en inglés",
				showEnglishCoversText : "Las cubiertas se muestran en inglés.",
				showSpanishCoversTitle : "Mostrar portadas en español",
				showSpanishCoversText : "Las cubiertas se muestran en español.",
				showGermanCoversTitle : "Mostrar portadas en alemán",
				showGermanCoversText : "Las cubiertas se muestran en alemán.",
				showFrenchCoversTitle : "Mostrar portadas en francés",
				showFrenchCoversText : "Las cubiertas se muestran en francés.",
				showItalianCoversTitle : "Mostrar portadas en italiano",
				showItalianCoversText : "Las cubiertas se muestran en el idioma italiano.",
				translateDescriptionTitle : "Traducir descripción",
				translateDescriptionText : "Traduce automáticamente la descripción de la portada al lenguaje utilizado por Steam. (Google translate)",
				TranslatedByGoogle : "Traducido por Google",
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
				TextPool.lang = window.navigator.language.substring(0, 2);
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