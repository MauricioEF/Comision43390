
async function addVideogame(id){
    const library = getCookie('library');
    if(library){//Mientras haya librería temporal, es porque no hay usuario
        const response = await fetch(`/api/libraries/${library}/videogames/${id}`,{
            method:'PUT'
        })
        const result = await response.json();
        console.log(result);
    }
    else{//Si no encontró la cookie, es porque ya hay un usuario
        const response = await fetch(`/api/libraries/videogames/${id}`,{
            method:'PUT'
        })
        const result = await response.json();
        console.log(result);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}