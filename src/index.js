import './index.css'

import templates from './template';
import events from './events.js';
import api from './api.js';
import store from './store.js'

function main() {
templates.renderStartTemplate();
events.newBookmarkEvent();
events.createBookmarkEvent()
api.getBookmark()
.then(bookmarks => {
    bookmarks.forEach(bookmark => {
    bookmark.expanded = false;
    store.handleNewBookmark(bookmark)
    templates.renderViewTemplate(bookmark)
    })
})
    events.expandBookmarkEvent()
    events.deleteBookmarkEvent();
    events.filterBookmarkEvent();
    events.cancelButtonEvent();    
}

main();