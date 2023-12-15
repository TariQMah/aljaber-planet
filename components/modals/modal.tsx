"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface LoadingModalProps {
  isOpen: boolean;
  loading: boolean;
}
export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Loading..."
        description="this may take some seconds."
        isOpen={isOpen}
      />
    </>
  );
};
