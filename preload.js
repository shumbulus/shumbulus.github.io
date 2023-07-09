function preloadImages(imageUrls, callback) {
  var loadedCount = 0;
  var totalCount = imageUrls.length;

  function loadImage(url) {
    var img = new Image();
    img.onload = img.onerror = function() {
      loadedCount++;
      if (loadedCount === totalCount) {
        callback();
      }
    };
    img.src = url;
  }

  for (var i = 0; i < totalCount; i++) {
    loadImage(imageUrls[i]);
  }
}

// Usage example
var imageUrls = [
  'images/Terrain/7/example.png',
  'images/Terrain/1/example.png',
  'images/Terrain/2/example.png',
  'images/Terrain/3/example.png',
  'images/Terrain/4/example.png',
  'images/Terrain/5/example.png',
  'images/Terrain/6/example.png',
  'images/Terrain/MASK/1.png',
  'images/Terrain/MASK/2.png',
  'images/Terrain/MASK/3.png',
  'images/Terrain/MASK/4.png',
  'images/Terrain/MASK/5.png',
  'images/Terrain/MASK/6.png',
  'images/Terrain/MASK/7.png',
  'images/Terrain/MASK/8.png',
  'images/Terrain/MASK/9.png',
  'images/Terrain/MASK/10.png',
  'images/Terrain/MASK/11.png',
  'images/Terrain/MASK/12.png',
  'images/Terrain/MASK/13.png',
  'images/Terrain/MASK/14.png',
  'images/Terrain/MASK/15.png'
  ];

function initializeApp() {
  // Your initialization code here
  console.log('All images loaded! Start running other scripts.');
  
  CanvasMap();
  
  
}

preloadImages(imageUrls, initializeApp);
