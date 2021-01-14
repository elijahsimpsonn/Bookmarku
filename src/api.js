const targetURL = 'https://thinkful-list-api.herokuapp.com/elijah/Bookmarks';

//---- THIS FUNCTION IS THE MAIN FUNCTION THAT TAKES CARE OF ALL FETCH REQUEST. IT CHECKS FOR ERRORS THEN PASSED THROUGH THE DATA ----//

const fetchFunction = function (...fetchRequests) {
    let error;
    return fetch(...fetchRequests)
    .then(res => {
        if(!res.ok) {
        error = {code: res.status};
            if (!res.headers.get('Content-Type').includes('json')) {
                error.message = res.statusText;
                return Promise.reject(error);
            }
        }
        return res.json();
    })
    .then(data => data)
    .catch(error =>  error)
}

// ---- THIS FUNCTION IS USED TO GET THE DATA FROM THE API DATABASE ---- //

const getBookmark = function () {
    return fetchFunction(targetURL);
}

// ---- THIS FUNCTION IS USED TO POST DATA TO THE API DATABASE ---- //

const postBookmark = function (url, postRequest) {
    fetchFunction(url, postRequest);
} 

// ---- THIS FUNCTION IS USED TO EDIT API DATA IN THE DATABASE ---- //

const updateBookmark = function (url, patchRequest) {
    fetchFunction(url, patchRequest);
}

// ---- THIS FUNCTION IS USED TO DELETE DATA FROM THE API DATABASE ---- //

const deleteBookmark = function (url, delRequest) {
    fetchFunction(url, delRequest);
}

export default {
   targetURL,
   fetchFunction,
   getBookmark,
   postBookmark,
   updateBookmark,
   deleteBookmark 
}