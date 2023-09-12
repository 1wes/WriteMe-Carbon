const toggleModal=(status)=>{

    if(status){
        let modal=document.getElementById("modal-wrap");

        modal.style.display="block"
    }else{
        let modal=document.getElementById("modal-wrap");

        modal.style.display="none"     
    }
}
export default toggleModal;