import Image from "next/image";
import React from "react";
import styles from "./NextStep.module.scss";

const NextStepPage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <Image
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTFoc2llOXA1c3BocTAyaTYzY3VmNG0yamZkb2ExZzBsb2tiYTBmZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HhyZI0mEcYFbeFOLuB/giphy.gif"
        alt="gif"
        width={600}
        height={400}
        priority
        unoptimized
      />
    </div>
  );
};

export default NextStepPage;
