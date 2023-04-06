import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import dynamic from "next/dynamic";
import OffCanvasMenu from "./OffCanvasMenu";
import styles from "../../styles/Home.module.css";

const Navbar = ({ navDark, classOption }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const stickyheader = document.querySelector(".main-header");
    setHeaderTop(stickyheader.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`main-header ${
        navDark ? "position-absolute" : ""
      } w-100 ${classOption}`}
    >
      <nav
        className={`navbar navbar-expand-xl z-50 ${
          navDark ? "navbar-dark" : "navbar-light"
        }  ${scroll > headerTop ? "affix" : ""}`}
      >
        <div className="container d-flex align-items-center justify-content-lg-between position-relative">
          <Link href="/" legacyBehavior>
            <a className="navbar-brand d-flex align-items-center mb-md-0 text-decoration-none">
              {scroll > headerTop || !navDark ? (
                <Image
                  width={168}
                  height={50}
                  src="/main-logo.png"
                  alt="logo"
                  className="img-fluid logo-color"
                />
              ) : (
                <Image
                  width={200}
                  height={200}
                  src="/main-logo.png"
                  alt="logo"
                  className="img-fluid logo-white"
                />
              )}
            </a>
          </Link>
          <button
            className="navbar-toggler position-absolute right-0 border-0"
            id="#offcanvasWithBackdrop"
            role="button"
          >
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBackdrop"
              aria-controls="offcanvasWithBackdrop"
            >
              <HiMenu />
            </span>
          </button>
          <div className="clearfix"></div>
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="nav col-12 col-md-auto justify-content-center main-menu">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="knowldge-hub" legacyBehavior>
                  <a className="nav-link">Knowledge Hub</a>
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Anyverse Solutions
                </a>
              </li> */}
              <li>
                <Link href="contact-us" legacyBehavior>
                  <a className="nav-link">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="action-btns text-end me-5 me-lg-0 d-none d-md-block d-lg-block">
            <Link href="login">
              <a className="btn btn-link text-decoration-none me-2">Sign In</a>
            </Link>
            <Link href="request-demo">
              <a className="btn btn-primary">Get Started</a>
            </Link>
          </div> */}
          <div className="action-btns text-end me-5 me-lg-0 d-none d-md-block d-lg-block">
            <h1 className={styles.global_font_color}>OCR Solutions</h1>
            <p className={styles.global_font_color}>Extraction Tool</p>
          </div>
          <div
            className="offcanvas offcanvas-end d-xl-none bg-soft-black"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
          >
            <div className="offcanvas-header d-flex align-items-center bg-soft-black">
              <Link href="/" legacyBehavior>
                <a className="d-flex align-items-center mb-md-0 text-decoration-none">
                  <Image
                    width={168}
                    height={50}
                    src="/logo-color.png"
                    alt="logo"
                    className="img-fluid ps-2"
                  />
                </a>
              </Link>
              <button
                type="button"
                className="close-btn text-danger"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <HiOutlineX />
              </button>
            </div>

            <OffCanvasMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
