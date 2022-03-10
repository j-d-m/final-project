import React from "react";
import { Link } from "react-scroll";
import "../../styles/footer.scss";
import { BsArrowUpCircle } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="Footer-Left">
        <p>footer left</p>
      </div>
      <div className="Footer-Center">
        <p>Footer Center</p>
      </div>

      <div className="Footer-Right">
        <p>footer right</p>
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
