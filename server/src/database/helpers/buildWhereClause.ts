export const buildWhereClause = (fieldFilters: Map<string,any>) : { whereClause: string, values: any[]} => {
    let whereClause = '';
    let values = [];
    fieldFilters?.forEach((value,key) => {
        whereClause += (whereClause.length > 0 ? ' AND ' : ' '); 

        if (typeof value === 'string') {
            whereClause += `${key} = ?`;
            
        } 
        else if (Array.isArray(value)) {
            whereClause += `${key} in (?)`
        } 
        else {
            whereClause += `${key} = ?`;
        }
        values.push(value);

    });
    if (whereClause.length > 0) {
        return {  whereClause: `WHERE ${whereClause}`,  values };
    } else {
        return { whereClause:'', values: [] }
    }
    
}