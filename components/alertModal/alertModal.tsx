import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const AlertModal = ({ isOpen, setOpen, action }: any) => {
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <form
          onSubmit={(event) => {
            wait().then(() => setOpen(false));
            event.preventDefault();
          }}
        >
          {/** some inputs */}
          <button type="submit">Submitss</button>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Copy</AlertDialogCancel>
          <AlertDialogAction onClick={() => action()}>
            Print Tag
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
