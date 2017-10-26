var UiButton = function(setQ) 
{
	var Q = setQ;
	//var callback;

	this.initButton = function()
	{
		Q.Sprite.extend("UiButton", {
			init: function(p) {
				this.callback = p.callback;
				p=this.createShape(p);
				this._super(p);
				this.on("touch");
			 },
		 
			 touch: function(touch) {
				this.callback(this.name);
			 },

			 createShape: function(p) {
				var lenSideH = 60;
				var lenSideW = 270;
			 
				p = p || {};
				p.points = [];

				p.points.push([lenSideW/-2,	lenSideH/-2]);
				p.points.push([lenSideW/-2,	lenSideH/2]);
				p.points.push([lenSideW/2,	lenSideH/2]);
				p.points.push([lenSideW/2,	lenSideH/-2]);
				
				p.w = lenSideW;
				p.h = lenSideH;
				p.cx = p.w/2;
				p.cy = p.h/2;
				
				p.type = 1;
		
				return p;
			},
		});
	}
}