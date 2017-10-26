var HudView = function() 
{
	var primaryMonitor = new UnitMonitorView(50, 600);
	var secondaryMonitor = new UnitMonitorView(350, 600);

	this.drawHud = function(setQ, setStage)
	{
		primaryMonitor.drawMonitor(setQ, setStage);
		secondaryMonitor.drawMonitor(setQ, setStage);
	}

	this._showBoth = function(primaryClassId, secondaryClassId)
	{
		primaryMonitor._showClassInfoById(primaryClassId);
		secondaryMonitor._showClassInfoById(secondaryClassId);
	}
	
	this._showPrimary = function(classId)
	{
		primaryMonitor._showClassInfoById(classId);
		secondaryMonitor._hideClassInfo();
	}
	
	this._hideAll = function()
	{
		primaryMonitor._hideClassInfo();
		secondaryMonitor._hideClassInfo();
	}
}