function createData(groomName, brideName, phoneNumber, lobby, weddingDate, shift, note, deposit) {
  return { groomName, brideName, phoneNumber, lobby, weddingDate, shift, note, deposit };
}

const rows = [
  createData('Từ Thanh Dương', 'Nguyễn Thị Diệu Linh', '0378965847', 'Sảnh Rồng', new Date(2021, 11, 24), '1', 'Anh chị xã hội', 400000),
  createData('Hà Đức Nhật', 'Đào Mỹ Nhung', '0984569781', 'Sảnh Phượng Hoàng', new Date(2021, 10, 24), '2', 'Tiền hơi nhiều', 14200000),
  createData('Nguyễn Tuấn Khôi', 'Lữ Thị Hồng Cẩm', '0984564781', 'Thùng Phá Sảnh', new Date(2021, 11, 24), '2', 'Anh như thùng phá sảnh', 600000),
  createData('Phạm Tuấn Vĩ', 'Lục Huyền Trang', '0974569781', 'Sảnh Thách Đấu', new Date(2021, 19, 24), '2', 'Hẳn là sảnh Thách đấu :v', 200000),
  createData('Nguyễn Cao Việt Hòa', 'Trần Thị Phương Diệu', '0986969781', 'Sảnh Bạch Kim', new Date(2021, 11, 24), '1', '', 2400000),
  createData('Ngô Đức Mạnh', 'Đặng Thị Bích Trâm', '0127457871', 'Sảnh Vàng', new Date(2021, 11, 25), '3', '', 800000),
  createData('Nguyễn Huy Hoàng', 'Tôn Nữ Thị Quỳnh', '0905569891', 'Sảnh Vàng', new Date(2021, 7, 24), '4', '', 204000),
  createData('Lê Thành Tín', 'Đặng Thị Mỹ Linh', '0984512471', 'Sảnh Phượng Hoàng', new Date(2021, 6, 24), '2', '', 1200000),
  createData('Phạm Hữu Minh Quân', 'Nguyễn Thị Nhật Thương', '0984169781', 'Sảnh Thách Đấu', new Date(2021, 11, 28), '1', '', 5200000),
  createData('Đỗ Ngọc Phùng Hưng', 'Nguyễn Thị Mỹ Duyên', '0984523641', 'Sảnh Phượng Hoàng', new Date(2021, 10, 24), '2', '', 2200000),
  createData('Nguyễn Đức Trung Hiếu', 'Nguyễn Yến Nhi', '0984512541', 'Sảnh Vàng', new Date(2021, 7, 4), '3', '', 3200000),
  createData('Phan Anh Nhất', 'Y Binh lam', '0985899781', 'Sảnh Phượng Hoàng', new Date(2021, 2, 24), '2', '', 4200000),
];

export default rows;

