var CalculateHighlightArea = function(setX, setY, areaId) 
{
	var res = [];
	if (areaId.indexOf("cell")!= -1)
	{
		range = areaId.charAt(4);
		res = CalculateHighlightCells(setX, setY, range);
	}
	else if (areaId.indexOf("diagonals")!= -1)
	{
		res = CalculateHighlightDiagonals(setX, setY);
	}	
	else if (areaId.indexOf("lines")!= -1)
	{
		res = CalculateHighlightLines(setX, setY);
	}
	
	return res;
}