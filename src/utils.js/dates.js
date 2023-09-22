const remainingDays=(deadlineDate)=>{

    const now=new Date(Date.now());

    const deadline=new Date(deadlineDate);

    const difference=deadline.getTime()-now.getTime();

    const daysDifference=Math.floor(difference/(1000*3600*24));

    return daysDifference;
}
export default remainingDays;