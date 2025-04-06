const Header = () => {
    return (
      <header className="w-full h-16 px-6 flex items-center justify-between shadow-md bg-white">
        <h1 className="text-xl font-bold">Pofolling</h1>
  
        {/* 오른쪽 프로필/로그아웃 자리 */}
        <div className="flex items-center space-x-4">
          <span className="text-sm">신재윤 님</span>
          <button className="text-sm text-blue-500 hover:underline">로그아웃</button>
        </div>
      </header>
    );
  };
  
  export default Header;
  