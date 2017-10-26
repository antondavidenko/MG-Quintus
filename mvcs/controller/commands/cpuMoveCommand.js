var CpuMoveCommand = function() 
{
	var move = CalculateCpuMove();
	
	if (move) 
	{
		gameModel._gameField[move.prevX][move.prevY] = 0;
		if (gameModel._gameField[move.newX][move.newY])
		{			
			gameView._tileManager._tileUnitManager.kickUnit(gameModel._gameField[move.newX][move.newY]);
		} 
		gameView._tileManager._tileUnitManager.placeUnit(move.newX, move.newY, move.unitId, true);

		if (gameModel.getTeam(gameModel.idPlayerTeam) == 0) 
		{
			setTimeout(showLose, 500);
		}
	} else {
		setTimeout(showWin, 500);
	}
	
	function showLose()
	{
		gameView._infoWindow.showWindow(gameView._infoWindow._msgLose);
	}
	
	function showWin()
	{
		gameView._infoWindow.showWindow(gameView._infoWindow._msgWin);
	}	
}