var GameModel = function() 
{
	this.canvasH = window.innerHeight; //810; 
	this.canvasW = (this.canvasH/810)*550; //550; 
	this.canvasL = (window.innerWidth-this.canvasW)/2;
	this.scaleFactor = this.canvasH/810;
	
	this._lenSide = 68;
	this._fieldMaxX = 8;
	this._fieldMaxY = 8;
	this._gameField;
	this._selectedUnit = 0; // object if selected
	
	var _unitsInfo = new UnitsInfo();
	this._unitsAssetsList = _unitsInfo._unitsAssetsList;
	this._unitsTypes = _unitsInfo._unitsTypes;
	this._getTypeByAssetId = _unitsInfo._getTypeByAssetId;
	this._getTeamIdByAssetId = _unitsInfo._getTeamIdByAssetId;
	
	this.idCpuTeam = 1;
	this.idPlayerTeam = 0;
	this.getTeam = function(idTeam)
	{
		var res = [];
		var i = 0;
		var j = 0;
		var tile = tile;
		for (j=0; j<this._fieldMaxY; j++)
		{		
			for (i=0; i<this._fieldMaxX; i++)
			{
				tile = this._gameField[i][j];
				if (tile)  
				{
					var assetId = gameView._tileManager._tileUnitManager.getAssetIdByUnitId(tile);
					var teamId = gameModel._getTeamIdByAssetId[assetId];
					if (teamId == idTeam)
					{
						var member = {};
						member.unitId = tile;
						member.x = i;
						member.y = j;
						member.movId = this._unitsTypes[this._getTypeByAssetId[assetId]].movId;
						res.push(member);
					}
				}
			}
		}
		
		return res;
	}	

	var _levelsList = new LevelsList();
	this._levels = _levelsList.lists;
	
	this.imagesToLoadArray = [
		"blue1.png",
		"blue2.png",
		"blue3.png", 
		"blue4.png", 
		"blue5.png", 
		"blue6.png", 
		"red1.png",
		"red2.png",
		"red3.png", 
		"red4.png", 
		"red5.png", 
		"red6.png", 
		"ico1.png",
		"ico2.png",
		"ico3.png",		
		"ico4.png",	
		"ico5.png",	
		"ico6.png",
		"window.png",
		"window_small.png",
		"panel.png",
		"button.png",
		"ground_b.png",
		"ground_w.png",
		"selection_red.png",
		"selection_white.png",
		"logo.png"
	];
}