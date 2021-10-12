//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){//if user values aren't only spaces
    addBtn.classList.add("active"); //active the add button
    }else {
        addBtn.classList.remove("active"); //deactivate the add button
    }
}

showTasks(); //calling show task function

// if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into js objects
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js objects into json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //deactivate the add button
}

//function to add task to ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into js objects
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //parsing the length value in pendingnumb
    if (listArr.length > 0) { // if array length is greater than zero
        deleteAllBtn.classList.add("active"); // active the clearAll button
    }else{
        deleteAllBtn.classList.remove("active"); // deactive the clearAll button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})";>delete</i></span></li>`
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside the ul
    inputBox.value = ""; //once task added leave the input field blank

}

//function to delete task

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after remove the li update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js objects into json string
    showTasks(); //calling showTask function
}

//Delete all task function
deleteAllBtn.onclick = () =>{
    listArr = []; // empty an array
     //after delete all task again update the local storage
     localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js objects into json string
     showTasks(); //calling showTask function
}