import {DIRECTION_HORIZONTAL} from './globals';

let useStorage = false;
const STORAGE_ID = 'openseadragon-guides';

function addGuide(id, x, y, dir) {
  const direction = dir === DIRECTION_HORIZONTAL ? 'horizontal' : 'vertical';
  const guidesList = getGuides();
  // Check if guide with this id already exists
  const guide = guidesList.find(guide => guide.id === id);

  // If guide exists update, otherwise create new one
  if (guide) {
    guide.x = x;
    guide.y = y;
  } else {
    guidesList.push({id, x, y, direction});
  }

  saveData(guidesList);
}

function deleteGuide(id) {
  const guides = getGuides();

  saveData(guides.filter(guide => guide.id !== id));
}

function getGuides() {
  const data = window.sessionStorage.getItem(STORAGE_ID);

  if (data) {
    return JSON.parse(data);
  }

  return [];
}

function saveData(arr) {
  window.sessionStorage.setItem(
    STORAGE_ID,
    JSON.stringify(arr)
  );
}

export default {
  addGuide,
  deleteGuide,
  getGuides,
  useStorage
};
