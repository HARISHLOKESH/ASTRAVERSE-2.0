// ASTRAVERSE 2.0 - LocalStorage bookmarks and favorites manager

const BOOKMARKS_KEY = "astraverse_favorites";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load favorites", e);
    return [];
  }
}

export function isFavorite(id) {
  const favs = getFavorites();
  return favs.includes(id);
}

export function toggleFavorite(id) {
  let favs = getFavorites();
  const exists = favs.includes(id);
  if (exists) {
    favs = favs.filter(item => item !== id);
  } else {
    favs.push(id);
  }
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(favs));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
  return !exists;
}
