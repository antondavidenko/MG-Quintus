//--------------------------  CONST ------------------------------------------------------------

//--------------------------  VARIABLES --------------------------------------------------------
var _progressVal = 0;
var _progressInterval;

this.gameModel;
this.gameView;
//--------------------------  GAME LOGIC -------------------------------------------------------
function gameInit() {
	gameModel = new GameModel();
	gameView = new GameView();
	
	gameView.loadView();
	_progressInterval = setInterval(function(){progressTimer()}, 20);//200
}

function progressTimer() {
	_progressVal++;
	gameView.setupProgress(_progressVal);
	if (_progressVal>10)
	{
		clearInterval(_progressInterval);
	}
}
//--------------------------  ON START -------------------------------------------------------
$(function () {
	$.when(
		$.getScript( "./mvcs/model/gamemodel.js" ),
		$.getScript( "./mvcs/model/unitsInfo.js" ),
		$.getScript( "./mvcs/model/localisationInfo.js" ),
		$.getScript( "./mvcs/model/levelsList.js" ),
		
		$.getScript( "./mvcs/view/gameView.js" ),
		$.getScript( "./mvcs/view/hudView.js" ),
		$.getScript( "./mvcs/view/uiButton.js" ),		
		$.getScript( "./mvcs/view/tileButton.js" ),
		$.getScript( "./mvcs/view/tileManager.js" ),		
		$.getScript( "./mvcs/view/tileUnitManager.js" ),				
		$.getScript( "./mvcs/view/tileSelectionManager.js" ),
		$.getScript( "./mvcs/view/unitMonitorView.js" ),
		$.getScript( "./mvcs/view/window/missionSelectWindow.js" ),		
		$.getScript( "./mvcs/view/window/infoWindow.js" ),	

		$.getScript( "./mvcs/controller/commands/clickOnTileCommand.js" ),
		$.getScript( "./mvcs/controller/commands/setCursorCommand.js" ),
		$.getScript( "./mvcs/controller/commands/cpuMoveCommand.js" ),
		$.getScript( "./mvcs/controller/commands/levelStartCommand.js" ),

		$.getScript( "./mvcs/service/calculateCpuMove.js" ),
		$.getScript( "./mvcs/service/ai/calculateMoveCells.js" ),
		$.getScript( "./mvcs/service/ai/calculateMoveDiagonals.js" ),		
		$.getScript( "./mvcs/service/ai/calculateMoveLines.js" ),	
		$.getScript( "./mvcs/service/calculateHighlightArea.js" ),
		$.getScript( "./mvcs/service/calculateHighlightCells.js" ),
		$.getScript( "./mvcs/service/calculateHighlightDiagonals.js" ),		
		$.getScript( "./mvcs/service/calculateHighlightLines.js" ),		
		$.getScript( "./mvcs/service/defineHudState.js" ),
		
		$.Deferred(function( deferred ){
			$( deferred.resolve );
		})
	).done(function(){
		gameInit();
	});
});