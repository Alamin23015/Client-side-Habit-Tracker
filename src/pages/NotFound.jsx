import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
      <Link to="/" className="mt-8 btn-primary text-lg">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;