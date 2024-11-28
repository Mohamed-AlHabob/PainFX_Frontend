"use client";

import { useEffect, useState } from "react";
import DeleteDocumentModal from "../modals/create-video";
import ChangeStatusModal from "../modals/conform-change-status";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
 <DeleteDocumentModal />
 <ChangeStatusModal />
    </>
  )
}