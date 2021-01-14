import $ from 'jquery'
import templates from './template'
import api from './api.js'
import store from './store.js'

// ---- THIS VAR HOLDS THE HEADER INFORMATION NEEDED TO POST DATA TO THE API ---- //

const post = {method: 'POST', headers: {'Content-Type': 'application/json'} }

// ---- THIS FUNCTION CHANGES THE TEMPLATE TO THE ADD BOOKMARK SCREEN ON CLICK OF THE CORRECT BUTTON ---- //

const newBookmarkEvent = function() {
    $('main').on('click', '#new', event => {
        event.preventDefault();
        templates.renderAddBookmarkTemplate();
    })
}

// ---- THIS FUNCTION CREATES A NEW BOOKMARK WHEN THE CORRECT BUTTON IS PRESSED AFTER CHECKING FOR ANY ERRORS AND PUSHING IT TO THE API DATABASE ---- //

const createBookmarkEvent = function () {
        $('main').on('click', '#create-bookmark', event => {    
        let name = $('#siteName').val() //siteName
        let url = $('#siteURL').val()
        let rating = $('input[name="rating"]:checked').val()
        let description = $('#description').val()
        if (name && url && url.length >= 5 && url.includes('http')) {
            event.preventDefault();
            let body = {}
            body.title = name
            body.url = url
            if (rating) {
                body.rating = rating
            }
            if (description) {
                body.desc = description
            }
            post.body = JSON.stringify(body);
            api.fetchFunction(api.targetURL, post)
            .then(bookmark => {
                if (!bookmark.message) {
                bookmark.expanded = false;
                store.bookmarks.push(bookmark);
                templates.renderStartTemplate();
                store.bookmarks.forEach(bookmark => {
                    templates.renderViewTemplate(bookmark); 
                })
                } else {
                    templates.renderErrorTemplate(bookmark)
                }
            })
        }   
    }) 
}   

// ---- THIS FUNCTION CHANGES THE DOM TO DISPLAY AN EXTENDED BOOKMARK WHEN IT IS SELECTED ---- //
        
const expandBookmarkEvent = function () {
        $('main').on('click', '#bookmark-title', event => {
        event.preventDefault();
        let title = $(event.currentTarget).text()
        store.bookmarks.forEach(bookmark => {
        if (bookmark.title === title){
            bookmark.expanded = true;}
        })
        $('main').html('')
        templates.renderStartTemplate();
        store.bookmarks.forEach(bookmark => {
        templates.renderViewTemplate(bookmark)})
        store.bookmarks.forEach(bookmark => {
        if (bookmark.expanded) {
            bookmark.expanded = false;}
        })
    })  
}

// ---- THIS FUNCTION REMOVES A BOOKMARK WHEN THE DELETE BUTTON IS PRESSED ---- //

const deleteBookmarkEvent = function () {
    $('main').on('click', '#delete-bookmark', event => {
        event.preventDefault();
        let idBookmark = $(event.currentTarget).parent().attr('id')
        let newBookmarks = store.bookmarks.filter(bookmark => {
        return bookmark.id !== idBookmark
        })
        store.bookmarks = newBookmarks;
        api.fetchFunction(`${api.targetURL}/${idBookmark}`, {method: 'DELETE'})
        templates.renderStartTemplate();
        store.bookmarks.forEach(bookmark => {
         templates.renderViewTemplate(bookmark);
        }) 
    })
}

// ---- THIS FUNCTION FILTERS THE BOOKMARKS SHOW IN THE DOM BASED OFF OF THEIR RATING ---- //

const filterBookmarkEvent = function () {    
    $('main').on('change', '#filter', event => {
        event.preventDefault();
        let filteredRating = $('#filter').val();
        templates.renderStartTemplate(); 
        store.bookmarks.forEach(bookmark => {
         if (bookmark.rating >= filteredRating) {
          templates.renderViewTemplate(bookmark);
         } else if (filteredRating === "unfiltered") {
          templates.renderViewTemplate(bookmark);}
        })  
    })
}

// ---- THIS FUNCTION BACKS YOU OUT TO THE DEFAULT VIEW WHEN YOU PRESS THE CANCEL BUTTON ---- //

const cancelButtonEvent = function() {
    $('main').on('click', '#cancel', event => {
        event.preventDefault();
        templates.renderStartTemplate();
        api.getBookmark()
        .then(bookmarks => {
        bookmarks.forEach(bookmark => {
        templates.renderViewTemplate(bookmark)})  
        })
    })
};


export default {
    newBookmarkEvent,
    createBookmarkEvent,
    expandBookmarkEvent,
    deleteBookmarkEvent,
    filterBookmarkEvent,
    cancelButtonEvent,
};