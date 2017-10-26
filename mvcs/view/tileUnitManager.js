var TileUnitManager = function(_setTileManager) 
{
	var _unitsList;	
	var _tileManager = _setTileManager;
	
	this.initUnits = function(levelId, shufle)
	{
		_unitsList = [];
		var levelUnitsList = gameModel._levels[levelId];
		
		var unit;
		for (i=0; i<levelUnitsList.length; i++)
		{
			assetName = gameModel._unitsAssetsList[levelUnitsList[i].assetId];
			unit = gameView.createSprite(assetName, 0, 0, gameView.zFieldUnits);
			unit.add("tween");
			unit.assetId = levelUnitsList[i].assetId;
			_unitsList.push(unit);
			
			if (shufle)
			{
				var pos = this.getRandomXY();
				this.placeUnit(pos.x, pos.y, i+1);
			} else {
				this.placeUnit(levelUnitsList[i].x, levelUnitsList[i].y, i+1);
			}
		}	
	}
	
	this.getRandomXY = function()
	{
		var pos = {};
		
		for (;;)
		{
			pos.x = Math.floor((Math.random() * 7));
			pos.y = Math.floor((Math.random() * 7));
			if (gameModel._gameField[pos.x][pos.y] == 0) break;
		}		
		
		
		return pos;
	}
	
	this.placeUnit = function(setX, setY, unitId, showAnimation, setCallback)
	{
		var unit = _unitsList[unitId-1];
		if (showAnimation)
		{
			var newX = (gameModel._lenSide/2 + (setX*gameModel._lenSide))*gameModel.scaleFactor;
			var newY = (gameModel._lenSide/2 + (setY*gameModel._lenSide))*gameModel.scaleFactor;
			unit.animate({ x:newX, y:newY }, 0.5, null, { callback: function() { 
				if (setCallback)
				{
					setCallback(); 
				}
			}		
			});
		}
		else
		{
			_tileManager.setPosition(unit, setX, setY);	
		}
		gameModel._gameField[setX][setY] = unitId;	
	}
	
	this.kickUnit = function(unitId)
	{
		var unit = _unitsList[unitId-1];
		unit.hide();
	}
	
	this.getAssetIdByUnitId = function(unitId)
	{
		return _unitsList[unitId-1].assetId;
	}
}