var TileButton = function(setQ, setCallback) 
{
	var Q = setQ;
	var callback = setCallback;

	this.initButton = function()
	{
		Q.Sprite.extend("TileButton", {
			init: function(p) {
				p=this.createShape(p);
				p.x = Math.round(p.x*gameModel.scaleFactor);			
				p.y = Math.round(p.y*gameModel.scaleFactor);
				p.scale = gameModel.scaleFactor + (gameModel.scaleFactor*0.01);
				this._super(p);
				this.on("touch");
			 },
		 
			 touch: function(touch) {
				callback(this.name);
			 },

			 createShape: function(p) {
				var lenSide = gameModel._lenSide;
				startPoint = lenSide/-2, endPoint = lenSide/2;
			 
				p = p || {};
				p.points = [];

				p.points.push([startPoint,startPoint]);
				p.points.push([startPoint,endPoint]);
				p.points.push([endPoint,endPoint]);
				p.points.push([endPoint,startPoint]);
				
				p.w = p.h = lenSide;
				p.cx = p.w/2;
				p.cy = p.h/2;
				
				p.type = 1;
		
			   return p;
			},
		});
	}
}