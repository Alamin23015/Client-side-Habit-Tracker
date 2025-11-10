const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold">HabitFlow</h3>
          <p className="mt-2 text-gray-400">Build streaks. Boost productivity.</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-gray-400">support@habitflow.com</p>
          <p className="text-gray-400">+880 1234 567890</p>
        </div>
        <div>
          <h4 className="font-semibold">Links</h4>
          <p><a href="#" className="text-gray-400 hover:text-white">Terms</a></p>
          <p><a href="#" className="text-gray-400 hover:text-white">Privacy</a></p>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex space-x-3">
            <a href="#"><img src="/x-logo-white.png" alt="X" className="w-6" /></a>
            <a href="#"><img src="/fb.png" alt="FB" className="w-6" /></a>
            <a href="#"><img src="/ig.png" alt="IG" className="w-6" /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm">
        © 2025 HabitFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;