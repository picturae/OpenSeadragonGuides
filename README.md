# OpenSeadragon Guides

An OpenSeadragon plugin that makes it possible to add guidelines to an image.

## Demo

https://picturae.github.io/openseadragonselection/#tabs-guides

## Usage

This plugin requires a version of OpenSeadragon later than 5.0.0

Include `dist/openseadragon-guides.js` after OpenSeadragon in your html. Then after you create a viewer:

    viewer.guides({
      allowRotation: false,        // Make it possible to rotate the guidelines (by double clicking them)
      horizontalGuideButton: null, // Element for horizontal guideline button
      verticalGuideButton: null,   // Element for vertical guideline button
      prefixUrl: null,             // Images folder
      removeOnClose: false,        // Remove guidelines when viewer closes
      useSessionStorage: false,    // Save guidelines in sessionStorage
      navImages: {
        guideHorizontal: {
          REST: 'guidehorizontal_rest.png',
          GROUP: 'guidehorizontal_grouphover.png',
          HOVER: 'guidehorizontal_hover.png',
          DOWN: 'guidehorizontal_pressed.png'
        },
        guideVertical: {
          REST: 'guidevertical_rest.png',
          GROUP: 'guidevertical_grouphover.png',
          HOVER: 'guidevertical_hover.png',
          DOWN: 'guidevertical_pressed.png'
        }
      }
    });

## TODO:
* Add default styling for the rotation popup
