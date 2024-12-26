//adding data to the database--->>>
document.getElementById("addDataForm").addEventListener("submit", function (e) {
  //for debugging purpose!!!
  // newData.forEach((value, key) => {
  //   console.log(`${key}: ${value}`);
  // });

  e.preventDefault();
  const newData = new FormData(e.target);
  console.log("User-entered data!!!");
  //Sending Data to the server--->>>
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
      // For debugging purpose!!!
      //console.dir(data);
      alert(data.msg);

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((error) => {
      alert("Sorry, could not add data due to this error: " + error.message);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
});

//A function to load the data to the webpage
function loadData() {
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
      //generating row for each data Object--->>>
      data.forEach((e) => {
        let row = `<tr>
           <td class="sno_Dynamic">${e[0]}</td>
           <td class="name_Dynamic">${e[1]}</td>
           <td class="email_Dynamic">${e[2]}</td>
            <td class="act">
            <button class="bt_Edit">Edit</button>
            <button class="bt_Delete">Delete</button>
          </td>
           </tr>`;
        //Adding row by row to the Table--->>>
        document.getElementById("mytab").querySelector("tbody").innerHTML +=
          row;
      });
      //renderring the modals for edit and delete buttons of each row--->>>
      modal_Rendering();
    })
    .catch((error) => {
      alert("Sorry, unable to fetch data due to this error: " + error.message);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
}

//sending edit request to the server--->>>
function edit_Request(obj) {
  //Debugger Fetch method!!!
  // fetch("dataUpdate.php", {
  //   method: "POST", // Use POST instead of PATCH for testing
  //   body: edit_Data,
  // })
  //   .then((response) => response.text()) // Get the raw response (not JSON)
  //   .then((data) => {
  //     console.log(data); // Log the raw response from PHP
  //     alert("Data sent successfully. Check console.");
  //   })
  //   .catch((error) => {
  //     alert("Error: " + error.message);
  //   });

  fetch("dataUpdate.php", {
    method: "POST",
    body: obj,
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
      alert("Data Updated successfully" + data.msg);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((error) => {
      alert(
        "Sorry can not update the data due to this Error-->" + error.message
      );
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
}

//sending delete reuqest to the server--->>>
function delete_Request(obj) {
  fetch("dataDelete.php", {
    method: "POST",
    body: obj,
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
      alert("Data Deleted Successfully" + data);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((error) => {
      alert("Unable to delete data!!! due to this--->" + error.message);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
}

//adding the functionalities of the modal--->>>
function modal_Rendering() {
  if (document.getElementById("mytab").querySelector("tbody").innerHTML) {
    document
      .getElementById("mytab")
      .querySelector("tbody")
      .addEventListener("click", (e) => {
        // for debugging purpose!!!
        // if (e.target) {
        //   console.log(e.target);
        // }

        //Finding out the id of the targetted row--->>>
        let rowID = e.target
          .closest("tr")
          .querySelector(".sno_Dynamic").innerText;
        //Adding the edit Form--->>>
        if (e.target.classList.contains("bt_Edit")) {
          //Renderring the Edit Modal--->>>
          document.getElementById("mdl_Edit").style.display = "block";
          //Sending the data to the server for Updation--->>>
          document
            .getElementById("edit_Data_Form")
            .addEventListener("submit", (elem) => {
              elem.preventDefault();
              const edit_Data = new FormData(elem.target);
              edit_Data.append("Sno", rowID);
              let userConfirm = confirm("Ensure Submission!!!");
              if (userConfirm) {
                //For debugging purpose!!!
                // edit_Data.entries().forEach(([key, value]) => {
                //   console.log(key + " " + value);
                // });

                //Sending data to the Server--->>>
                edit_Request(edit_Data);
              } else {
                setTimeout(() => {
                  window.location.href = "index.html";
                }, 2000);
              }
            });

          //Vanish the edit modal in case of accidental click--->>>
          document
            .getElementById("bt_Edit_Cancel")
            .addEventListener("click", (ele) => {
              ele.preventDefault();
              document.getElementById("mdl_Edit").style.display = "";
            });
        }
        //adding Delete Form--->>>
        else if (e.target.classList.contains("bt_Delete")) {
          //Renderring the Delete Modal--->>>
          document.getElementById("mdl_Delete").style.display = "block";
          //Delete the data from the database--->>>
          document
            .getElementById("delete_Data_Form")
            .addEventListener("submit", (elem) => {
              elem.preventDefault();
              const delete_Data = new FormData(elem.target);
              delete_Data.append("Sno", rowID);
              let userConfirm = confirm(
                "Finalise!!! This action will delete the data permanently!!!"
              );
              if (userConfirm) {
                //Sending delete request--->>>
                delete_Request(delete_Data);
                //Vanishing the delete Modal
                document.getElementById("mdl_Delete").style.display = "none";
              } else {
                setTimeout(() => {
                  window.location.href = "index.html";
                }, 2000);
              }
            });
          //vanishing the delete modal for accidental click--->>>
          document
            .getElementById("bt_Delete_Cancel")
            .addEventListener("click", (ele) => {
              ele.preventDefault();
              document.getElementById("mdl_Delete").style.display = "";
            });
        } else {
          // for debugging purpose!!!
          // console.log(e.target);

          //keeping the modals hidden--->>>
          document.getElementById("mdl_Edit").style.display = "";
          document.getElementById("mdl_Delete").style.display = "";
        }
      });
  }
}

//Renderring the data in the webpage-->>
document.getElementById("show_Data").addEventListener("click", (elem) => {
  const rndr = elem.target;
  if (rndr.innerText == "Show Table") {
    //load and render the data-->
    loadData();
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
    alert("If Else ladder Problem please check the code!!!");
    rndr.style = "";
    rndr.innerText = "Show Table";
  }
});
