var SetCursorCommand = function(setX, setY, setValue, setUnitId) 
{
	this.trySelectUnit = function(setX, setY, setValue)
	{
		if ((!gameModel._selectedUnit) && (gameModel._getTeamIdByAssetId[setValue-1] == 0))
		{
			gameModel._selectedUnit = {unitId:setUnitId, unitX:setX, unitY:setY, assetId:setValue};
			return true;
		}
		return false;
	}

	this.tryPlaceUnit = function(setX, setY, setValue)
	{
		if ((gameModel._selectedUnit!=0) && (setValue == 0) && (this.checkIfMoveAllowed(setX, setY)))
		{
			gameModel._gameField[gameModel._selectedUnit.unitX][gameModel._selectedUnit.unitY] = 0;
			gameView._tileManager._tileUnitManager.placeUnit(setX, setY, gameModel._selectedUnit.unitId, true, CpuMoveCommand);
			gameModel._selectedUnit = 0;
			DefineHudState(0);
			gameView._tileManager._tileSelectionManager.hideWhiteTiles();		
			gameView._tileManager._tileSelectionManager.hideRedTiles();	
			//CpuMoveCommand();			
		}
	}
	
	this.tryKickUnit = function(setX, setY, setValue)
	{
		var teamId = gameModel._getTeamIdByAssetId[setValue-1];
		if ((gameModel._selectedUnit!=0) && (teamId == 1) && (this.checkIfMoveAllowed(setX, setY)))
		{
			gameModel._gameField[gameModel._selectedUnit.unitX][gameModel._selectedUnit.unitY] = 0;
			gameView._tileManager._tileUnitManager.kickUnit(setUnitId);
			gameView._tileManager._tileUnitManager.placeUnit(setX, setY, gameModel._selectedUnit.unitId, true, CpuMoveCommand);
			gameModel._selectedUnit = 0;
			DefineHudState(0);
			gameView._tileManager._tileSelectionManager.hideWhiteTiles();		
			gameView._tileManager._tileSelectionManager.hideRedTiles();
			//CpuMoveCommand();
		}
	}	
	
	this.checkIfMoveAllowed = function(setX, setY)
	{
		var res = false;
		var classId = gameModel._getTypeByAssetId[gameModel._selectedUnit.assetId-1];
		var allowedArea = CalculateHighlightArea(gameModel._selectedUnit.unitX, gameModel._selectedUnit.unitY, gameModel._unitsTypes[classId].movId);

		for(i=0; i<allowedArea.length; i++)
		{
			if ((allowedArea[i].x == setX) && (allowedArea[i].y == setY))
			{
				res = true;
				break;
			}
		}
		return res;
	}

	if (setValue) {
		this.trySelectUnit(setX, setY, setValue)

		gameView._tileManager._tileSelectionManager.hideWhiteTiles();		
		gameView._tileManager._tileSelectionManager.hideRedTiles();
		
		if (gameModel._selectedUnit)
		{
			var classId = gameModel._getTypeByAssetId[gameModel._selectedUnit.assetId-1];
			var highlightArea = CalculateHighlightArea(gameModel._selectedUnit.unitX, gameModel._selectedUnit.unitY, gameModel._unitsTypes[classId].movId);
			gameView._tileManager.selectArrayWhiteTile(highlightArea);	

			if (!((setX == gameModel._selectedUnit.unitX)&&(setY == gameModel._selectedUnit.unitY)))
			{
				var classId = gameModel._getTypeByAssetId[setValue-1];
				var highlightArea = CalculateHighlightArea(setX, setY, gameModel._unitsTypes[classId].movId);
				gameView._tileManager.selectArrayRedTile(highlightArea);
			}
			
			this.tryKickUnit(setX, setY, setValue);
		} else {
			var classId = gameModel._getTypeByAssetId[setValue-1];			
			var highlightArea = CalculateHighlightArea(setX, setY, gameModel._unitsTypes[classId].movId);
			gameView._tileManager.selectArrayRedTile(highlightArea);
		}
	} else {
		if (!gameModel._selectedUnit)
		{
			gameView._tileManager._tileSelectionManager.hideWhiteTiles();		
			gameView._tileManager._tileSelectionManager.hideRedTiles();
		}
	
		this.tryPlaceUnit(setX, setY, setValue);
	}	
}