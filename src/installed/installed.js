browser.runtime.onInstalled.addListener(function (object) {
    browser.tabs.create({url: "https://bitbucket.org/domidodo/steam-game-covers-add-on/wiki/Sync"}, null);
});