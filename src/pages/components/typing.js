import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { TypeAnimation } from "react-type-animation";

function Typing() {
  return (
    <BrowserOnly fallback={<div style={{ fontSize: "2em", minHeight: "1.5em" }}>Let's do some cloud computing</div>}>
      {() => (
        <div>
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              500,
              "Let's do some cloud computing", // initially rendered starting point
              1000,
              "Let's prepare for certifications",
              1000,
              "Let's learn Kubernetes",
              1000,
              "Let's start with the basics",
              500,
            ]}
            speed={50}
            style={{ fontSize: "2em" }}
            repeat={Infinity}
          />
        </div>
      )}
    </BrowserOnly>
  );
}

export default Typing;
