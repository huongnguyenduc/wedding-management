function createData(id, tableKind, tableAmount, tableReserveAmount, tableUnitCost, tableNote) {
  return { id, tableKind, tableAmount, tableReserveAmount, tableUnitCost, tableNote };
}

const tableData = [
    createData(1, 'NYC', 2, 3, 3000, 'Tiền hơi nhiều'),
    createData(2, 'NYC1', 2, 3, 3000, 'Tiền hơi nhiều'),
];

export default tableData;

