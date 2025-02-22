import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CorrectIcon from "@/assets/icons/icon-correct.png";

interface ModalSuccessProps {
  isOpen: boolean;
  title: string;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ isOpen, title }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[80%] bg-white rounded-lg py-8">
        <DialogHeader className="flex flex-col items-center gap-3">
          <img src={CorrectIcon} className="w-10 h-10" alt="icon success" />
          <DialogTitle className="text-sm font-semibold">{title}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSuccess;
