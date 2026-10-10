// Bridge: imports smart-search module functions and exposes them globally
// so the non-module app.js can use them.
import { smartSearch, getLiveSuggestions, preloadCatalogIndex, getRecentSearches, saveRecentSearch, clearRecentSearches, getTrendingSearches, toggleVoiceSearch, isVoiceListening, getSessionKey } from './smart-search.js';
import { filterShowroomByCategory, clearShowroomFilter } from './showroom-cards.js';

window._smartSearch = smartSearch;
window._getLiveSuggestions = getLiveSuggestions;
window._getRecentSearches = getRecentSearches;
window._saveRecentSearch = saveRecentSearch;
window._clearRecentSearches = clearRecentSearches;
window._getTrendingSearches = getTrendingSearches;
window._toggleVoiceSearch = toggleVoiceSearch;
window._isVoiceListening = isVoiceListening;
window._getSessionKey = getSessionKey;
window._filterShowroomByCategory = filterShowroomByCategory;
window._clearShowroomFilter = clearShowroomFilter;

// Warm up the built-in catalog index in the background so the first search
// and suggestions feel instant instead of waiting for the large data chunks.
preloadCatalogIndex();

// Signal that smart search is ready
window.dispatchEvent(new CustomEvent('smart-search-ready'));
