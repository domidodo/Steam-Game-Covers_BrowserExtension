class SteamScrollBarController {

	/*
	Variablen:
		panel
		sliederPanel
		sliederPanelPosX
		slieder
		buttonRight
		buttonLeft
		position
		moveEvent
		
	Events:
		onNotUsed
		onCompletion
	*/

	constructor(panel, onCompletion) {
		var me = this;
		me.panel = panel;
		me.position = 0;
		me.moveEvent = function(e){
			me.divMove(me, e);
		};
		me.onCompletion = onCompletion;
		
		window.addEventListener('mouseup', function() {
			window.removeEventListener('mousemove', me.moveEvent, true);
		}, false);
		
		setTimeout(function(){me.checkIfNotUsed(me);}, 500);
		setTimeout(function(){me.checkIfNotUsed(me);}, 1000);
		setTimeout(function(){me.checkIfNotUsed(me);}, 3000);
		setTimeout(function(){me.checkIfNotUsed(me);}, 6000);
		setTimeout(function(){me.checkIfNotUsed(me);}, 10000);
	}
	
	addSlieder(sliederPanel, slieder)
	{
		var me = this;
		me.sliederPanel = sliederPanel;
		me.slieder = slieder;
		
		me.sliederPanelPosX = 0;
		
		slieder.addEventListener('mousedown', function() {
			window.addEventListener('mousemove', me.moveEvent, true);
		}, false);
	}
	
	addButtonRight(btn)
	{
		var me = this;
		me.buttonRight = btn;
		
		btn.addEventListener("click", function(){
			me.onCklick(me, false);
		}); 
	}
	
	addButtonLeft(btn)
	{
		var me = this;
		me.buttonLeft = btn;
		
		btn.addEventListener("click", function(){
			me.onCklick(me, true);
		}); 
	}
	
	//-------------------------------------------------------------------------------------------------
	
	
	getPosition(el) {
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
	
	checkIfNotUsed(me)
	{
		if(me.onCompletion != null)
		{
			me.onCompletion(me.panel.clientWidth != me.panel.scrollWidth);
		}
	}

	divMove(me, e)
	{
		if(me.sliederPanelPosX == 0)
		{
			me.sliederPanelPosX = me.getPosition(me.sliederPanel).x;
		}
		
		var pos = (e.clientX - me.sliederPanelPosX - me.slieder.offsetWidth);
		me.scrollToPos(pos);
	}

	onCklick(me, isLeft)
	{
		
		if(isLeft)
		{
			var pos = me.position - me.slieder.offsetWidth - 10;
			me.scrollToPos(pos);
		}
		else
		{
			var pos = me.position + 10;
			me.scrollToPos(pos);
		}
	}

	scrollToPos(pos)
	{
		var me = this;
		
		var min = me.sliederPanel.offsetLeft - me.buttonLeft.offsetWidth;
		var max = min + me.sliederPanel.offsetWidth - me.slieder.offsetWidth;
		
		pos = pos + (me.slieder.offsetWidth/2);
		
		if(pos < min)
			pos = min;
		
		if(pos > max)
			pos = max;
		
		me.slieder.style.left =  pos + 'px';
		me.position = pos;
		
		var relativPos = (100/(max-min))*(pos-min);
		
		var maxScrollValue = me.panel.scrollWidth - me.panel.clientWidth;
		var scrollBarPos = (maxScrollValue/100) * relativPos;
		
		me.panel.scrollLeft = scrollBarPos;
	}

}