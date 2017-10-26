var CalculateHighlightCells = function(setX, setY, range) 
{
	var _range = range;
	var _waveArray;
	var res = [];
	
	var i = 0;
	var j = 0;
	_waveArray = [];
	for (j=0; j<gameModel._fieldMaxY; j++)
	{		
		_waveArray[j] = [];
		for (i=0; i<gameModel._fieldMaxX; i++)
		{
			_waveArray[j][i] = 0;
		}
	}
	
	_waveArray[setX][setY] = "Unit";

	this.cellAllowed = function(setX, setY)
	{
		var res = false;
		
		if ((setX>=0) && (setX<=7) && (setY>=0) && (setY<=7))
		{
			//if (gameModel._gameField[setX][setY] == 0)
			//{
				res = true;
			//}
		}
		
		return res;
	}
	
	this.getClose = function(setX, setY, range)
	{
		if (range>0)
		{
			if (this.cellAllowed(setX+1,setY)) { tryToMark(setX+1,setY,	range);}
			if (this.cellAllowed(setX-1,setY)) { tryToMark(setX-1,setY,	range);}
			if (this.cellAllowed(setX,setY+1)) { tryToMark(setX,  setY+1,range);}
			if (this.cellAllowed(setX,setY-1)) { tryToMark(setX,  setY-1,range);}
			
			if (this.cellAllowed(setX+1,setY)) { getClose(setX+1,setY,	range-1);}
			if (this.cellAllowed(setX-1,setY)) { getClose(setX-1,setY,	range-1);}
			if (this.cellAllowed(setX,setY+1)) { getClose(setX, 	setY+1,	range-1);}
			if (this.cellAllowed(setX,setY-1)) { getClose(setX, 	setY-1,	range-1);}
		}
	}
	
	function tryToMark(setX, setY, range)
	{
		if (_waveArray[setX][setY] == 0)
		{
			_waveArray[setX][setY] = range;
			res.push({x:setX, y:setY});
		}
	}
	
	this.getClose(setX, setY, range);
	
	return res;
}