let inputText = document.getElementById("input");
let addNewTask = document.getElementById("addIcon");
let allTask = document.getElementById('allTask');
let completed = document.getElementById('completed');
let incomplete = document.getElementById('incomplete');
let taskCount = document.getElementById('count');
let tasksContent = document.getElementById("tasksContent");
let title = document.getElementById("title");
// let editTask = document.getElementById("edit");
// let deleteTask = document.getElementById("delete");






let tasks = 
[
    {
        "title": 'task 1',
        "date": '15/10/2020',
        "isComplete": true
    },
    {
        "title": 'task 2',
        "date": '13/10/2020',
        "isComplete": false
    },
    {
        "title": 'task 3',
        "date": '13/10/2020',
        "isComplete": true
    },
        {
        "title": 'task 3',
        "date": '13/10/2020',
        "isComplete": true
    },

]
//-------------- START FUNCTIONS DECLERATIONS--------------

function content (tas) {
    let index = 0 ;
    tasksContent.innerHTML = "";
    
    for(let t of tas){
        let content = 
        `   <div class="task">
                <div class="info">
                        <p id="title" class="${t.isComplete?'comp':''} "> ${t.title} </p>
                        <h3> ${t.date} </h3>
                </div>
                <div class="tools">
                    <span onclick = completeTask(${index}) class="material-symbols-outlined done" >
                        done
                    </span>
                    <span onclick="editTask(${index})" class="material-symbols-outlined edit ">
                        edit_note
                    </span>
                    <span onclick="deleteTask(${index})" class="material-symbols-outlined delete">
                        close
                    </span>
                    
                </div>
                
            </div>
        `;
        tasksContent.innerHTML += content;
        index++;
    }

}

function fillTaskOnPage(tasks){

    // let completeCount = tasks.filter(t => t.isComplete );
    // let incompleteCount = tasks.filter(t => !t.isComplete);
    // completed.innerHTML = `COMPLETE: ${completeCount.length}`;
    // incomplete.innerHTML = `NOT COMPLETE: ${incompleteCount.length}`;
    taskCount.innerHTML = `Tasks Count: ${tasks.length}`;
    
    if(tasks.length){
        content(tasks);
    }
    else{
        tasksContent.innerHTML = "<h2 class= r > There is No Task To Display!....</h2>"
    }
}
function completeTask(index){
    tasks[index].isComplete =!tasks[index].isComplete;

    fillTaskOnPage(tasks);
}
function editTask(index){

    let newTaskTitle = prompt("Change Task Title",tasks[index].title) ;
    tasks[index].title = newTaskTitle;
    fillTaskOnPage(tasks);
    
}
function deleteTask(index){
    
    if(confirm(`Do you Want To Delete: ${tasks[index].title}`)){
        tasks.splice(index , 1);
        fillTaskOnPage(tasks);
    }
}

//-------------- END FUNCTIONS DECLERATIONS --------------


fillTaskOnPage(tasks);

//-------------- START EVENT LISTENERS DECLERATIONS --------------

addNewTask.addEventListener('click',function(){
    if(inputText.value){
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let time =` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        let newTask = {
            
            "title": inputText.value,
            "date": `
                ${day}/${month}/${year} 
                ${time}
                `,
            "isComplete": false
        }
        tasks.push(newTask);
        inputText.value = "";
        fillTaskOnPage(tasks);
        allTask.className ='active';
        completed.className ='';
        incomplete.className ='';
        inputText.classList.remove('error');
    }
    else{
        inputText.value = 'This Field Can\'t Be Empty';
        inputText.classList.add('error');
    }

});
allTask.addEventListener('click', function(){
    fillTaskOnPage(tasks);
    allTask.className ='active';
    completed.className ='';
    incomplete.className ='';

})

completed.addEventListener('click', function(){
  
    allTask.className ='';
    completed.className ='active';
    incomplete.className ='';
    fillTaskOnPage(tasks.filter(t => t.isComplete))
  
})
incomplete.addEventListener('click', function(){
    fillTaskOnPage(tasks.filter(t => !t.isComplete))
    allTask.className ='';
    completed.className ='';
    incomplete.className ='active';
})

inputText.addEventListener('focus',function(){
    inputText.value = '';
    inputText.classList.remove('error');
})


//-------------- END EVENT LISTENERS DECLERATIONS --------------