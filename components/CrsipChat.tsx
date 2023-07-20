"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("e06a52ca-ed1b-460c-bf11-7ebd07d2279a");
  }, []);

  return null;
};
