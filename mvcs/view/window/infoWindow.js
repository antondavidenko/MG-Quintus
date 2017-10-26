var InfoWindow = function() 
{
	var _text;
	var _bg;
	var _logo;
	
	this._msgWin = "CONGRATULATION!\n\nYou win!\nRESTART - try this level again\nLEVELS - chose another";
	this._msgLose = "You lost!\n\nRESTART - try this level again\nLEVELS - chose another";
	
	this._show = true;

	this.drawWindow = function()
	{
		_text = gameView.createText(" ", 275*gameModel.scaleFactor, 330*gameModel.scaleFactor, gameView.zWindowText);
		_bg = gameView.createSprite("window_small.png", 272*gameModel.scaleFactor, 400*gameModel.scaleFactor, gameView.zWindow);
		_logo = gameView.createSprite("logo.png", 272*gameModel.scaleFactor, 150*gameModel.scaleFactor, gameView.zWindowText);
		_logo.p.scale = _logo.p.scale*0.8;
	}
	
	this.showWindow = function(setMsg)
	{
		_text.p.label = setMsg;
		_bg.p.x = 272*gameModel.scaleFactor;
		_text.p.x = 270*gameModel.scaleFactor;
		_logo.p.x = 272*gameModel.scaleFactor;				
	
		this._show = true;
	}
	
	this.hideWindow = function()
	{
		_bg.p.x = -5000;
		_text.p.x = -5000;
		_logo.p.x = -5000;

		this._show = false;
	}	
}