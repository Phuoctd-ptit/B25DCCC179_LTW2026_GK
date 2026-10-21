import { useParams, useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div>
        <p className="status error">Không tìm thấy sự kiện</p>
        <button className="btn" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { name, location, date, capacity, registered } = event;

  return (
    <div className="detail">
      <h1>Chi tiết sự kiện</h1>
      <p>Tên sự kiện: {name}</p>
      <p>Địa điểm: {location}</p>
      <p>Ngày: {date}</p>
      <p>Số chỗ: {`${registered}/${capacity}`}</p>
      <Countdown date={date} />
      <button className="btn" onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default EventDetail;
