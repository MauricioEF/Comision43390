const form = document.getElementById('loginForm');

console.log(document.cookie);

form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key] = value);
    const response = await fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const result = await response.json();
    console.log(result);
    if(response.status===200){
        //window.location.replace('home');
    }
    
})