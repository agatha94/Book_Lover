var allItemElems = [];
/*
 * This function displays the modal for adding a photo to a user page.
 */
function displayAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('create-item-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addPhotoModalElem.classList.remove('hidden');

}


/*
 * This function closes the modal for adding a photo to a user page, clearing
 * the values in its input elements.
 */
function closeAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('create-item-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addPhotoModalElem.classList.add('hidden');

  clearPhotoInputValues();

}


/*
 * This function clears the values of all input elements in the photo modal.
 */
function clearPhotoInputValues() {

  var inputElems = document.getElementsByClassName('item-input-element');
  for (var i = 0; i < inputElems.length; i++) {
    var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}


/*
 * Small function to get a person's identifier from the current URL.
 */
function getCategoryFromPage() {
  var pathComponents = window.location.pathname.split('/');
  return pathComponents[1];
}


/*
 * This function uses Handlebars on the client side to generate HTML for a
 * person photo and adds that person photo HTML into the DOM.
 */
function insertNewPhoto() {

  var itemName = document.getElementById('item-name-input').value || '';
  var itemDescription = document.getElementById('item-description-input').value || '';
  var itemLocationName = document.getElementById('item-locationName-input').value || '';
  var itemImage = document.getElementById('item-image-input').value || '';

  if (itemName.trim() && itemDescription.trim() && itemLocationName.trim() && itemImage.trim()) {

    var category = getCategoryFromPage();

    if (category) {
      // shows up in client's console, not server's!
      console.log("== category:", category);
      storeCategoryItem(category, itemName, itemDescription, itemLocationName, itemImage, function (err) {
        if (err) {
          alert("Unable to save the new item to the category. Got this error:\n\n" + err);
        } else {
          var itemTemplate = Handlebars.templates.item;
          var itemPhotoTemplate = Handlebars.templates.itemPhoto;

          var itemTemplateArgs = {
            name: itemName,
            description: itemDescription,
            location: "#",
            locationName: itemLocationName,
            photos: [itemImage]
          };

          console.log("hoo")
          var itemHTML = itemTemplate(itemTemplateArgs);
          console.log("hey")
          // console.log(photoCardHTML);
          var itemContainer = document.querySelector('.item-container');
          itemContainer.insertAdjacentHTML('beforeend', itemHTML);
          var itemContainer = document.querySelector('.item-container');

          var itemElemsCollection = document.getElementsByClassName('item');
          for (var i = 0; i < itemElemsCollection.length; i++) {
              allItemElems.push(itemElemsCollection[i]);
          }

        }
      });

    }

    closeAddPhotoModal();

  } else {

    alert('You must specify a value for each of the fields.');

  }

}


/*
 * This function will communicate with our server to store the specified
 * photo for a given person.
 */
function storeCategoryItem(category, name, description, locationName, image, callback) {
  var postURL = "/" + category + "/addItem";
  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postURL);
  postRequest.setRequestHeader('Content-type', 'application/json');

  postRequest.addEventListener('load', function(event) {
    var error;
    if (event.target.status !== 200) {
      error = event.target.response;
    }
    callback(error);
  });

  var postBody = {
    name: name,
    description: description,
    location: "#",
    locationName: locationName,
    photos: [image]
  };
  postRequest.send(JSON.stringify(postBody));
}


function doSearch() {

  // Grab the search query, make sure it's not null, and do some preproessing.
  var searchQuery = document.getElementById('navbar-search-input').value;
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // Remove all twits from the twit container temporarily.
  var itemContainer = document.querySelector('.item-container');
  while (itemContainer.lastChild) {
    itemContainer.removeChild(itemContainer.lastChild);
  }

  /*
   * Loop through the collection of all twits and add twits back into the DOM
   * if they contain the search term or if the search term is empty.
   */
  // allItemElems.forEach(function (itemElem) {
  //   if (!searchQuery || itemElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
  //     itemContainer.appendChild(itemElem);
  //   }
  // });

    allItemElems.forEach(function (itemElem) {
    var currentItemName = itemElem.querySelector('.item-name');
    var currentItemLocation = itemElem.querySelector('.item-location');
    //var current_item_name = currentItemName.textContent.toLowerCase();
    //var current_item_location = currentItemLocation.textContent.toLowerCase();
    if (!searchQuery || currentItemName.textContent.toLowerCase().indexOf(searchQuery) !== -1)
      {
            console.log("Start to cmopare their name");
            itemContainer.appendChild(itemElem);
      }
    else if (!searchQuery || currentItemLocation.textContent.toLowerCase().indexOf(searchQuery) !== -1)
        //if(currentItemName.textContent.toLowerCase().indexOf(searchQuery) !== -1
        //|| currentItemLocation.textContent.toLowerCase().indexOf(searchQuery) !== -1)
          {
            console.log("Start to compare their location");
            itemContainer.appendChild(itemElem);
          }

    });

}


// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  var itemElemsCollection = document.getElementsByClassName('item');
  for (var i = 0; i < itemElemsCollection.length; i++) {
    allItemElems.push(itemElemsCollection[i]);
  }

  var addPhotoButton = document.getElementById('create-item-button');
  if (addPhotoButton) {
    addPhotoButton.addEventListener('click', displayAddPhotoModal);
  }

  var modalCloseButton = document.querySelector('#create-item-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeAddPhotoModal);
  }

  var modalCancalButton = document.querySelector('#create-item-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', closeAddPhotoModal);
  }

  var modalAcceptButton = document.querySelector('#create-item-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', insertNewPhoto);
  }

  var modalSearchButton = document.getElementById('navbar-search-button');
  if (modalSearchButton) {
    modalSearchButton.addEventListener('click', doSearch);
  }

  var modalSearchInput = document.getElementById('navbar-search-input');
  if (modalSearchInput) {
    modalSearchInput.addEventListener('input', doSearch);
  }

});
