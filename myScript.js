// //adding event listening for the edit button open pop up
// let a = document.getElementById("bt_edit");
// function editPopupOpen() {
//   document.getElementById("mdledit").style.display = "block";
// }
// a.addEventListener("click", editPopupOpen);

// //adding event listening for the edit button close pop up
// let b = document.getElementById("btEditConfirm");
// function editPopupClose() {
//   let userConfirm = confirm("Finalise submitting");
//   if (userConfirm) {
//     document.getElementById("mdledit").style.display = "none";
//   } else {
//     window.location.href = "index.html";
//   }
// }
// b.addEventListener("click", editPopupClose);

// //adding event listening for the delete button open pop up
// let c = document.getElementById("bt_delete");
// function deletePopupOpen() {
//   document.getElementById("mdldelete").style.display = "block";
// }
// c.addEventListener("click", deletePopupOpen);

// //adding event listening for delete button close pop up
// let d = document.getElementById("btDeleteConfirm");
// function deletePopupClose() {
//   let userConfirm = confirm("Finalise submitting");
//   if (userConfirm) {
//     document.getElementById("mdldelete").style.display = "none";
//   } else {
//     window.location.href = "index.html";
//   }
// }
// d.addEventListener("click", deletePopupClose);

//  //add data to the table
//  let sNo=0;
//  let e = document.getElementById("bt_addData");
//  function addTableData(name,email){
//   let a = document.addData.addName.value;
//   let b = document.addData.addEmail.value;
//    let td1 = tr.appendChild(document.createElement('td'));
//    let td2 = tr.appendChild(document.createElement('td'));
//    let td3 = tr.appendChild(document.createElement('td'));
//    let td4 = tr.appendChild(document.createElement('td'));

//  }

//adding data to the database-------->>>>>
let x = document.getElementById("addDataForm");
x.addEventListener("submit", function (e) {
  e.preventDefault();
  const newData = new FormData(e.target);
  console.log("User-entered data:");

  //for debugging purpose!!!!!!!!!!!!!!!!!!!!!!!!
  // newData.forEach((value, key) => {
  //   console.log(`${key}: ${value}`);
  // });

  fetch("dataInsert.php", {
    method: "POST",
    body: newData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(JSON.stringify(errorData));
        });
      }
      return response.json();
    })
    .then((data) => {
      alert("Data added successfully");
      console.dir(data);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((error) => {
      console.log(
        "Sorry, could not add data due to this error: " + error.message
      );
    });
});

//showing data in the webpage-->>
document.getElementById("show_Data").addEventListener("click", (elem) => {
  const rndr = elem.target;

  if (rndr.innerText == "Show Table") {
    //load and render the data-->
    fetch("dataShow.php")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData));
          });
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((e) => {
          var row = `<tr>
           <td>${e[0]}</td>
           <td>${e[1]}</td>
           <td>${e[2]}</td>
            <td class="Act">
            <button class="bt_edit">Edit</button>
            <button class="bt_delete">Delete</button>
          </td>
           </tr>`;
          document.getElementById("mytab").querySelector("tbody").innerHTML +=
            row;
        });
      })
      .catch((error) => {
        alert("Sorry, could not add data due to this error: " + error.message);
      });
    //fetch ends here!!!!!!

    //transform the button-->
    rndr.style.backgroundColor = "black";
    rndr.style.color = "white";
    rndr.innerText = "Collapse";
  } else if (rndr.innerText == "Collapse") {
    //resetting the table to its original state!!
    document.getElementById("mytab").querySelector("tbody").innerHTML = ``;
    //Resetting the button's style
    rndr.style = "";
    rndr.innerText = "Show Table";
  } else {
    alert("If Else ladded Problem please check the code!!!");
    rndr.style = "";
    rndr.innerText = "Show Table";
  }
});
