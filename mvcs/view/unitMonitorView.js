var UnitMonitorView = function(setX, setY) 
{
	var Q;
	var _stage;
	
	var _iconList = [];
	
	var _text;
	var _x = setX;
	var _y = setY;
	
	this.drawMonitor = function(setQ, setStage)
	{
		Q = setQ;
		_stage = setStage;
		_iconList = [];		
		
		var i = 0;
		for (i=0; i<=5; i++) {
			_iconList.push(gameView.createSprite(gameModel._unitsTypes[i].ico, _x, _y, 32));		
		}
	
		_text = new Q.UI.Text({ 
		label: "400",
		color: "black",
		weight : "700",
		size: 18*gameModel.scaleFactor,
		align: 'left',
		x: (_x + 45)*gameModel.scaleFactor,
		y: (_y -45)*gameModel.scaleFactor,
		z: 12		
		});
		_stage.insert(_text);
		_text.hide();
		this.hideAllIcons();
	}
	
	this.hideAllIcons = function()
	{
		for (i=0; i<_iconList.length; i++)
		{
			_iconList[i].hide();
		}
	}
	
	this.showIconById = function(unitId)
	{
		this.hideAllIcons();
		_iconList[unitId].show();
	}	
	
	this._showClassInfoById = function(classId)
	{
		this.showIconById(classId);
		
		var name = gameModel._unitsTypes[classId].name;
		var mov = gameModel._unitsTypes[classId].mov;
		
		_text.p.label = name + "\nMOVE:\n"+mov;
		_text.show();
	}
	
	this._hideClassInfo = function()
	{
		this.hideAllIcons();
		_text.hide();		
	}
}