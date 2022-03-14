import React from "react";
import { Link as LinkDom } from "react-router-dom";
import { Link } from "react-scroll";
import "../../styles/footer.scss";
import {
  BsArrowUpCircle,
  BsFacebook,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function Footer() {
  return (
    <div className="FooterParent">
      <footer className="Footer">
        <div className="Footer-LEFT">
          <h5>Staff Room</h5>
          <p>
            Staff Room is a portal to connect freelancers looking for gig work
            /Employers looking for short term event or shift cover.
          </p>
        </div>

        <div className="Footer-MIDDLE">
          <h5>Get Started</h5>

          <p>Freelancer looking for work or Employer looking for staff?</p>
          <span>
            <LinkDom to="freelancer-signUp">
              Sign Up Now as a freelancer
            </LinkDom>
          </span>
          <span>
            <LinkDom to="company-signUp">Sign Up Now as an Employer</LinkDom>
          </span>
        </div>

        <div className="FOOTER-RIGHT">
          <h5>Contact Us</h5>

          <span>
            <a href="mailto:staff.room.server@gmail.com">
              staff.room.service@gmail.com
            </a>
          </span>
          <ul className="Social-Footer">
            <li>
              <a href="https://www.facebook.com/" title="Facebook">
                <BsFacebook className="SocialIcons" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" title="Twitter">
                <BsTwitter className="SocialIcons" />
                Twitter
              </a>
            </li>
            <li>
              <a title="instagram" href="https://www.instagram.com/">
                <BsInstagram className="SocialIcons" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="Footer-Copyright">
        <p>Staff Room © 2021. All rights reserved.</p>

        <Link
          to="goTop"
          spy={true}
          smooth={true}
          offset={0}
          duration={200}
          delay={500}
        >
          <BsArrowUpCircle />
        </Link>
      </div>
    </div>
  );
}
