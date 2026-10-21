const Home = ({ events }) => {
  const totalRegistered = events.reduce((sum, e) => sum + e.registered, 0);
  const fullCount = events.filter((e) => e.registered >= e.capacity).length;

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <p className="hello">Chào mừng ban chủ nhiệm! Dưới đây là tình hình các sự kiện.</p>
      <div className="stats">
        <p>Tổng số sự kiện: {events.length}</p>
        <p>Tổng số lượt đăng ký: {totalRegistered}</p>
        <p>Số sự kiện đã đầy: {fullCount}</p>
      </div>
    </div>
  );
};

export default Home;
