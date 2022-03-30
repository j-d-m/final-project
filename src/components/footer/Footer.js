import React, { useState } from "react";
import { Link as LinkDom } from "react-router-dom";
import { Link } from "react-scroll";
import "../../styles/footer.scss";
import { FaChevronUp } from "react-icons/fa";
import logo from "../../assets/img/logo.svg";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

export default function Footer() {
  const [footerIcon, setFooterIcon] = useState(false);
  return (
    <div className="FooterDiv">
      <Link
        to="goTop"
        spy={true}
        smooth={true}
        offset={0}
        duration={200}
        delay={500}
        className="goToTop"
      >
        <FaChevronUp />
      </Link>
      <div className="FooterIconDiv">
        {footerIcon ? (
          <IoMdArrowDropdownCircle
            className="arrowFooterIcon"
            onClick={() => setFooterIcon(!footerIcon)}
          />
        ) : (
          <IoMdArrowDropupCircle
            className="arrowFooterIcon"
            onClick={() => setFooterIcon(!footerIcon)}
          />
        )}
      </div>
      <footer className={footerIcon ? "footer" : "footer d-none"}>
        <div className="footer-dark">
          <div className="Container">
            <div className="footerDiv">
              <div className=" item">
                <h5>Get Started</h5>

                <p>
                  Freelancer looking for work or Employer looking for staff?
                </p>
                <ul>
                  <li>
                    <LinkDom to="freelancer-signUp">
                      Sign Up Now as a freelancer
                    </LinkDom>
                  </li>
                  <li>
                    <LinkDom to="company-signUp">
                      Sign Up Now as an Employer
                    </LinkDom>
                  </li>
                </ul>
              </div>
              <div className="item logo">
                <img src={logo} alt="img" width="200px" />
                <span className="mailLink">
                  <a href="mailto:staff.room.server@gmail.com">
                    staff.room.service@gmail.com
                  </a>
                </span>
              </div>
              <div className="item text">
                <h5>Staff Room</h5>
                <p>
                  Staff Room is a portal to connect freelancers looking for gig
                  work /Employers looking for short term event or shift cover.
                </p>
              </div>
            </div>
          </div>
          <div className=" item social">
            <a href="https://www.facebook.com/" title="Facebook">
              <BsFacebook className="SocialIcons" />
            </a>

            <a href="https://twitter.com" title="Twitter">
              <BsTwitter className="SocialIcons" />
            </a>

            <a title="instagram" href="https://www.instagram.com/">
              <BsInstagram className="SocialIcons" />
            </a>
          </div>
          <p className="copyright">Staff Room © 2021. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
