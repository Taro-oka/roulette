import { Link } from "react-router-dom";

const linkStyle = "h-10 p-2 bg-blue-300 rounded-md hover:bg-blue-400 transition";

function Footer() {
  return (
    <header className="h-16 bg-blue-100 flex justify-around items-center">
      <Link className={linkStyle} to="/">
        ホーム
      </Link>
      <Link className={linkStyle} to="/settings">
        設定
      </Link>
    </header>
  );
}

export default Footer;
