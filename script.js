//adding event listening for the edit button open pop up
let a = document.getElementById("bt_edit");
function editPopupOpen() {
  document.getElementById("mdledit").style.display = "block";
}
a.addEventListener("click", editPopupOpen);

//adding event listening for the edit button close pop up
let b = document.getElementById("btEditConfirm");
function editPopupClose() {
  let userConfirm = confirm("Finalise submitting");
  if (userConfirm) {
    document.getElementById("mdledit").style.display = "none";
  } else {
    window.location.href = "index.html";
  }
}
b.addEventListener("click", editPopupClose);

//adding event listening for the delete button open pop up
let c = document.getElementById("bt_delete");
function deletePopupOpen() {
  document.getElementById("mdldelete").style.display = "block";
}
c.addEventListener("click", deletePopupOpen);

//adding event listening for delete button close pop up
let d = document.getElementById("btDeleteConfirm");
function deletePopupClose() {
  let userConfirm = confirm("Finalise submitting");
  if (userConfirm) {
    document.getElementById("mdldelete").style.display = "none";
  } else {
    window.location.href = "index.html";
  }
}
d.addEventListener("click", deletePopupClose);
