import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/examples">Examples</Link>
          <Link href="/examples/diagram">Diagram</Link>
          <Link href="/examples/globe">Globe</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
