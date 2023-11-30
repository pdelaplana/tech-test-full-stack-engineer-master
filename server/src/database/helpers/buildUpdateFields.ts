export const buildUpdateFields = (updateFields: Map<string,any>): [string, any[]] => {
    let updateFieldsStr = '';
    let values = [];
    updateFields?.forEach((value,key) => {
        updateFieldsStr += (updateFieldsStr.length > 0 ? ', ' : ''); 

        updateFieldsStr += `${key} = ?`
        values.push(value);

    });
    return [`${updateFieldsStr}`, values];
}