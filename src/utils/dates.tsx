const remainingDays = (deadlineDate: string) => {
  const now = new Date(Date.now());

  const deadline = new Date(deadlineDate);

  const difference = deadline.getTime() - now.getTime();

  const daysDifference = Math.floor(difference / (1000 * 3600 * 24));

  return daysDifference;
};

const revisionGracePeriod = (dispatchDate: Date) => {
  const finalDate = new Date(dispatchDate).getTime() + 1000 * 3600 * 24 * 7;

  const now = new Date(Date.now());

  const difference = finalDate - now.getTime();

  const daysDifference = difference / (1000 * 3600 * 24);

  return daysDifference;
};

const categorizeDeadline = (deadline: string) => {
  const daysToDeadline = remainingDays(deadline);

  if (daysToDeadline > 5) {
    return "long";
  } else if (daysToDeadline >= 3 && daysToDeadline <= 5) {
    return "standard";
  } else if (daysToDeadline >= 2 && daysToDeadline < 3) {
    return "tight";
  } else if (daysToDeadline >= 1 && daysToDeadline < 2) {
    return "urgent";
  } else if (daysToDeadline >= 0.5 && daysToDeadline < 1) {
    return "very-urgent";
  } else if (daysToDeadline < 0.5) {
    return "extremely-urgent";
  } else {
    return "not found";
  }
};

export { revisionGracePeriod, categorizeDeadline };
export default remainingDays;
