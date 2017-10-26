var ClickOnTileCommand = function(tileId) 
{
	var setX = tileId.charAt(5) - 1;
	var setY = tileId.charAt(7) - 1;
	
	if (!((setX == gameModel._selectedUnit.unitX)&&(setY == gameModel._selectedUnit.unitY)))
	{
		var unitId = gameModel._gameField[setX][setY];
		if (unitId) 
		{
			var assetId = gameView._tileManager._tileUnitManager.getAssetIdByUnitId(unitId);
			DefineHudState(assetId+1);		
			SetCursorCommand(setX, setY, assetId+1, unitId);
		} else {
			DefineHudState(0);		
			SetCursorCommand(setX, setY, 0);
		}
	} else {
		gameView._hudView._hideAll();
		gameModel._selectedUnit = 0;
		gameView._tileManager._tileSelectionManager.hideWhiteTiles();		
		gameView._tileManager._tileSelectionManager.hideRedTiles();
	}
}