import costCriteria from '../data/cost-criteria.json';

const calculateTotalOrderCost = (formData) => {
    
    let { service, gradeLevel, deadlineCategory, pagesOrwords } = formData;

    const costPerPage = costCriteria.services[service.toLowerCase()][deadlineCategory.toLowerCase()][gradeLevel.toLowerCase()];

    const totalOrderCost = parseFloat(costPerPage) * parseFloat(pagesOrwords);

    return totalOrderCost
}
export default calculateTotalOrderCost;