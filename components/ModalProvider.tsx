"use client";

import { useEffect, useState } from "react";
import { ProModal } from "./ProModal";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <div>
    <ProModal/>
  </div>;
};

export default ModalProvider;
