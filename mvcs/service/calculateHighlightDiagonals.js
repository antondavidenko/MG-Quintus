var CalculateHighlightDiagonals = function(setX, setY) 
{
	var _res = [];
	
	var j = 0;
	for (j=-8; j<8; j++)
	{		
		tryToPush(setX+j, setY+j);
		tryToPush(setX+j, setY-j);
	}

	function tryToPush(setX, setY)
	{
		if ((setX>=0) && (setX<=7) && (setY>=0) && (setY<=7))
		{
			_res.push({x:setX, y:setY});
		}
	}
	
	return _res;
}