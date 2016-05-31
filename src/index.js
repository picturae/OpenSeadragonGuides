const viewer = OpenSeadragon({
  id: 'viewer-container',
  prefixUrl: 'node_modules/openseadragon/build/openseadragon/images/',
  crossOriginPolicy: 'Anonymous',
  defaultZoomLevel: 1,
  tileSources: 'http://openseadragon.github.io/example-images/highsmith/highsmith.dzi',
  minZoomImageRatio: 0.1
});
