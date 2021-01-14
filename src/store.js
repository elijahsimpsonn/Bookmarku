const bookmarks = [];
let error = null;
let adding = false;
let filter = 0;

const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}

const handleNewBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
}

const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)
}

const findAndUpdate = function (id, newData) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newData)
}

export default {
    bookmarks,
    error,
    adding,
    filter,
    findById,
    handleNewBookmark,
    findAndDelete,
    findAndUpdate 
}