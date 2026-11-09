import { Center, Spinner } from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";

const MotionCenter = motion.create(Center);
const ease = cubicBezier(0.3, 1, 0.16, 1);

const LoadingState = () => {
  return (
    <MotionCenter
      width="100%"
      height="100dvh"
      initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      animate={{ clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0 100%)" }}
      exit={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      }}
      transition={{ duration: 0.4, ease }}
    >
      <Spinner size={{ md: "lg", base: "xl" }} color="var(--terracotta-deep)" />
    </MotionCenter>
  );
};

export default LoadingState;
