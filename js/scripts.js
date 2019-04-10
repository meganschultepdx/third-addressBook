// Business Logic for AddressBook ---------
//creates empty contacts array and initialize current id at 0
function AddressBook() {
  this.contacts = [],
  this.currentId = -1
}
//a function of addressBook, it accepts one argument, and that argument is a contact
AddressBook.prototype.addContact = function(contact) {
  //takes a passed variable (contact) and assigns a new variable called Id. Then assigns it the value "returned" by assigned "ID"
  contact.id = this.assignId();
  //takes the local variable Contact and pushes it to the contacts array of addressBook
  this.contacts.push(contact);
}
//a function of addressBook, it accepts no argument
AddressBook.prototype.assignId = function() {
//takes the variable current id under addressBook and adds 1
  this.currentId += 1;
//returns variable addressBook.currentId which will now be +1
  return this.currentId;
}
//a function of addressBook, it accepts one argument and assigns a new variable called Id
AddressBook.prototype.findContact = function(id) {
//this for loop creates a var "i" and assigns it the value 0, it checks the value of i to see if it is < the length of the contacts array, increments by 1 through the array
  for (var i=0; i< this.contacts.length; i++) {
//if contact at index(i) exists run code (true)
    if (this.contacts[i]) {
//if the var id inside the Contact array at index(i)is equal to local variable id,
      if (this.contacts[i].id == id) {
//return the contact inside the array at index i
        return this.contacts[i];
      }
    }
  };
  //if any of the values inside the array addressBook.contacts do not equal the local var id then return false
  return false;
}
//a function of address book, it accepts one argument and assigns a local variable called id
AddressBook.prototype.deleteContact = function(id) {
//this for loop creates a var i and assigns it the value of 0. it checks the value of i to see if it is less than the length of the contact array and increases through the list by 1
  for (var i=0; i< this.contacts.length; i++) {
    //if the variable in teh array at index i run code (true)
    if (this.contacts[i]) {
  //if the var id inside the array contact at index(i)is equal to local variable id.
      if (this.contacts[i].id == id) {
  //delete the contact inside the array at index(i)
        delete this.contacts[i];
  //if any of the values inside the array addressBook.contacts are equal to local var id then return true
        return true;
      }
    }
  };
//if any values inside the array addressBook.comtacts do not equal the local var id then return false
  return false;
}

// Business Logic for Contacts ---------
//this is not an object, it is an Object constructor function that creates an object, this keyword is used instead of the object name
function Contact(firstName, lastName, phoneNumber, personalEmail, workEmail, homeAddress, summerHomeAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  //address is a function that has address key: values nested inside, so Contact.address.personalEmail
  this.address = {
    personalEmail: personalEmail,
    workEmail: workEmail,
    homeAddress: homeAddress,
    summerHomeAddress: summerHomeAddress,
  }
}
//this is a function called fullName that returns the concatted first namd and last name
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
//creating a new variable "addressBook" and assigning it to a new instance of the object "AddressBook"
var addressBook = new AddressBook();
//creating a function displayContactDetails and argument to the local variable addressBookToDisplay
function displayContactDetails(addressBookToDisplay) {
//creating a variable named contactsList and assigning the value returned by jQuery
  var contactsList = $("ul#contacts");
  //creating a variable named htmlForContactInfo and assigning it as an empty string
  var htmlForContactInfo = "";
  //for each element in the array contacts in the addressBook oject run the function that accepts one argument and assigns it the local variable contact.
  addressBookToDisplay.contacts.forEach(function(contact) {
  //assign the variable htmlForContactInfo its value + "string" + the firstName variable in the contacts + a "string"
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
//run the method html for the local object contact list with the argument html contacts
  contactsList.html(htmlForContactInfo);
};
//this declares function showContact that accepts one argument and assigns it to the var contactID
function showContact(contactId) {
//this declares a var contact and assigns a value returned by the findContact function in the object address Book and it accepts one argument (contactId)
  var contact = addressBook.findContact(contactId);
//run the show function on the leement with the id (show-contact) returned by jq
  $("#show-contact").show();
//run the function html on the elements with the class (first-name)returned by jq and passes on argument (firstName var of the object contact)
  $(".first-name").html(contact.firstName);
  //run the function html on the elements with the class (last-name)returned by jq and passes on argument (lastName var of the object contact)
  $(".last-name").html(contact.lastName);
  //run the function html on the elements with the class (phone-number)returned by jq and passes on argument (phoneNumber var of the object contact)
  $(".phone-number").html(contact.phoneNumber);
  $(".personal-email").html(contact.address.personalEmail);
  $(".work-email").html(contact.address.workEmail);
  $(".home-address").html(contact.address.homeAddress);
  $(".summer-home-address").html(contact.address.summerHomeAddress);
//declares a var buttons and sets it to equal the element with the id of buttons
  var buttons = $("#buttons");
//removes all child (elements) nodes of the set of matched elements from the DOM
  buttons.empty();
//adds to the top of child (li) of parent (button) a string + the id of the local object (contact) + string
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}
//declaring function attachContactListeners that accepts no argument
function attachContactListeners() {
//when the on function is triggered by the event "click" by jq function it adds an event listener
  $("ul#contacts").on("click", "li", function() {
//this runs function showContact(passing one argument the id of il)
    showContact(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
// run the function attachContactListeners with no argument
  attachContactListeners();
//when submitted run the function below with the argument event
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
  //creat a new variable called input#firstName and assign it the value jquery returned
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmail = $("input#new-personal-email").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    var inputtedHomeAddress = $("input#new-home-address").val();
    var inputtedSummerHomeAddress = $("input#new-summer-home-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    //$("input#new-email").val("");
    $("input#new-personal-email").val("");
    $("input#new-work-email").val("");
    $("input#new-home-address").val("");
    $("input#new-summer-home-address").val("");
  //creating a variable called newContact and assigning the value to a new instance of the contact object and passing/accepting three values
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPersonalEmail, inputtedWorkEmail, inputtedHomeAddress, inputtedSummerHomeAddress);
//we're running the method addContact under the object addressBook and passing variable newContact
    addressBook.addContact(newContact);
//runs the displayContactDetails function passing the argument addressBook
    displayContactDetails(addressBook);
    }
  })
})


// if(".form-control" === "") {
//   $("#show-contact").hide();
