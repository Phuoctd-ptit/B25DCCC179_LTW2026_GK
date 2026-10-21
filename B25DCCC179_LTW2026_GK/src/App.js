const BUILD_TAG = "wn-1726";
/* eslint-disable import/first */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";

const STORAGE_KEY = "gk_events";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mounting: đọc dữ liệu đã lưu, nếu chưa có thì gọi API
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEvents(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => setEvents(res.data))
      .catch((err) => {
        if (axios.isCancel(err)) return; // request bị hủy thì bỏ qua
        setError("Không tải được dữ liệu");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    // Unmounting: hủy request
    return () => controller.abort();
  }, []);

  // Updating: lưu lại mỗi khi dữ liệu đổi (chỉ khi đã tải xong và không lỗi)
  useEffect(() => {
    if (loading || error) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, loading]);

  const addEvent = (data) => {
    const newId = events.reduce((max, e) => Math.max(max, e.id), 0) + 1;
    setEvents([...events, { ...data, id: newId, registered: 0 }]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const registerEvent = (id) => {
    setEvents(
      events.map((e) =>
        e.id === id && e.registered < e.capacity
          ? { ...e, registered: e.registered + 1 }
          : e
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home events={events} />} />
        <Route
          path="events"
          element={
            <EventList
              events={events}
              onDelete={deleteEvent}
              onRegister={registerEvent}
            />
          }
        />
        <Route path="events/new" element={<AddEvent onAdd={addEvent} />} />
        <Route path="events/:id" element={<EventDetail events={events} />} />
      </Route>
    </Routes>
  );
};

export default App;
export { BUILD_TAG };
