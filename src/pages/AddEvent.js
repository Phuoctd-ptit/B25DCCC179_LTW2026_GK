import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAdd }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", location: "", date: "", capacity: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, date, capacity } = form;

    if (!name.trim() || !location.trim() || !date || capacity === "") {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const cap = Number(capacity);
    if (!Number.isInteger(cap) || cap < 10 || cap > 1000) {
      setMessage("Sức chứa phải từ 10 đến 1000");
      return;
    }

    onAdd({ name: name.trim(), location: location.trim(), date, capacity: cap });
    navigate("/events", { replace: true });
  };

  return (
    <div>
      <h1>Thêm sự kiện mới</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Tên sự kiện</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="location">Địa điểm</label>
          <input id="location" name="location" type="text" value={form.location} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="date">Ngày diễn ra</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="capacity">Sức chứa</label>
          <input id="capacity" name="capacity" type="number" value={form.capacity} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Thêm</button>
        {message && <p className="error-msg">{message}</p>}
      </form>
    </div>
  );
};

export default AddEvent;
