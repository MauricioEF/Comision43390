
async function addVideogame(id){
    //library=asd3410923
    const library = document.cookie.split("=")[1];
    const response = await fetch(`/api/libraries/${library}/videogames/${id}`,{
        method:'PUT'
    })
    const result = await response.json();
    console.log(result);
}