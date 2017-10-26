var UnitsInfo = function() 
{
	this._unitsTypes = [{mov:'1 cell', ico:"ico1.png", name:"Knifeman", movId:"cell1"},
						{mov:'horizontal and\nvertical lines', ico:"ico2.png", name:"Bowman", movId:"lines"},
						{mov:'up to 3 cells', ico:"ico3.png", name:"Axeman", movId:"cell3"},
						{mov:'diagonal lines', ico:"ico4.png", name:"Asasin", movId:"diagonals"},
						{mov:'up to 6 cells', ico:"ico5.png", name:"Mage", movId:"cell6"},
						{mov:'up to 2 cells', ico:"ico6.png", name:"Count", movId:"cell2"}];

	this._unitsAssetsList = ["blue1.png",
							"blue2.png",
							"blue3.png",
							"blue4.png",
							"blue5.png",
							"blue6.png",							
							"red1.png",
							"red2.png",
							"red3.png",
							"red4.png",
							"red5.png",
							"red6.png"];

	this._getTypeByAssetId = [0,1,2,3,4,5,
							  0,1,2,3,4,5];
							  
	this._getTeamIdByAssetId = [0,0,0,0,0,0,
								1,1,1,1,1,1];
							  
}