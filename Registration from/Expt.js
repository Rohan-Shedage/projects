console.log("Welcome to Student Registration form. This is Expt.js");
showList();

// If user adds a contact, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let name = document.getElementById("addName");
  let contact = document.getElementById("addContact");
  //id- addEmail
  let email = document.getElementById("addEmail");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let contactlist = localStorage.getItem("phonebook");

  if(name.value=="" || contact.value=="" || email.value=="")
  {
    alert("Please enter all details");
    return false;
  }
  
  if (contactlist == null) {
    ContactObj = [];
    // ContactObj = [fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!=''];
  } else {
    ContactObj = JSON.parse(contactlist);
  }
  let myObj = {
    name: name.value,
    contact: contact.value,
    email: email.value,
    address: address.value,
    city: city.value
  }
  ContactObj.push(myObj);
  localStorage.setItem("phonebook", JSON.stringify(ContactObj));
  name.value = "";
  contact.value = "";
  address.value = "";
  email.value = "";
  city.value = "";
  showList();
});

// Function to show contacts from localStorage
function showList() {
  let list = localStorage.getItem("phonebook");
  if (list == null) {
    ContactObj = [];
    // ContactObj = [fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!=''];
  } else {
    ContactObj = JSON.parse(list);
  }
  let html = "";
  ContactObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text" style="white-space: break-spaces;"> ${element.contact}</p>  
                        <p class="card-text" style="white-space: break-spaces;"> ${element.email}</p>
                        <p class="card-text" style="white-space: break-spaces;"> ${element.address}</p> 
                        <p class="card-text" style="white-space: break-spaces;"> ${element.city}</p>                      
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Contact</button>
                    </div>
                </div>`;
  });
  let listElm = document.getElementById("phonebook");
  if (ContactObj.length != 0) {
    listElm.innerHTML = html;
  } else {
    listElm.innerHTML = `Nothing to show! Use "Add a contact" section above to add contact.`;
  }
}

// Function to delete a contact
function deleteNote(index) {
//   console.log("I am deleting", index);

  let list = localStorage.getItem("phonebook");
  if (list == null) {
    ContactObj = [];
    // ContactObj = [fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!=''];
  } else {
    ContactObj = JSON.parse(list);
  }

  ContactObj.splice(index, 1);
  localStorage.setItem("phonebook", JSON.stringify(ContactObj));
  showList();
}

//search in contact list 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
  let inputVal = search.value;
    //let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})


