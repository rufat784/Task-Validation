const inputBox=document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup=()=>{
    let userData = inputBox.value;;
    if(userData.trim()!=0){
        addBtn.classList.add("active")
    }
    else{
        addBtn.classList.remove("active")
    }
}
showTasks(); 



addBtn.onclick = ()=>{ 
    let userData = inputBox.value; 
    let getLocalStorageData = localStorage.getItem("New Todo"); 
    if(getLocalStorageData == null){ 
      listArray = []; 
    }else{
      listArray = JSON.parse(getLocalStorageData);  
    }
    listArray.push(userData); 
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); 
  }


  function showTasks(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
      listArray = [];
    }else{
      listArray = JSON.parse(getLocalStorageData); 
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArray.length;
  
    let newLiTag = "";
    listArray.forEach((element, index) => {
      newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; 
    inputBox.value = "";  
  }


  function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
  }


  deleteAllBtn.onclick = ()=>{
    listArr = []; //empty the array
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //set the item in localstorage
    showTasks(); //call the showTasks function
  }