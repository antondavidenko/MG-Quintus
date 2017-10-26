var CalculateMoveCells = function(setX, setY, range)
{
	var _calculateCpuMove;
	
	this.checkKillAvaliable = function (area, unitId)
	{
		var i;
		var cellId;
		var assetId;
		var teamId;
		
		for (i=0; i<area.length; i++)
		{
			cellId = gameModel._gameField[area[i].x][area[i].y];
			if (cellId)
			{
				assetId = gameView._tileManager._tileUnitManager.getAssetIdByUnitId(cellId);
				teamId = gameModel._getTeamIdByAssetId[assetId];
				if (teamId == 0)
				{
					_calculateCpuMove.stopSearch = true;
					_calculateCpuMove.targetSearch[unitId] = {x:area[i].x, y:area[i].y}
				}
			}
		}
	}
	
	this.checkMoveToKill = function(inputMoveArea, unitId, searchStep, setCalculateCpuMove)
	{
		var i;		
		var j;
		var tempArea;
		var thisMoveArea = [];
		_calculateCpuMove = setCalculateCpuMove;
		
		var cellUnitId;
		_calculateCpuMove.moveToKill[unitId] = searchStep;	
	
		if (searchStep>=10) 
		{
			_calculateCpuMove.stopSearch = true;
			_calculateCpuMove.targetSearch[unitId] = this.getRandomTarget(unitId);
		}	
	
		if (!_calculateCpuMove.stopSearch) 
		{
			for (i=0; i<inputMoveArea.length; i++)
			{
				tempArea = CalculateHighlightCells(inputMoveArea[i].x, inputMoveArea[i].y, 1);
				for (j=0; j<tempArea.length; j++)
				{
					if (_calculateCpuMove.moveMaps[unitId][tempArea[j].y][tempArea[j].x] == 0 )
					{
						cellUnitId = gameModel._gameField[tempArea[j].x][tempArea[j].y];
						if (cellUnitId)
						{
							assetId = gameView._tileManager._tileUnitManager.getAssetIdByUnitId(cellUnitId);
							teamId = gameModel._getTeamIdByAssetId[assetId];					
							if (teamId != 1)
							{
								thisMoveArea.push(tempArea[j]);
								_calculateCpuMove.moveMaps[unitId][tempArea[j].y][tempArea[j].x] = searchStep;
							}
						} else {
							thisMoveArea.push(tempArea[j]);
							_calculateCpuMove.moveMaps[unitId][tempArea[j].y][tempArea[j].x] = searchStep;
						}
					}
				}
			}

			this.checkKillAvaliable(thisMoveArea, unitId);
			
			this.checkMoveToKill(thisMoveArea, unitId, searchStep+1, _calculateCpuMove);			
		}
	}
	
	this.findFirstStep = function(unitMoveMap, steps, target, areaId)
	{
		var firsStepNum =  this.defineFirsStepNum(areaId);
		var currentposition = {};		
		currentposition.x = target.x;
		currentposition.y = target.y;		
		var i;

		if (steps > firsStepNum)
		{
			for(i=steps; i!=firsStepNum; i--)
			{
				if (this.checkStepId(unitMoveMap,currentposition.y,currentposition.x-1,i-1))
				{
					currentposition.x = currentposition.x-1;
				} else if (this.checkStepId(unitMoveMap,currentposition.y,currentposition.x+1,i-1))
				{
					currentposition.x = currentposition.x+1;
				} else if (this.checkStepId(unitMoveMap,currentposition.y-1,currentposition.x,i-1))
				{
					currentposition.y = currentposition.y-1;
				} else if (this.checkStepId(unitMoveMap,currentposition.y+1,currentposition.x,i-1))
				{
					currentposition.y = currentposition.y+1;
				}
			}
		}

		return currentposition;		
	}	
	
	this.checkStepId = function(unitMoveMap, y, x, value)
	{
		var res = false;
		
		if ((x>=0) && (x<=7) && (y>=0) && (y<=7))
		{
			res = (unitMoveMap[y][x] == value);
		}
		
		return res;
	}	
	
	this.defineFirsStepNum = function(areaId)
	{
		var res = 1;
	
		if (areaId.indexOf("cell")!= -1)
		{
			res = areaId.charAt(4);
		}

		return Number(res);
	}
	
	this.getRandomTarget = function(unitId)
	{
		var tmpX,tmpY;
		for (i=0; i<100; i++)
		{
			tmpX = Math.floor((Math.random() * 7));
			tmpY = Math.floor((Math.random() * 7));
			if (_calculateCpuMove.moveMaps[unitId][tmpY][tmpX] == 1) break;
		}

		return {x:tmpX, y:tmpY};
	}	
}