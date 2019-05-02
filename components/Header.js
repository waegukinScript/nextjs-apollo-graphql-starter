import Link from "next/link";
import { withRouter } from "next/router";

const Header = ({ router: { pathname } }) => (
  <nav className="navbar navbar-light bg-light">
    <div>
      <Link prefetch href="/">
        <a
          className={`nav-link d-inline-block ${
            pathname === "/" ? "is-active" : ""
          }`}
        >
          Home
        </a>
      </Link>

      <Link prefetch href="/about">
        <a
          className={`nav-link d-inline-block ${
            pathname === "/" ? "is-active" : ""
          }`}
        >
          About
        </a>
      </Link>
    </div>
  </nav>
);

export default withRouter(Header);
