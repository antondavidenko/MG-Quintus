var DefineHudState = function(clickOnValue) 
{
	var alreadySelectedValue = gameModel._selectedUnit

	this.setStateNoSelected = function()
	{
		gameView._hudView._hideAll();	
	}
	
	this.setStateOneSelected = function(classId)
	{
		gameView._hudView._showPrimary(classId);	
	}
	
	this.setStateBothSelected = function(primaryClassId, secondaryClassId)
	{
		gameView._hudView._showBoth(primaryClassId, secondaryClassId);	
	}

	if ((clickOnValue==0) && (alreadySelectedValue==0))
	{
		this.setStateNoSelected();
	}
	else if ((clickOnValue>0) && (alreadySelectedValue==0))
	{
		this.setStateOneSelected(gameModel._getTypeByAssetId[clickOnValue-1]);
	}	
	else if ((clickOnValue>0) && (alreadySelectedValue!=0))
	{
		this.setStateBothSelected(gameModel._getTypeByAssetId[gameModel._selectedUnit.assetId-1], gameModel._getTypeByAssetId[clickOnValue-1]);
	}		
	else if ((clickOnValue==0) && (alreadySelectedValue!=0))
	{
		this.setStateOneSelected(gameModel._getTypeByAssetId[gameModel._selectedUnit.assetId-1]);
	}	
}