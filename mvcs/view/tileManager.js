var TileManager = function() 
{
	var Q;
	var _stage;
	var _lenSide = gameModel._lenSide;

	this._tileUnitManager = new TileUnitManager(this);
	this._tileSelectionManager = new TileSelectionManager(this);

	this.drawField = function(setQ, setStage, levelId, shufle)
	{
		Q = setQ;
		_stage = setStage;	
	
		var tileButton = new TileButton(Q, tileCallback);
		tileButton.initButton();
	
		var i = 0;
		var j = 0;
		var count = 0;
		var tile = tile;
		gameModel._gameField = [];
		for (j=0; j<gameModel._fieldMaxY; j++)
		{		
			gameModel._gameField[j] = [];
			for (i=0; i<gameModel._fieldMaxX; i++)
			{
				tile = new Q.TileButton({ x:_lenSide/2 + i*_lenSide, y:_lenSide/2 + j*_lenSide, z:gameView.zField });
				tile.name = "tile_" + (i+1) + "_" + (j+1);
				
				if (count%2)
				{
					tile.p.asset="ground_w.png";
					tile.p.z = gameView.zField - 1;
				} else {
					tile.p.asset="ground_b.png";
				}
				count++;
				
				_stage.insert(tile);
				
				gameModel._gameField[j][i] = 0;
			}
			count++;
		}
		this._tileSelectionManager.initSelection();
		this._tileUnitManager.initUnits(levelId, shufle);
	}
	
	this.setPosition = function(target, setX, setY)
	{
		target.p.x = (_lenSide/2 + (setX*_lenSide))*gameModel.scaleFactor;
		target.p.y = (_lenSide/2 + (setY*_lenSide))*gameModel.scaleFactor;
	}

	this.selectArrayWhiteTile = function(selectArray) 
	{
		this._tileSelectionManager.selectArrayWhiteTile(selectArray);
	}	

	this.selectArrayRedTile = function(selectArray) 
	{
		this._tileSelectionManager.selectArrayRedTile(selectArray);
	}
	
	tileCallback = function(tileId)
	{
		new ClickOnTileCommand(tileId)
	}
}