var GameView = function() 
{
	this.zInfopanel = 1;
	this.zHud = 2; // icons and unit descriptions
	this.zHudButtons = 3;
	this.zHudButtonsText = 4;

	this.zField = 5;
	this.zFieldLightWhite = 6;	
	this.zFieldLightRed = 7;		
	this.zFieldUnits = 8;
	
	this.zWindow = 9;
	this.zWindowButton = 10;
	this.zWindowText = 11;

	var movie_counter = 0;
	var movie_interval;
	var movie_len = 8;
	var _stage;
	var Q;
	
	var _hit_it;
	
	var _animationIndex = 0;
	var _nextState;
	
	var _blinkInterval;
	var _blinkCounter = 0;

	this._tileManager = new TileManager();	
	
	this._hudView = new HudView();
	
	var _missionSelectWindow = new MissionSelectWindow();
	this._infoWindow = new InfoWindow();
	
	this._currentLvlid = 0;

	this.createSprite = function(asset, x, y, z)
	{
		var sprite = new Q.Sprite({ asset: asset, x:Math.round(x*gameModel.scaleFactor), y:Math.round(y*gameModel.scaleFactor), scale:gameModel.scaleFactor, z:z});
		_stage.insert(sprite);	
		return sprite;
	}	
	
	this.createText = function(label, x, y, z)
	{
		var text = new Q.UI.Text({ 
		label: label,
		color: "black",
		weight : "700",
		size: 18*gameModel.scaleFactor,
		align: 'center',
		x: x*gameModel.scaleFactor,
		y: (y-10)*gameModel.scaleFactor,
		z: z
		});
		_stage.insert(text);
		
		return text;
	}
	
	this.createButton = function(label, x, y, setCallback, zImage, zText)
	{
		var button = new Q.UiButton({ x:x*gameModel.scaleFactor, y:y*gameModel.scaleFactor, scale:gameModel.scaleFactor, z:zImage, callback:setCallback});
		button.p.asset="button.png";
		_stage.insert(button);	
		
		var text = new Q.UI.Text({ 
		label: label,
		color: "black",
		weight : "700",
		size: 18*gameModel.scaleFactor,
		align: 'center',
		x: x*gameModel.scaleFactor,
		y: (y-10)*gameModel.scaleFactor,
		z: zText
		});
		_stage.insert(text);
		
		return {button:button, text:text};
	}	
	
	this.clearAll = function()
	{
	   Q.clearStages();
	   Q.stageScene("scene1");
	}	
	
	this.loadView = function()
	{
		$("#loaderHolder").show();
		$("#logo").show();
	
		viewInit();	
	
		Q = Quintus().include("Sprites, Scenes, Anim, Input, Touch, UI");
		Q.setup('gameAnimation').touch(Q.SPRITE_ALL);;

		Q.scene("scene1",function(stage) 
		{
			_stage = stage;
		}, { sort: true });
		
		Q.load( gameModel.imagesToLoadArray, function() 
		{
			Q.stageScene("scene1");
			gameView.beginDraw();
		});	
	}	

	this.drawLevel = function(levelId)
	{
		gameModel._selectedUnit = 0;
		_missionSelectWindow.drawWindow();
		_missionSelectWindow.hideWindow();
		this._infoWindow.drawWindow();
		this._infoWindow.hideWindow();
		var btn1 = this.createButton("RESTART", 136, 778, this.touchOnReset, this.zHudButtons, this.zHudButtonsText);
		var btn2 = this.createButton("LEVELS", 408, 778, this.touchOnLevelSelect, this.zHudButtons, this.zHudButtonsText);
		var bg = this.createSprite("panel.png", 272, 645, this.zInfopanel);
		this._tileManager.drawField(Q, _stage, levelId, levelId==4);		
		this._hudView.drawHud(Q, _stage);
	}
	
	this.beginDraw = function()
	{
		var uiButton = new UiButton(Q);
		uiButton.initButton();
		this.drawLevel(gameView._currentLvlid);
	}
	
	this.touchOnReset = function()
	{
		gameView.clearAll();
		gameView.drawLevel(gameView._currentLvlid);		
	}	
	
	this.touchOnLevelSelect = function()
	{
		if (_missionSelectWindow._show)
		{
			_missionSelectWindow.hideWindow();
		} else {
			gameView._infoWindow.hideWindow();		
			_missionSelectWindow.showWindow();
		}
	}

	function viewInit()
	{
		var c = $("#gameAnimation")
		var ctx = c[0].getContext('2d');
		ctx.canvas.height = gameModel.canvasH;
		ctx.canvas.width = gameModel.canvasW;
		c.offset({top:0,left:gameModel.canvasL});

		for (i=1; i<=10; i++) {
			$("#p"+i+"active").show();
			$("#p"+i+"pasive").show();		
			applyScaleFactorToElement("#p"+i+"active");
			applyScaleFactorToElement("#p"+i+"pasive");
			$("#p"+i+"active").hide();
			$("#p"+i+"pasive").show();
		}		
	}
	
	function applyScaleFactorToElement(elementName, widthResize)
	{
		$(elementName).width( Math.round($(elementName).width() * gameModel.scaleFactor) );
		var offset = $(elementName).offset();
		$(elementName).offset({ 
			top:  Math.round(offset.top * gameModel.scaleFactor),
			left: (Math.round(offset.left* gameModel.scaleFactor) + gameModel.canvasL)
		});
	}	
//--------------------------------------------------------------------------------
 	this.setupProgress = function(progress) {
		for (i=1; i<=progress; i++) {
			$("#p"+i+"active").show();
			$("#p"+i+"pasive").hide();
		}
		if (progress==10) {
			$("#loaderHolder").hide();
		}
	}
//--------------------------------------------------------------------------------
}  