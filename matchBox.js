


 // Work out what terrain tile 'shapes' to display for the given x,y pos (map tile)

 // We have a list or terrain types, TerrainLayersOrderArr.
 // each 'next item' on the list, is dominant over the previous.
 // dominant terain has on top priority.
 
 // So we work out what "shapes" we will place on the tile for each terain type in the TerrainLayerOrderArr list.
 // But we only store the most dominant one for each shape.
 // TileTypeArr will hold the terain ID at the index relating to the 'shape'. (16 possable shapes 0-15 + undefined)
 // For example lets say we get shape 3 for the terain "sand" then TileTypeArr[3]="sand".
 // but then we may also get shape 3 later for "grass" and so the terain ID of sand is overridden with "grass". (grass comes after sand in TerrainLayersOrderArr)
 
 // the shape logic probably needs work .. :D
 
 // Next we clean and remove tiles that would be hidden anyway. No need to draw hidden items.
 // currently turned off with useDominanceClearing
 
 // Then we look over TileTypeArr and draw the shapes.
 // Note there are plans to adjust the offset just before drawing the tile not yet implimented.
 
 // The drawing of tile shapes uses a mask.
 



function FindCutTerrainTile(canvasX, canvasY, terrainValue, x, y, spriteWidth, spriteHeight) {
	//canvasX canvasY - Position on canvas
	//terrainValue - Terrain ID of THIS tile
	// x y - position in array
	//spriteWidth, spriteHeight Just a renaming of the tiles mix/max height for sanity



let imageFolder = "images/Terrain/Err/";		// terrainValue a number that matches a folder name.
let fileName = "example.png";	//
var imgURL = imageFolder+fileName;


	let ImageCutOffsetX = 10; // where in the image dose our image start its 0,0 point in the 'bigger picture'.
	let ImageCutOffsetY = 10; // This is defined by other things. But for now is 10,10
	
	
	
	/// Height Map ///
	/** Get height of each tile corner  
let HMTopLeft = mHeightMap[x][y];
let HMTopRight; 
let HMBotLeft;
let HMBotRight;
if (typeof(mHeightMap[x+1][y]) !== 'undefined'){HMTopRight = mHeightMap[x+1][y];} else {HMTopRight = mHeightMap[x][y];} 
if (typeof(mHeightMap[x][y+1]) !== 'undefined'){HMBotLeft = mHeightMap[x][y+1];} else {HMBotLeft = mHeightMap[x][y];} 
if (typeof(mHeightMap[x+1][y+1]) !== 'undefined'){HMBotRight = mHeightMap[x+1][y+1];} else {HMBotRight = mHeightMap[x][y];} 
// so now we have the height level of each corner of the tile.
// When drawing tiles tiles simply need there corner points warping. 
// Looking for a way to warp tiles since it dose not exist in canvas!
// alternitive we use a shading or additional texture map.
// once we have smooth rolling hills uuh.. we can reduce the movement speed while moving in these tiles a little.
// also planned a stepped height map for "digging" and manipulation of the landscape.
// Water flow, should you change the height of an area then the lower areas should then flood.
	**/
	
	
	
	/// Marching squairs ///
	

// This is the dominance order of terain types
// last items are on top
// strings/terain IDs match folder names
var TerrainLayersOrderArr = [
"6", // nasty looking pink shit :D .. the lowest layer should be overridden by all
"0", // void black
"3", // water (seabed/lakebed)
"2", // Sand
"1", // Grass
"4", // buggy alpha channle
"5", // buggy alpha channle 
"9"	 // grass with red border
]; 
	// WATER i speshial note!
	// When placing water terain, we give an option to add a fringe texture to the brush, This will paint "beach" or "mud" over non water terains. But will NOT override water terrain. This ensures a mud/beach texture is between water and other non water terain types. Likewise LAND terrain brushes will have a fringe that only override water with beach or mud textures.

// Plans:
//		Hopfully different height levels, the user can dig down and pile up the terain.
//		The user can also dig down into the ground that enters them to a separate underground map.
//		Water to change: to be on a fixed height, below water will instead be a seabed terain type.
//		- Water will be semi transparent on top of this. Entering the water below the surface would then increase under water visability.
//		if only drawing maps wasnt such ballshit :D


var TileTypeArr = [[]]; // for each "shape" Store the dominant terrain ID



	
for (u=0; u<TerrainLayersOrderArr.length; u++) // Look at every terain type
{
let CurrentLayer = TerrainLayersOrderArr[u];

	
	// Get the 4 corners
	// get corners 			b
	// a b =  1 2 	=	 a     d	=	"a" is "top left"
	// c d    4 8			c			"a" is  x-1, y-1
	let a = 0;
	let b = 0;
	let c = 0;
	let d = 0;
	

	// if it IS the terain type testing, no need to look at corners its a solid tile.
	if (typeof mTerrainTiles[x] !== 'undefined' && typeof mTerrainTiles[x][y] !== 'undefined' 
	&& CurrentLayer == terrainValue)
	{a=1; b=1; c=1; d=1; 
	//console.log("> S:CurrentLayer = "+ CurrentLayer+" vs "+mTerrainTiles[x][y]);
	}
	else // look at corners // note this needs work :D 
	{
	
	//console.log("> CurrentLayer = "+ CurrentLayer+" vs "+mTerrainTiles[x][y]);
		
		// a
		if (typeof mTerrainTiles[x-1] !== 'undefined' && typeof mTerrainTiles[x-1][y-1] !== 'undefined')
		{
			if (x-1 < 0 || y-1 < 0 || mTerrainTiles[x-1][y-1] == CurrentLayer){ a = 1;}
			else {a = 0;}
		} else {a = 0;}

		// b
		if (typeof mTerrainTiles[x-1] !== 'undefined' && typeof mTerrainTiles[x-1][y+1] !== 'undefined')
		{
			if (x-1 < 0 || y+1 > mTerrainTiles.length || mTerrainTiles[x-1][y+1] == CurrentLayer){ b = 1;}
			else {b = 0;}
		} else {b = 0;}

		// c
		if (typeof mTerrainTiles[x+1] !== 'undefined' && typeof mTerrainTiles[x+1][y-1] !== 'undefined')
		{
			if (x+1 > mTerrainTiles.length || y-1 < 0 || mTerrainTiles[x+1][y-1] == CurrentLayer){ c = 1;}
			else {c = 0;}
		} else {c = 0;}

		// d
		if (typeof mTerrainTiles[x+1] !== 'undefined' && typeof mTerrainTiles[x+1][y+1] !== 'undefined')
		{
			if (x+1 > mTerrainTiles.length || y+1 > mTerrainTiles.length || mTerrainTiles[x+1][y+1] == CurrentLayer){ d = 1;}
			else {d = 0;}
		} else {d = 0;}
		
		
		// detect full side
		// ab
		if (typeof mTerrainTiles[x-1] !== 'undefined')
		{
			if (x-1 < 0 || mTerrainTiles[x-1][y] == CurrentLayer){ a = 1; b = 1;}
		}
		// bd
		if (typeof mTerrainTiles[x][y+1] !== 'undefined')
		{
			if (y+1 > mTerrainTiles.length || mTerrainTiles[x][y+1] == CurrentLayer){ b = 1; d = 1;}
		}
		// cd
		if (typeof mTerrainTiles[x+1] !== 'undefined')
		{
			if (x+1 > mTerrainTiles.length || mTerrainTiles[x+1][y] == CurrentLayer){ c = 1; d = 1;}
		}
		// ac
		if (typeof mTerrainTiles[x][y-1] !== 'undefined')
		{
			if (y-1 < 0 || mTerrainTiles[x][y-1] == CurrentLayer){ a = 1; c = 1;}
		}
		
		
	}

let TypeValue= (a*8)+(b*4)+(c*2)+(d*1);
//console.log("| Layer:"+CurrentLayer+". abcd=TypeValue: "+a+","+b+","+c+","+d+" = "+TypeValue);


//if (x == 0 && y == 1){console.log("0,1 | ------:"+CurrentLayer+". abcd: "+a+","+b+","+c+","+d+" = "+TypeValue);}
if (x == 1 && y == 1){console.log("1,1 | ------:"+CurrentLayer+". abcd: "+a+","+b+","+c+","+d+" = "+TypeValue);}
//if (x == 2 && y == 2){console.log("2,2 | Corner:"+CurrentLayer+". abcd: "+a+","+b+","+c+","+d+" = "+TypeValue);}

TileTypeArr[TypeValue] = CurrentLayer; // for every posable "shape", we list the teraain ID (layer) it is, that way the dominant layer places its shape there.

}// end for each layer

//console.log("TileTypeArr: "+TileTypeArr+" L="+TileTypeArr.length); // L=16

// So TileTypeArr is a list with the length of all posable shapes, and the value of the shape holds, the dominant terrain texture ID.
// values can be undefined. 

// Now lets clean it up so we dont place non-dominant tiles that would get compleatly hidden anyways
// removing hidden tile data.
/*
15 overides all
14 over 8
13 over 4
11 over 2
7 over 1
*/

// this tests dominance.. i hope :D
	function isAfter(value1, value2, array) {
	  let index1 = array.indexOf(value1);
	  let index2 = array.indexOf(value2);
	  if (index1 === -1 || index2 === -1) {return false;}
	  return index1 > index2;
	}

let useDominanceClearing = 0; // set to 1 to use dominance
if (useDominanceClearing == 1){
	// for the tiles that could be hidden, if the removable is defined and not dominating the other tile, then we remove it 
	if (TileTypeArr[15] != 'undefined')
	{
		if (TileTypeArr[1] != 'undefined' && isAfter(TileTypeArr[1], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[1]="";}
		if (TileTypeArr[2] != 'undefined' && isAfter(TileTypeArr[2], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[2]="";}
		if (TileTypeArr[3] != 'undefined' && isAfter(TileTypeArr[3], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[3]="";}
		if (TileTypeArr[4] != 'undefined' && isAfter(TileTypeArr[4], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[4]="";}
		if (TileTypeArr[5] != 'undefined' && isAfter(TileTypeArr[5], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[5]="";}
		if (TileTypeArr[6] != 'undefined' && isAfter(TileTypeArr[6], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[6]="";}
		if (TileTypeArr[7] != 'undefined' && isAfter(TileTypeArr[7], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[7]="";}
		if (TileTypeArr[8] != 'undefined' && isAfter(TileTypeArr[8], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[8]="";}
		if (TileTypeArr[9] != 'undefined' && isAfter(TileTypeArr[9], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[9]="";}
		if (TileTypeArr[10] != 'undefined' && isAfter(TileTypeArr[10], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[10]="";}
		if (TileTypeArr[11] != 'undefined' && isAfter(TileTypeArr[11], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[11]="";}
		if (TileTypeArr[12] != 'undefined' && isAfter(TileTypeArr[12], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[12]="";}
		if (TileTypeArr[13] != 'undefined' && isAfter(TileTypeArr[13], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[13]="";}
		if (TileTypeArr[14] != 'undefined' && isAfter(TileTypeArr[14], TileTypeArr[15], TerrainLayersOrderArr) == false){TileTypeArr[14]="";}
	}
	/*if (TileTypeArr[14] != 'undefined' && isAfter(TileTypeArr[8], TileTypeArr[14], TerrainLayersOrderArr) == false)
		{TileTypeArr[8]="";}

	if (TileTypeArr[13] != 'undefined' && isAfter(TileTypeArr[4], TileTypeArr[13], TerrainLayersOrderArr) == false)
		{TileTypeArr[4]="";}

	if (TileTypeArr[11] != 'undefined' && isAfter(TileTypeArr[2], TileTypeArr[11], TerrainLayersOrderArr) == false)
		{TileTypeArr[2]="";}

	if (TileTypeArr[7] != 'undefined' && isAfter(TileTypeArr[1], TileTypeArr[7], TerrainLayersOrderArr) == false)
		{TileTypeArr[1]="";}
		*/
		
}// end test


	if (x == 1 && y == 1){console.log("1:1 TileTypeArr= "+TileTypeArr);}
	//	1:1 TileTypeArr= #,,,,,,,,,,,,,,2,6   ... the # is the most dominant absance of shape thus why it appears


// Cleaning un-needed data done now we can draw tiles.
// Remember brain .. we are ONLY looking at ONE tile per run of this
	
// let TileShape = -1; // holds what shape we are useing 0-15  // replaced with typed text now




// Define an array of image URLs and their corresponding masks
const imageUrls = [];
imageUrls.length=0;

let baseTileObj = {image:'',mask:''};

// don't forget to draw the bace tile // this ALWAYS uses its default tile as the underlaying tile.
	baseTileObj.image = "images/Terrain/"+terrainValue+"/"+fileName;
	baseTileObj.mask = "images/Terrain/MASK/15.png";
	imageUrls.push(baseTileObj);
//	console.log("terrainValue="+terrainValue+" : "+tileObj.image);

for (let u=0; u<TerrainLayersOrderArr.length; u++) // Look at every terain type
{
	var tileObj = {image:'',mask:''};
	
	//if (x == 1 && y ==1){console.log(x +","+ y+": "+TileTypeArr);}

	//if (TerrainLayersOrderArr[u] == "6" && x == 1 && y ==1){console.log("(callFunc) U6Pink: "+ x +","+ y);}
	//if (TerrainLayersOrderArr[u] == "2" && x == 1 && y ==1){console.log("(callFunc) U2Sand: "+ x +","+ y);}
	// TileTypeArr[15] == TerrainLayersOrderArr[u]
	// We look at every terain type in the order array, and if we have a matching shape in our list we can draw it.
	// We send the texture ID to the draw function
	
//	console.log(TileTypeArr);
	
	
	if (typeof TileTypeArr[15] !== 'undefined' && TileTypeArr[15] != '' && TileTypeArr[15] == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[15]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/15.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[14] !== 'undefined' && TileTypeArr[14] != '' && TileTypeArr[14] == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[14]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/14.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[13] !== 'undefined' && TileTypeArr[13] != '' && TileTypeArr[13] == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[13]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/13.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[12] !== 'undefined' && TileTypeArr[12] != '' && TileTypeArr[12] == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[12]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/12.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[11] !== 'undefined' && TileTypeArr[11] != '' && TileTypeArr[11] == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[11]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/11.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[10] !== 'undefined' && TileTypeArr[10] != '' && TileTypeArr[10] == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[10]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/10.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[9] !== 'undefined' && TileTypeArr[9]  != '' && TileTypeArr[9]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[9]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/9.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[8] !== 'undefined' && TileTypeArr[8]  != '' && TileTypeArr[8]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[8]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/8.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[7] !== 'undefined' && TileTypeArr[7]  != '' && TileTypeArr[7]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[7]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/7.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[6] !== 'undefined' && TileTypeArr[6]  != '' && TileTypeArr[6]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[6]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/6.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[5] !== 'undefined' && TileTypeArr[5]  != '' && TileTypeArr[5]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[5]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/5.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[4] !== 'undefined' && TileTypeArr[4]  != '' && TileTypeArr[4]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[4]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/4.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[3] !== 'undefined' && TileTypeArr[3]  != '' && TileTypeArr[3]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[3]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/3.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[2] !== 'undefined' && TileTypeArr[2]  != '' && TileTypeArr[2]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[2]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/2.png";
		imageUrls.push(tileObj);
	}
	else if (typeof TileTypeArr[1] !== 'undefined' && TileTypeArr[1]  != '' && TileTypeArr[1]  == TerrainLayersOrderArr[u])
	{
		tileObj.image = "images/Terrain/"+TileTypeArr[1]+"/"+fileName;
		tileObj.mask = "images/Terrain/MASK/1.png";
		imageUrls.push(tileObj);
	}

	//getTilePos(); // this will work out the offset in the tile image - placed before draw.
}




// Function to load an image given its URL
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    image.src = url;
  });
}

// Function to load all images using Promises
function loadImages(imageUrls) {
 // const promises = imageUrls.map(({ image }) => loadImage(image));
  const promises = imageUrls.map(({ image, mask }) => Promise.all([loadImage(image), loadImage(mask)]));

  return Promise.all(promises);
}

// Function to draw the images to the canvas in the correct order
function drawImages(images) {
  // Draw the images on the canvas
  
	for (i=0; i< images.length; i++)
	{
		//if(x == 1 && y == 1){console.log(images);}
		//ctx.globalAlpha = 0.5;
		// Create an intermediate canvas
		const bufferCanvas = document.createElement('canvas');
		bufferCanvas.width = spriteWidth;
		bufferCanvas.height = spriteHeight;
		const bufferCtx = bufferCanvas.getContext('2d');

		// Draw the first image onto the buffer canvas
		bufferCtx.drawImage(images[i][0], ImageCutOffsetX, ImageCutOffsetY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
		bufferCtx.globalCompositeOperation = 'destination-out';
		// Draw the mask image onto the buffer canvas
		bufferCtx.drawImage(images[i][1], 0, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

		// bufferCtx.globalCompositeOperation = 'source-over';
		// Draw the result from the buffer canvas onto the main canvas
	//	ctx.globalAlpha = 0.25;
		ctx.drawImage(bufferCanvas, 0, 0, spriteWidth, spriteHeight, canvasX, canvasY, spriteWidth, spriteHeight);

	/*	
	ctx.save();
	// image
	//ctx.globalAlpha = 1;
	ctx.drawImage(images[x][0], ImageCutOffsetX, ImageCutOffsetY, spriteWidth, spriteHeight, canvasX, canvasY, spriteWidth, spriteHeight);
	ctx.globalCompositeOperation = 'destination-out';
	// mask: solid = remove, alpha = keep
	//ctx.globalAlpha = 0.5;
	ctx.drawImage(images[x][1], 0, 0, spriteWidth, spriteHeight, canvasX, canvasY, spriteWidth, spriteHeight);
	ctx.restore();
  */
	}
}

// Load and draw the images in the correct order
loadImages(imageUrls)
  .then((images) => drawImages(images))
  .catch((error) => console.error(error));




























/*
	function drawTile(cut, SetImgURL)
	{
	imgURL = "images/Terrain/"+SetImgURL+"/"+fileName;
	let img = new Image();
	img.src = imgURL;

		let MASK = new Image();
		MASK.src = "images/Terrain/MASK/"+cut+".png"; //cut = the mask name
		
		
		const promise1 = new Promise((resolve) => { img.onload = resolve; });
		const promise2 = new Promise((resolve) => { MASK.onload = resolve; });

		const promiseArr = [promise1, promise2];

		Promise.all(promiseArr).then(() => {
		  console.log("Images loaded");

				ctx.save(); // idk if i even need this XD
				ctx.drawImage(img, ImageCutOffsetX, ImageCutOffsetY, spriteWidth, spriteHeight, canvasX, canvasY, spriteWidth, spriteHeight);
				ctx.globalCompositeOperation = 'destination-out';
				ctx.drawImage(MASK, 0, 0);
				ctx.restore(); // goes back to save point.
			if (x == 0 && y ==0){console.log("0,0 = cut: "+ cut +" and Terrain: "+SetImgURL );}
			//if (x == 1 && y ==1 && cut == "15"){console.log("(B) 15Triggered: "+ x +","+ y);}
			//if (x == 1 && y ==1 && cut == "14"){console.log("(B) 14Triggered: "+ x +","+ y);}
			
		});


			
	} // end drawTile()
*/


};









