import DarkModeToggle from './DarkModeToggle';  // مسیر کامپوننت DarkModeToggle

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-900 text-white">
      <div className="text-2xl font-bold">یادانگار</div>
      <nav>
        {/* سایر لینک‌ها یا دکمه‌های ناوبری */}
      </nav>

      {/* اضافه کردن دکمه تغییر حالت مود */}
      <DarkModeToggle />
    </header>
  );
}

export default Header;
