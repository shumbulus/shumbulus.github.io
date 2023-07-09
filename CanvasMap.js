// Map data - says grass or water or sand or whatever..
// CRITICAL: X and Y map dimentions must be the same size


// WARNING: detecting the visable area is currently -shit- .. need to redo it.
// Just know that it can fail if useing a map size that dose not fill the screen.
// script may also erraticly fail to load CanvasMap() because fuck physics D:


/*
var mTerrainTiles = [
  [6,6,6,6,6,6,6,6,6,6,6,6,6],
  [6,0,0,0,0,0,0,0,3,3,3,3,6],
  [6,0,0,0,0,0,0,0,3,3,3,3,6],
  [6,0,0,2,0,0,0,0,1,1,3,3,6],
  [6,0,0,0,0,0,0,1,1,1,1,3,6],
  [6,0,0,0,0,0,0,1,1,2,1,1,6],
  [6,1,1,1,1,1,3,1,1,3,1,1,6],
  [6,0,3,3,3,1,3,1,1,1,1,1,6],
  [6,2,3,3,3,3,3,1,1,1,1,3,6],
  [6,2,2,3,3,3,3,3,1,1,3,3,6],
  [6,2,2,2,3,3,3,3,3,3,3,3,6],
  [6,2,2,2,3,3,3,3,3,3,3,3,6],
  [6,6,6,6,6,6,6,6,6,6,6,6,6]
];

*/
/*
var mTerrainTiles = [
  [6,6,6,6,6,6,6,6,6,6,6,6,6],
  [6,0,1,2,3,4,3,3,3,3,3,3,6],
  [6,3,4,5,6,1,3,3,3,3,3,3,6],
  [6,0,1,2,3,4,3,3,1,1,3,3,6],
  [6,3,4,5,6,1,3,1,1,1,1,3,6],
  [6,1,1,1,1,1,3,1,1,2,1,1,6],
  [6,1,1,1,1,1,3,1,1,3,1,1,6],
  [6,0,3,3,3,1,3,1,1,1,1,1,6],
  [6,2,3,3,3,3,3,1,1,1,1,3,6],
  [6,2,2,3,3,3,3,3,1,1,3,3,6],
  [6,2,2,2,3,3,3,3,3,3,3,3,6],
  [6,2,2,2,3,3,3,3,3,3,3,3,6],
  [6,6,6,6,6,6,6,6,6,6,6,6,6]
];
*/

//left side array box = bottom, top row = top side
/*
var mTerrainTiles = [ // in use : 0 void, 6 pink, 3 water, 2 sand, 1 grass,
					  // not in use : 4 buggy, 5 buggy, 9 grass with red. .. apparently i skipped 7. 			see images\Terrain
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,6,6,6,2,2,2,1,0,0,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,2],
  [2,6,6,6,2,2,2,1,0,0,3,3,1,1,0,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,2],
  [2,6,6,6,6,2,2,1,1,1,3,3,1,1,1,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,2],
  [2,2,2,6,6,6,2,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,2],
  [2,2,2,2,6,6,2,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,2],
  [2,2,2,2,2,2,2,2,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,2],
  [2,2,3,3,3,3,3,2,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,2],
  [2,2,3,3,3,3,3,2,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,2],
  [2,2,2,2,2,2,3,2,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,2],
  [2,2,2,2,2,2,3,2,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,2,2,2,2,2,3,2,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,0,1,2,2,3,3,2,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,2],
  [2,3,2,2,2,3,3,2,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,2],
  [2,0,1,2,2,2,3,2,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,2],
  [2,2,2,2,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,2,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,2],
  [2,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,2],
  [2,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,2,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,2],
  [2,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,2,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,2],
  [2,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,2,2,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,2],
  [2,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,2,2,2,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,2],
  [2,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,2],
  [2,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,2],
  [2,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,2],
  [2,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,2],
  [2,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,2],
  [2,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,2],
  [2,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,2],
  [2,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,1,1,0,1,2,3,2,3,3,3,3,3,3,2],
  [2,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,1,1,3,2,3,2,1,3,3,3,3,3,3,2],
  [2,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,1,1,0,1,2,3,2,3,3,1,1,3,3,2],
  [2,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,1,1,3,2,3,2,1,3,1,1,1,1,3,2],
  [2,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,1,1,1,1,3,1,1,2,1,1,2],
  [2,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,2],
  [2,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,2],
  [2,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,2],
  [2,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],

  [2,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,1,2],
  [2,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,1,1,0,3,3,3,1,3,1,1,1,1,1,2],
  [2,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,1,1,2,3,3,3,3,3,1,1,1,1,3,2],
  [2,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,1,1,2,2,3,3,3,3,3,1,1,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],
  [2,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,1,1,2,2,2,3,3,3,3,3,3,3,3,2],

  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

console.log("mTerrainTiles X,Y: "+mTerrainTiles[0].length + ","+mTerrainTiles.length);
*/

var mTerrainTiles = [
  [2,2,2,2,2],
  [2,2,2,2,2],
  [2,2,3,2,2],
  [2,2,2,2,2],
  [2,2,2,2,2]
];


// Height Map
var mHeightMap = [
  [6,6,6,5,5,5,4,4,3,2,3,4,5,6,7,8,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [6,6,6,5,5,5,4,4,3,2,3,4,5,6,7,8,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [6,6,6,5,5,5,4,4,3,2,3,4,5,6,7,8,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [6,6,6,5,5,5,4,4,3,3,4,5,5,5,6,7,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [6,6,6,5,5,5,4,4,3,4,5,5,5,5,5,6,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,4,4,5,5,5,5,5,5,5,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
  [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
];


// Tile dimensions
var TileWidth = 98;
var TileHeight = 50;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Canvas size to match the window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var orderTileArr = []; // Array to store tile data so we can order it

function CanvasMap(){ // as function maybe not needed ???



// TODO:
//		need to only process tiles in the viewable area!! WIP

// will move to SaveableData.js
var PlayerMapLayer = ""; // This defines what dimention the player is on at any given time Example: in minecaft this would be the nether vs the end.
var PlayerPosOnMapX = 1; // Players possition in the map Array (position in world) set by loading save and from default start location.
var PlayerPosOnMapY = 1;


// Start position of startting tile
let TileStartX = Math.floor((canvas.width/2)-(TileWidth/2));// px pos on screen
let TileStartY = Math.floor((canvas.height/2)-(TileHeight/2)); 



/////////////////////////////////////////////////////////////////
//// Working out the visable area ///////////////////////////////
/////////////////////////////////////////////////////////////////
let MidPointOfMapX = PlayerPosOnMapX;
let MidPointOfMapY = PlayerPosOnMapY;
let vTileStartX = Math.floor((canvas.width/2)-(TileWidth/2));	// px pos on screen
let vTileStartY = Math.floor((canvas.height/2)-(TileHeight/2)); // These are a copy of TileStartX and Y, in case I need to change things. (player may not always be middle of screen) aka it lets me change them independantly.
// TC = TileCount
// top to middle distance intiles
// distance + tile / tiles, so any fraction of a tile wont matte rand we can floor it.
let visTTopTC = Math.ceil((vTileStartY+TileHeight) / TileHeight); // tiles from top to mid
//let visTTopX = MidPointOfMapX - visTTopTC;
//let visTTopY = MidPointOfMapY + visTTopTC;
//let pxPosTOP = vTileStartY - (visTTopTC * TileHeight); // position of far top

let visTLeftTC = Math.ceil((vTileStartX+TileWidth) / TileWidth); // tiles from left to mid
//let visTLeftX = MidPointOfMapX - visTLeftTC;
//let visTLeftY = MidPointOfMapY - visTLeftTC;
//let pxPosLeft = vTileStartX - (visTLeftTC * TileWidth); // position of far left

let visTBotTC = Math.ceil((canvas.height-vTileStartY+TileHeight) / TileHeight); // tiles from mid to bot
//let visTBotX = MidPointOfMapX + visTBotTC;
//let visTBotY = MidPointOfMapY - visTBotTC;
//let pxPosBOT = vTileStartY + (visTBotTC * TileHeight); // position of far bot

let visTRightTC = Math.ceil((canvas.width-vTileStartX+TileWidth) / TileWidth); // tiles from left to mid
//let visTRightX = MidPointOfMapX - visTRightTC;
//let visTRightY = MidPointOfMapY - visTRightTC;
//let pxPosRight = vTileStartX - (visTRightTC * TileWidth); // position of far right

// calc from tile numbers to find tile numbers we can display.
//let visTTopLeftX  = visTLeftX  - ( MidPointOfMapX - visTTopX );
//let visTTopLeftY  = visTLeftY  - ( MidPointOfMapY - visTTopY );
//let visTTopRight  = visTRightX - ( MidPointOfMapX - visTTopX );
//let visTTopRight  = visTRightY - ( MidPointOfMapY - visTTopY );
//let visTBotLeftX  = visTLeftX  - ( MidPointOfMapX - visTBotX );
//let visTBotLeftY  = visTLeftY  - ( MidPointOfMapY - visTBotY );
//let visTBotRightX = visTRightX - ( MidPointOfMapX - visTBotX );
//let visTBotRightY = visTRightY - ( MidPointOfMapY - visTBotY );


function xyTileToPXscreen(stPXx, stPXy, midx,midy, x,y) // converts an x,y position in the array to a px position on the screen (i hope)
{	
	// stPX = Mid tile startting point px
	// mid  = The middle tile XY pos in array
	// x/y  = The tile position of witch to calc the px position of.

	let returnPxArr = [	];
	returnPxArr.length=0;
	
	//if(x == 11 && y == 10){console.log("11,10 recived");}
	if(x == 10 && y == 11){console.log("10,11 recived");}
	
	if (x < 0 || y < 0 || x > mTerrainTiles.length || y > mTerrainTiles.length)
	{	// if the tile can exist.
		returnPxArr.push("outOfRange");
		returnPxArr.push("outOfRange");
//		console.log("returnPxArr:outOfRange");
	}
	else
	{
	// Calc the x and y position change in px for X and Y // for both X and Y
		// for a change in arr X we are going px -- or ++
		// for a change in arr y we are going px +- or -+
		// these define the row/col of x and y we are in.
		
	XpxOutX = (stPXx -((midx - x)*TileWidth))/2; 
	XpxOutY = (stPXy -((midx - x)*TileHeight))/2; 

	YpxOutX = (stPXx -((midy - y)*TileWidth))/2; 
	YpxOutY = (stPXy +((midy - y)*TileHeight))/2; 
	
	// combine!??!! via some mind breaking magic :D 
	returnPxArr.push(	Math.floor((XpxOutX + YpxOutX) )	);
	returnPxArr.push(	Math.floor((XpxOutY + YpxOutY) )	);
	}


	return 	returnPxArr;
}


//get num of visable rows
let VisableTileRowCount = visTTopTC + visTBotTC; // these add the 2setsoftiles that are from middle to the defined point long
//get num of visable cols
let VisableTileColCount = visTLeftTC + visTRightTC;

//console.log("+visable row:col = "+VisableTileRowCount+":"+VisableTileColCount);

// list ALL visable tiles in rows and cols
// Get the top left tile x,y
let CornerTileX = MidPointOfMapX - visTLeftTC - visTTopTC;
let CornerTileY = MidPointOfMapY - visTLeftTC + visTTopTC; 

//console.log("CornerTileXY="+CornerTileX+","+CornerTileY);

for (u=0; u<VisableTileColCount; u++)
{
	for (h=0; h<VisableTileRowCount; h++) 
	{
		let returnPxArr = [	];
		// Col increase = +1+1xy
		// Row increase = +1x -1y
		let testTileX = CornerTileX +u+h;
		let testTileY = CornerTileY +u-h;
		//console.log("testTileXY"+testTileX+","+testTileY);
		
		if (testTileX > -1 && testTileY > -1 && testTileX < mTerrainTiles.length && testTileY < mTerrainTiles.length)
		{ 	// if the tile is in array range
			returnPxArr.length=0;		 //Starting point px	    Starting point arraymap 		Tile pos arraymap to convert to px
			returnPxArr = xyTileToPXscreen(vTileStartX,vTileStartY, MidPointOfMapX, MidPointOfMapY, testTileX,testTileY);
								// px , px , arraymap, arraymap 
			orderTileArr.push({ canvasX: returnPxArr[0], canvasY: returnPxArr[1], x: testTileX, y: testTileY });
		}
		
		
		testTileX = testTileX+1; // Now for the col RIGHT next to this one.
		if (testTileX > -1 && testTileY > -1 && testTileX < mTerrainTiles.length && testTileY < mTerrainTiles.length)
		{ 	// if the tile is in array range
			returnPxArr.length=0;		 //Starting point px	    Starting point arraymap 		Tile pos arraymap to convert to px 
			returnPxArr = xyTileToPXscreen(vTileStartX,vTileStartY, MidPointOfMapX, MidPointOfMapY, testTileX,testTileY);
								// px , px , arraymap, arraymap 
			orderTileArr.push({ canvasX: returnPxArr[0], canvasY: returnPxArr[1], x: testTileX, y: testTileY });
		}
				
	}
}

 
// cloaca


















			
				

			
//console.log(orderTileArr);


// Sort the array by canvasY values in ascending order - i think last placed is ontop with canvas. we want 'lower' items ontop
// this may not be needed with base terrain but its going to be needed later when I place objects on the map so worth keeping in for now.
orderTileArr.sort(function(a, b) {
  return a.canvasY - b.canvasY;
});

console.log("orderTileArr Length= "+orderTileArr.length);
// Now loop the ordered array to draw the tiles
for (var i = 0; i < orderTileArr.length; i++) {
  var tileData = orderTileArr[i];
  var canvasX = tileData.canvasX;
  var canvasY = tileData.canvasY;



// Brain help time..
  // red dots
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
  ctx.fill();
  //Worth remembering, the red dot appears to the top left of where you think the tile is. (This is the images 0,0 position)
  
  ctx.fillStyle = "black";
  ctx.font = "10px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  // text position
  let textX = canvasX - 5;
  let textY = canvasY - 6;
  // text next to the red dot
  ctx.fillText(   "(" + mTerrainTiles[tileData.x][tileData.y] + ")"+tileData.x + "," +  tileData.y , textX, textY  );
  
  
  // Place the terrrain texture tile

// this is in its own file since it gets big and complex, it deals with marching squairs and locatingthe smaller tile from a much larger tile (not yet implimented).
FindCutTerrainTile(canvasX, canvasY, mTerrainTiles[tileData.x][tileData.y], tileData.x, tileData.y, TileWidth, TileHeight);

}







// draw over terain (snow fall, leaves, may include dynamic ice that updates collition info)
// draw lower terain objects (tree stumps random rocks tuffty grass, stuff thats allways walked over cos its just small detail.)
// draw height maps (lifting and lowering the terain in a way that offsets the player)
// draw water
// draw terrain shadows (may be time of day dependant)
// draw Terain objects (things like trees and rocks that will impact the player and may be infront or or behind things.)
// draw lighting effects

// draw player (below this block for the moment)

// draw AI units and other players
// draw weather effects
// draw whatever else i forgot 





// Draw player .. for now just a blue dot in middle of screen.


function drawPlayer() {
let playerX = Math.floor(canvas.width/2);// px pos on screen // Note this is actuly the correct position we are stood on the middle tile
let playerY = Math.floor(canvas.height/2);
  ctx.beginPath();
  ctx.arc(playerX, playerY, 10, 0, Math.PI * 2); // Blue dot - radius 5px
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}
drawPlayer();

// how the fuck do i move :D :D 
// collitions 


// end of CanvasMap()
};