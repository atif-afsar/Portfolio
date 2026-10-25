import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Paths opened this session, so links turn "visited" purple like a 90s page.
const visited = new Set(["/"]);

// Underlined serif link that flashes red when pressed, then navigates.
// Shows a ring marker when it's the current page.
const NavLink = ({ to, text, style, inline = false }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);
  const here = pathname === to;

  const onClick = (e) => {
    e.preventDefault();
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
      visited.add(to);
      if (!here) navigate(to);
    }, 100);
  };

  const cls = ["nav-link", visited.has(to) && "visited", pressed && "pressed"].filter(Boolean).join(" ");
  return (
    <Link to={to} onClick={onClick} className={cls} style={style} aria-current={here ? "page" : undefined}>
      {here && <span className="nav-link-here" />}
      {/* inline links sit inside <p>, which can't contain a heading */}
      {inline ? <b className="nav-link-text">{text}</b> : <h4>{text}</h4>}
    </Link>
  );
};

export default NavLink;
