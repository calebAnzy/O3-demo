import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // ✅ Get user info from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      window.location.href = "/login"; // Redirect if not logged in
    }

    // ✅ Mock courses (replace with API later)
    const mockCourses = [
      {
        id: 1,
        title: "Intro to Finance",
        description: "Learn the basics of money management and investments.",
        image: "/images/fintech.jpg",
      },
      {
        id: 2,
        title: "Blockchain Essentials",
        description: "Understand how blockchain works and its impact on fintech.",
        image: "/images/blockchain.jpg",
      },
      {
        id: 3,
        title: "Python for Fintech",
        description: "Hands-on coding with Python for data and fintech apps.",
        image: "/images/python.jpg",
      },
    ];
    setCourses(mockCourses);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header
        className="py-4 mb-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0A7075 0%, #032F30 100%)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="fw-bold m-0">O3 Finance School</h2>
          {user && (
            <div className="d-flex align-items-center">
              <span className="me-3 fw-semibold">👋 Hi, {user.name}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Course List */}
      <div className="container">
        <h3 className="fw-bold mb-4">Available Courses</h3>
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-lg-4 col-md-6" key={course.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src={course.image}
                  className="card-img-top rounded-top-4"
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{course.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {course.description}
                  </p>
                  <button className="btn btn-primary mt-auto w-100">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center text-muted py-5">
              <p>No courses available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
