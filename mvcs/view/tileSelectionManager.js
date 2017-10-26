var TileSelectionManager = function(_setTileManager) 
{
	var _whiteTiles;
	var _redTiles;
	
	var _tileManager = _setTileManager;	
	
	this.initSelection = function()
	{	
		this.initWhiteTiles();
		this.initRedTiles();
		
		this.hideWhiteTiles();		
		this.hideRedTiles();
	}
//---------- HELPERS FACTORY ------------------------------------------------------------
	this.initWhiteTiles = function() { _whiteTiles = initTiles("selection_white.png", gameView.zFieldLightWhite); }
	this.hideWhiteTiles = function() { hideTiles(_whiteTiles); }
	this.selectOneWhiteTile = function(setX, setY) { selectOneTile(_whiteTiles, setX, setY); }
	this.selectArrayWhiteTile = function(selectArray) { selectArrayTile(_whiteTiles, selectArray); }
	
	this.initRedTiles = function() { _redTiles = initTiles("selection_red.png", gameView.zFieldLightRed); }	
	this.hideRedTiles = function() { hideTiles(_redTiles); }	
	this.selectOneRedTile = function(setX, setY) { selectOneTile(_redTiles, setX, setY); }
	this.selectArrayRedTile = function(selectArray) { selectArrayTile(_redTiles, selectArray); }	
//---------- HELPERS ------------------------------------------------------------
	initTiles = function(setAssetName, zOrder)
	{
		var targetArray = [];
		var tile;
		
		for (j=0; j<gameModel._fieldMaxX; j++)
		{		
			targetArray[j] = [];
			for (i=0; i<gameModel._fieldMaxX; i++)
			{
				tile = gameView.createSprite(setAssetName, 0, 0, zOrder);
				_tileManager.setPosition(tile, j, i);
				targetArray[j][i] = tile;
			}
		}
		
		return targetArray;
	}
	
	hideTiles = function(targetArray)
	{
		var tile;
		for (j=0; j<gameModel._fieldMaxX; j++)
		{		
			for (i=0; i<gameModel._fieldMaxX; i++)
			{
				tile = targetArray[j][i];
				tile.hide();
			}
		}
	}

	selectOneTile = function(targetArray, setX, setY)
	{
		targetArray[setX][setY].show();
	}
	
	selectArrayTile = function(targetArray, selectArray)
	{
		hideTiles(targetArray);	
		
		for (i=0; i<selectArray.length; i++)
		{
			targetArray[selectArray[i].x][selectArray[i].y].show();
		}		
	}
}