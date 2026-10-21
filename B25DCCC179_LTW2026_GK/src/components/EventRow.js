import { Link } from "react-router-dom";

const EventRow = ({ event, onDelete, onRegister }) => {
  const { id, name, location, date, capacity, registered } = event;
  const isFull = registered >= capacity;

  return (
    <tr className={isFull ? "full" : ""}>
      <td>
        <Link to={`/events/${id}`}>{name}</Link>
      </td>
      <td>{location}</td>
      <td>{date}</td>
      <td>{`${registered}/${capacity}`}</td>
      <td className="actions">
        <button
          className="btn btn-primary"
          disabled={isFull}
          onClick={() => onRegister(id)}
        >
          Đăng ký
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
