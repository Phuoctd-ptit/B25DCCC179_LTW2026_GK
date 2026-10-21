import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onDelete, onRegister }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const filtered = events
    .filter((e) => e.name.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((e) => {
      const isFull = e.registered >= e.capacity;
      if (status === "open") return !isFull;
      if (status === "full") return isFull;
      return true;
    });

  return (
    <div>
      <h1>Danh sách sự kiện</h1>
      <FilterBar
        query={query}
        status={status}
        onQueryChange={handleQueryShift}
        onStatusChange={handleStatusChange}
      />
      <p className="count">Tìm thấy {filtered.length} sự kiện</p>
      {filtered.length === 0 ? (
        <p className="status">Không có dữ liệu</p>
      ) : (
        <EventTable events={filtered} onDelete={onDelete} onRegister={onRegister} />
      )}
    </div>
  );
};

export default EventList;
