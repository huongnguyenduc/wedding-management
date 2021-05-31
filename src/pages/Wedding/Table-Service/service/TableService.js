const KEYS ={
    tables:'tables',
    tableId:'tableId'
}

export const getDepartmentCollection = ()=>([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertTable(data) {
    let tables=getAllTables();
    data['id'] = generateTableId()
    tables.push(data)
    localStorage.setItem(KEYS.tables,JSON.stringify(tables))
}

export function generateTableId() {
    if (localStorage.getItem(KEYS.tableId) == null)
        localStorage.setItem(KEYS.tableId, '0')
    var id = parseInt(localStorage.getItem(KEYS.tableId))
    localStorage.setItem(KEYS.tableId, (++id).toString())
    return id;
}

export function getAllTables() {
    if (localStorage.getItem(KEYS.tables) == null)
        localStorage.setItem(KEYS.tables, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.tables));
}