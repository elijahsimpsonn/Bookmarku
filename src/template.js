import $ from 'jquery'

const startTemplate = function () {
    return `
        <header class="">
            <h1>Bookmarks</h1>
            <h5>ブックマーク</h5>
        </header>
        <section class="top-buttons">    
            <form>
                <button id="new" type="submit" class="btn btn-primary new-bookmark">+ New</button>
                <select id="filter" name="filter" class="select">
                    <option value="filter">Filter</option>
                    <option value="1" id="1">1 &#9733;</option>
                    <option value="2" id="2">2 &#9733;</option>
                    <option value="3" id="3">3 &#9733;</option>
                    <option value="4" id="4">4 &#9733;</option>
                    <option value="5" id="5">5 &#9733;</option>
                    <option value="unfiltered" id="unfiltered">All</option>
                </select>
            </form>
        </section>
    `
}

const condensedTemplate = function (bookmark) {
    let renderRatingTemplate = "";
    if (bookmark.rating) {
    renderRatingTemplate = `${bookmark.rating}`
    } else {
        renderRatingTemplate = `<p>Not rated</p>`
    }
    return  `
        <section class="bookmark-col">
            <div class="bookmark-row">
                <p><a class="bookmark bookmark-link bookmark-condensed" href="" id="bookmark-title">${bookmark.title}</a></p>
                <p class='rating'>${renderRatingTemplate} &#9733;</p>
            </div>
        </section>
    `
}

const expandedTemplate = function(bookmark){
    let renderDescTemplate = "";
    let renderRatingTemplate = "";
    if (bookmark.rating) {
    renderRatingTemplate = `<p class="rating">${bookmark.rating} &#9733</p>`
    } else {
        renderRatingTemplate = `<p>Not rated</p>`
    }

    if (bookmark.desc) {
        renderDescTemplate = `<p>${bookmark.desc}</p>`
    } else {
        renderDescTemplate = `<p>Description not available</p>`
    }

    return `
        <section class="bookmark-expanded" id="${bookmark.id}">
            <div>
                <p>${bookmark.title}</p>
                <p>${renderRatingTemplate}</p>
            </div>
            <div>
                <p>${renderDescTemplate}</p>
            </div>
                <a href='${bookmark.url}'><button type="submit" class="btn btn-primary new-bookmark">Visit</button></a>  
                <button id="delete-bookmark" type="submit" class="btn btn-primary new-bookmark">Delete</button>              
        </section>    
    `
}

const errorTemplate = function(errObj) {
    return `
        <h2 style="text-align:center; border: solid 2px red">${errObj.message}</h2>
        <form>
            <button id="add" type="submit" class="btn btn-primary add-bookmark">Try again</button>
        </form>
    `
}

const addBookmarkTemplate = function() {
    return ` 
        <header class="">
            <h1>Bookmarks</h1>
            <h5>ブックマーク</h5>
        </header>
        <section class="add-bookmark-page">
            <form>
            <div class="add-new-bookmark">
                <label class="url-label" for="siteURL">Add New Bookmark:</label>
                <br>
                <input class="url-input" type="url" id="siteURL" minlength="5" placeholder="Enter URL..." required pattern="https://.*|http://.*"/>
                <br>
            </div>
            <div class="input-section">
                <label for="siteName" class="hidden">Enter Site Name</label>
                <input type="text" class="site-name" id="siteName"  required minlength="1" placeholder="Enter Site Name..."/>
                <br>       
                <div class ="stars">
                    <input type="radio" id="rating-1" name="rating" value="1" />
                    <label for="rating-1">1 &#9733;</label>
                    <input type="radio" id="rating-2" name="rating" value="2" />
                    <label for="rating-2">2 &#9733;</label>
                    <input type="radio" id="rating-3" name="rating" value="3" checked="checked" />
                    <label for="rating-3">3 &#9733;</label>
                    <input type="radio" id="rating-4" name="rating" value="4" />
                    <label for="rating-4">4 &#9733;</label>
                    <input type="radio" id="rating-5" name="rating" value="5" />
                    <label for="rating-5">5 &#9733;</label>
                </div>
                <label for="description" class="hidden">Site Description</label>
                <textarea class="site-description" id="description" rows="4" cols="50">Enter Text Here...</textarea>
            </div>
            <div class = "top-buttons">
                <br>
                <button id="create-bookmark" type="submit" class="btn btn-primary new-bookmark">Submit</button>
                <button type="submit" class="btn btn-primary new-bookmark" id="cancel">Cancel</button>
            </div>   
            </form>
        </section>
    `
}

let template = "";

const renderStartTemplate = function () {
    template = startTemplate();
    $('main').html(template);
}

const renderAddBookmarkTemplate = function() {
    template = addBookmarkTemplate();
    $('main').html(template);
}

const renderViewTemplate = function (bookmark) {
    if (!bookmark.expanded) {
        template = condensedTemplate(bookmark);
    } else {
        template = expandedTemplate(bookmark); 
    }
    $('main').append(template);
}

const renderErrorTemplate = function (errObj) {
    template = errorTemplate(errObj)
    $('main').html(template)
}

export default {
    renderStartTemplate,
    renderAddBookmarkTemplate,
    renderViewTemplate,   
    renderErrorTemplate
}