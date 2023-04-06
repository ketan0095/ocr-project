import React from "react";
import Link from "next/link";

const OffCanvasMenu = () => {
  return (
    <div className="offcanvas-body bg-soft-black">
      <ul className="nav col-12 col-md-auto justify-content-center main-menu">
        {/* <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle d-flex justify-content-between"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Home
          </a>
          <div className="dropdown-menu border-0 rounded-custom shadow py-0 bg-white">
            <div className="dropdown-grid rounded-custom width-half">
              <div className="dropdown-grid-item">
                <h6 className="drop-heading">Different Home</h6>
                {offcanvasMenuData.map((navH, i) => (
                  <span key={i + 1}>
                    <Link href={navH.href}>
                      <a className="dropdown-link">
                        <span className="demo-list bg-primary rounded text-white fw-bold">
                          {i + 1}
                        </span>
                        <span className="dropdown-info mb-0">
                          <span className="drop-title">{navH.title}</span>
                          <span>{navH.info}</span>
                        </span>
                      </a>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </li> */}
        <li>
          <Link href="/" legacyBehavior>
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about-us" legacyBehavior>
            <a className="nav-link">About</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/services">
            <a className="nav-link">Services</a>
          </Link>
        </li>
        <li>
          <Link href="/pricing">
            <a className="nav-link">Pricing</a>
          </Link>
        </li> */}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle d-flex justify-content-between"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Anyverse Solutions
          </a>
          <div className="dropdown-menu border-0 rounded-custom shadow py-0">
            <div className="dropdown-grid rounded-custom width-half">
              {/* <div className="dropdown-grid-item">
                <h6 className="drop-heading">Useful Links</h6>
                {navCompanyLinks.map((navLink, i) => (
                  <span key={i + 1}>
                    <Link href={navLink.href}>
                      <a className="dropdown-link px-0">
                        <span className="me-2">{navLink.icon}</span>
                        <span className="drop-title mb-0">{navLink.title} </span>
                      </a>
                    </Link>
                  </span>
                ))}
              </div> */}
              <div className="dropdown-grid-item rounded-corners">
                <h6 className="drop-heading text-danger">
                  Our Anyverse Solutions
                </h6>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {/* <div className="action-btns mt-4 ps-3">
        <Link href="/login">
          <a className="btn btn-outline-primary text-decoration-none me-2">Sign In</a>
        </Link>
        <Link href="/request-demo">
          <a className="btn btn-primary">Get Started</a>
        </Link>
      </div> */}
    </div>
  );
};

export default OffCanvasMenu;
