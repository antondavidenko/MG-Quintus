var CalculateCpuMove = function() 
{
	this.team = gameModel.getTeam(gameModel.idCpuTeam);
	this.moveToKill = [];
	this.moveMaps = [];
	this.stopSearch = true;
	this.targetSearch = [];;
	
	this.initMoveMaps = function(teamMemebers)
	{
		var i;
		var j;
		var k;
		
		this.moveMaps = [];
		
		for (k=0; k<teamMemebers; k++)
		{
			this.moveMaps[k] = [];		
			for (j=0; j<gameModel._fieldMaxY; j++)
			{		
				this.moveMaps[k][j] = [];
				for (i=0; i<gameModel._fieldMaxX; i++)
				{
					this.moveMaps[k][j][i] = 0;
				}
			}
		}
	}

	this.checkMoveToKill = function(inputMoveArea, unitId, searchStep)
	{
		var areaId = this.team[unitId].movId;
	
		if (areaId.indexOf("cell")!= -1)
		{
			var calculateMoveCells = new CalculateMoveCells();
			calculateMoveCells.checkMoveToKill(inputMoveArea, unitId, searchStep, this);
		}
		else if (areaId.indexOf("diagonals")!= -1)
		{
			var calculateMoveDiagonals = new CalculateMoveDiagonals();
			calculateMoveDiagonals.checkMoveToKill(inputMoveArea, unitId, searchStep, this);
		}	
		else if (areaId.indexOf("lines")!= -1)
		{
			var calculateMoveLines = new CalculateMoveLines();
			calculateMoveLines.checkMoveToKill(inputMoveArea, unitId, searchStep, this);
		}		
	}

	this.setupMove = function(unitId, newX, newY, prevX, prevY)
	{
		var move = {}
		move.unitId = unitId;
		move.newX = newX;
		move.newY = newY;
		move.prevX = unit.x;
		move.prevY = unit.y;			
		return move;
	}
	
	this.findFirstStep = function(unitMoveMap, steps, target, areaId)
	{
		var currentposition = {};

		if (areaId.indexOf("cell")!= -1)
		{
			var calculateMoveCells = new CalculateMoveCells();
			currentposition = calculateMoveCells.findFirstStep(unitMoveMap, steps, target, areaId);
		}
		else if (areaId.indexOf("diagonals")!= -1)
		{
			var calculateMoveDiagonals = new CalculateMoveDiagonals();
			currentposition = calculateMoveDiagonals.findFirstStep(unitMoveMap, steps, target);
		}	
		else if (areaId.indexOf("lines")!= -1)
		{
			var calculateMoveLines = new CalculateMoveLines();
			currentposition = calculateMoveLines.findFirstStep(unitMoveMap, steps, target);
		}
		
		return currentposition;		
	}
	
//---------------------------------------------------------
	if (this.team.length>0) 
	{
		var i;
		initMoveMaps(this.team.length);
		for (i=0; i<this.team.length; i++)
		{
			this.stopSearch = false;
			checkMoveToKill([{x:this.team[i].x, y:this.team[i].y}], i, 1);
		}
		var minMoves = Math.min.apply(Math, this.moveToKill);
		var unitIndex = this.moveToKill.indexOf(minMoves);
//console.log(moveToKill);
//console.table(moveMaps[unitIndex]);
		var unit = this.team[unitIndex];
		step = this.findFirstStep(this.moveMaps[unitIndex], minMoves-1, this.targetSearch[unitIndex], unit.movId); 

		var cpuMove = this.setupMove(unit.unitId, step.x, step.y, unit.x, unit.y);		
	} else {
		var cpuMove = 0;
	}

	return cpuMove; // optimize move - not need to old cordinates
}