const FilterBar = ({ query, status, onQueryChange, onStatusChange }) => (
  <div className="filter-bar">
    <div className="field">
      <label htmlFor="search">Tìm kiếm</label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Nhập tên sự kiện..."
      />
    </div>
    <div className="field">
      <label htmlFor="status">Tình trạng</label>
      <select id="status" value={status} onChange={onStatusChange}>
        <option value="all">Tất cả</option>
        <option value="open">Còn chỗ</option>
        <option value="full">Đã đầy</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
