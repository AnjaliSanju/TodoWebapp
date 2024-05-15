var username=document.getElementById("username");
var password=document.getElementById("password");
var passwordError=document.getElementById("passwordError");
var nameError=document.getElementById("nameError");

console.log("hello..");
function validate(){
    validateInput(toMain);
}
function validateInput(callback){

    if( username.value!="admin"||username.value ==""){
        nameError.innerHTML="Please enter the valid username!";
    }
    if(password.value==""||password.value!="12345"){
        passwordError.innerHTML="Please enter the valid password";
    }    
    else{
        callback();
        
    }
      
}
function toMain(){
    window.location.href = "/main.html";
}


function fetchTodo(){
    

    var xhttp= new XMLHttpRequest();
    var todoData=document.getElementById("tableBody")

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var output=JSON.parse(this.responseText);
            var dat="";
            
            for(let i=0;i<output.length;i++){
                dat += `<tr>
                        <th scope="row">${i+1}</th>
                        <td >${output[i].title}</td> 
                        <td><input type="checkbox" name="todocnt"></td>     
                        </tr>`;       
            }
            todoData.innerHTML=dat;

// checkbox counting... 
            var todoChecked=document.querySelectorAll("input[type=checkbox]");

            for (var i = 0 ; i < todoChecked.length; i++) {
                todoChecked[i].addEventListener('change' , ()=>{
                    var todoPromise= new Promise((resolve,reject)=>{
                        //  do something  ...
                        var count=0;
                        for (var i=0; i<todoChecked.length; i++) {
                            if (todoChecked[i].checked === true){
                                count++;

                                if(count==5){
                                    console.log("inside if"+count);

                                    resolve("Congrats. 5 Tasks have been Successfully Completed");
                                    
                                }
                                // }else{
                                //     console.log("inside else"+count);

                                //     reject("yet to complete");
                                // }                          
                            }
                        }
                        //  do something  ...
                    });
                    todoPromise.then((val)=>{
                        alert(val); 
                        
                    })
                        
                    
                    console.log(todoPromise);
                  
                }); //addevent close              
            }  





            //-------------------------------------------------
            // for (var i = 0 ; i < todoChecked.length; i++) {
            //     todoChecked[i].addEventListener('change' , ()=>{                    
            //         var count=0;
            //         for (var i=0; i<todoChecked.length; i++) {
            //             if (todoChecked[i].checked === true){
            //                 count++;
            //                 if(count==5){
            //                     alert("Congrats. 5 Tasks have been Successfully Completed" );
            //                     count=0;
            //                     break;
            //                 }                            
            //             }
            //         }
            //     });                
            // } 
            //------------------------------------------------           
        }
    };

    xhttp.open('GET','https://jsonplaceholder.typicode.com/todos',true);
    xhttp.send();
   

}

