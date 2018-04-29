var steamcoverScrollPanel = null;
var steamcoverScrollBar = null;
var steamcoverScrollBtnLeft = null;
var steamcoverScrollBarSlider = null;
var steamcoverScrollCurrentScrillPos = 0;

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  
  return {
    x: xPos,
    y: yPos
  };
}

function createScrollBar(scrollPanel)
{
	steamcoverScrollPanel = scrollPanel;
	
	
	var scrollBar = document.createElement('div');
	scrollBar.id = "steamgamecoverScrollBar";
	scrollBar.className = "slider_ctn store_autoslider";
	
		var btnLeft  = document.createElement('div');
		btnLeft.className = "slider_left";
		btnLeft.innerHTML = "<span></span>";
		btnLeft.addEventListener("click", function(){
			onCklick(true);
		}); 
		steamcoverScrollBtnLeft = btnLeft;
		
		var btnRight  = document.createElement('div');
		btnRight.className = "slider_right";
		btnRight.addEventListener("click", function(){
			onCklick(false);
		});
		btnRight.innerHTML = "<span></span>";
		
		var sliederBackground  = document.createElement('div');
		sliederBackground.className = "slider_bg";
		
		var sliederPanel  = document.createElement('div');
		sliederPanel.className = "slider";
		steamcoverScrollBar = sliederPanel;
		
			var slieder  = document.createElement('div');
			slieder.className = "handle";
			slieder.style.position = "absolute";
			slieder.addEventListener('mousedown', function() {
				window.addEventListener('mousemove', divMove, true);
			}, false);
			steamcoverScrollBarSlider = slieder;
			
		sliederPanel.appendChild(slieder);
		
	scrollBar.appendChild(btnLeft);
	scrollBar.appendChild(btnRight);
	scrollBar.appendChild(sliederBackground);
	scrollBar.appendChild(sliederPanel);
		
		
	window.addEventListener('mouseup', function() {
		window.removeEventListener('mousemove', divMove, true);
	}, false);

	return scrollBar;
}

function updateScrollBar()
{
	var scrollPanel = document.getElementById("steamgamecover_block_content");
	if(scrollPanel != null)
	{
		var maxScrollValue = scrollPanel.scrollWidth - scrollPanel.clientWidth;
		if(maxScrollValue <= 0)
		{
			//document.getElementById("game_area_purchase").appendChild(crateSectionNode());
			var elem = document.getElementById("steamgamecoverScrollBar");
			if(elem !== null)
			{
				elem.parentNode.removeChild(elem);
			}
		}
	}
}

function divMove(e){
	var pos = (e.clientX-getPosition(steamcoverScrollBar).x-steamcoverScrollBarSlider.offsetWidth);
	scrollToPos(pos);
}

function onCklick(isLeft)
{
	if(isLeft)
	{
		var pos = steamcoverScrollCurrentScrillPos - steamcoverScrollBarSlider.offsetWidth - 10;
		scrollToPos(pos);
	}
	else
	{
		var pos = steamcoverScrollCurrentScrillPos + 10;
		scrollToPos(pos);
	}
}

function scrollToPos(pos)
{
	var min = steamcoverScrollBar.offsetLeft - steamcoverScrollBtnLeft.offsetWidth;
	var max = min + steamcoverScrollBar.offsetWidth - steamcoverScrollBarSlider.offsetWidth;
	
	pos = pos + (steamcoverScrollBarSlider.offsetWidth/2);
	
	if(pos < min)
		pos = min;
	
	if(pos > max)
		pos = max;
	
	steamcoverScrollBarSlider.style.left =  pos + 'px';
	steamcoverScrollCurrentScrillPos = pos;
	
	var relativPos = (100/(max-min))*(pos-min);
	
	var maxScrollValue = steamcoverScrollPanel.scrollWidth - steamcoverScrollPanel.clientWidth;
	var scrollBarPos = (maxScrollValue/100) * relativPos;
	
	steamcoverScrollPanel.scrollLeft = scrollBarPos;
}
