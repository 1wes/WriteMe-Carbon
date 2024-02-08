const goToSection=(id)=>{

    const section=document.getElementById(id);

    if(section){
        section.scrollIntoView({behavior:"smooth"});
    }
}
export{
    goToSection
}