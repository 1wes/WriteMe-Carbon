const remainingDays=(deadlineDate)=>{

    const now=new Date(Date.now());

    const deadline=new Date(deadlineDate);

    const difference=deadline.getTime()-now.getTime();

    const daysDifference=Math.floor(difference/(1000*3600*24));

    return daysDifference;
}

const revisionGracePeriod = (dispatchDate) => {
    
    const finalDate = new Date(dispatchDate).getTime() + (1000 * 3600 * 24 * 7);

    const now = new Date(Date.now());

    const difference = finalDate - now.getTime();

    const daysDifference=difference/(1000*3600*24)
    
    return daysDifference;
}

export {
    revisionGracePeriod
}
export default remainingDays;