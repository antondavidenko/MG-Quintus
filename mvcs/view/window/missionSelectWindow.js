var MissionSelectWindow = function() 
{
	var _bg;
	var _btn1;	
	var _btn2;	
	var _btn3;	
	var _btn4;	
	var _btn5;
	
	this._show = true;

	this.drawWindow = function()
	{
		_btn1 = gameView.createButton("LEVEL 1", 290, 170, this.touchOnLevel1, gameView.zWindowButton, gameView.zWindowText);
		_btn2 = gameView.createButton("LEVEL 2", 290, 170+65, this.touchOnLevel2, gameView.zWindowButton, gameView.zWindowText);
		_btn3 = gameView.createButton("LEVEL 3", 290, 170+65*2, this.touchOnLevel3, gameView.zWindowButton, gameView.zWindowText);
		_btn4 = gameView.createButton("LEVEL 4", 290, 170+65*3, this.touchOnLevel4, gameView.zWindowButton, gameView.zWindowText);
		_btn5 = gameView.createButton("LEVEL 5", 290, 170+65*4, this.touchOnLevel5, gameView.zWindowButton, gameView.zWindowText);
		_bg = gameView.createSprite("window.png", 272, 300, gameView.zWindow);
	}

	this.touchOnLevel1 = function()
	{
		gameView._currentLvlid = 0;
		gameView.touchOnReset();
	}

	this.touchOnLevel2 = function()
	{
		gameView._currentLvlid = 1;
		gameView.touchOnReset();
	}

	this.touchOnLevel3 = function()
	{
		gameView._currentLvlid = 2;
		gameView.touchOnReset();
	}
	
	this.touchOnLevel4 = function()
	{
		gameView._currentLvlid = 3;
		gameView.touchOnReset();
	}
	
	this.touchOnLevel5 = function()
	{
		gameView._currentLvlid = 4;
		gameView.touchOnReset();
	}
	
	this.showWindow = function()
	{
	/*
		_bg.show();
		_btn1.button.show();
		_btn1.text.show();	
		_btn2.button.show();
		_btn2.text.show();			
		_btn3.button.show();
		_btn3.text.show();	
		_btn4.button.show();
		_btn4.text.show();			
		_btn5.button.show();
		_btn5.text.show();
	*/	
		_bg.p.x = 272*gameModel.scaleFactor;
		_btn1.button.p.x = 290*gameModel.scaleFactor;
		_btn1.text.p.x = 290*gameModel.scaleFactor;
		_btn2.button.p.x = 290*gameModel.scaleFactor;
		_btn2.text.p.x = 290*gameModel.scaleFactor;		
		_btn3.button.p.x = 290*gameModel.scaleFactor;
		_btn3.text.p.x = 290*gameModel.scaleFactor;
		_btn4.button.p.x = 290*gameModel.scaleFactor;
		_btn4.text.p.x = 290*gameModel.scaleFactor;	
		_btn5.button.p.x = 290*gameModel.scaleFactor;
		_btn5.text.p.x = 290*gameModel.scaleFactor;
	
		this._show = true;
	}
	
	this.hideWindow = function()
	{
		_bg.p.x = -5000;
		_btn1.button.p.x = -5000;
		_btn1.text.p.x = -5000;
		_btn2.button.p.x = -5000;
		_btn2.text.p.x = -5000;		
		_btn3.button.p.x = -5000;
		_btn3.text.p.x = -5000;
		_btn4.button.p.x = -5000;
		_btn4.text.p.x = -5000;	
		_btn5.button.p.x = -5000;
		_btn5.text.p.x = -5000;	
	/*
		_bg.hide();
		_btn1.button.hide();
		_btn1.text.hide();	
		_btn2.button.hide();
		_btn2.text.hide();			
		_btn3.button.hide();
		_btn3.text.hide();	
		_btn4.button.hide();
		_btn4.text.hide();			
		_btn5.button.hide();
		_btn5.text.hide();
		*/
		this._show = false;
	}
}