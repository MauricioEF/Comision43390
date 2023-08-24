const socket = io();
const messageBox = document.getElementById('messageBox');
const submitButton = document.getElementById('submitButton');
const messagesPanel = document.getElementById('messagesPanel');

messageBox.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    //Si entró aquí, es porque quiero enviar.
    const content = messageBox.value;
    if (content.trim().length > 0) {
      //Si no está vacío, envíalo.
      socket.emit('newMessage', {
        id: socket.id,
        content,
      });
    }
  }
});

submitButton.addEventListener('click', (evt) => {
  //Si entró aquí, es porque quiero enviar.
  const content = messageBox.value;
  if (content.trim().length > 0) {
    //Si no está vacío, envíalo.
    socket.emit('newMessage', {
      id: socket.id,
      content,
    });
  }
});


socket.on('logs',data=>{
    //Quiero repintar mis logs, limpio todo!!!
    messagesPanel.innerHTML="";
    //Creamos fragmento
    const virtualFragment = document.createDocumentFragment();
    for(let i=0; i<data.length;i++){
        /**
         * Formato actual:
         * {
         *  id: id del socket;
         *  content: mensaje que tengo guardado.
         * }
         */
        const newDiv = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = `${data[i].id} dice: ${data[i].content}`
        newDiv.appendChild(p);
        virtualFragment.appendChild(newDiv);
    }
    messagesPanel.appendChild(virtualFragment);
})


socket.on('users',data=>{
    console.log(data);
})