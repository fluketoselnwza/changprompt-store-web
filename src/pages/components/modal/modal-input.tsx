import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CloseIcon from "@/assets/icons/icon-close.png";
import WarningIcon from "@/assets/icons/icon-warning.png";
import CustomInput from "../custom-input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

interface IModalInputProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

type Inputs = {
  link: string;
};

const ModalInput: React.FC<IModalInputProps> = (props) => {
  const { isOpen, setIsOpen } = props;

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    navigator.clipboard.writeText(data?.link);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[90%] bg-white rounded-lg">
        <div className="flex justify-end">
          <img
            src={CloseIcon}
            className="w-3 h-3 cursor-pointer"
            alt="icon close"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <DialogHeader className="flex flex-col items-center gap-4">
          <img src={WarningIcon} className="w-11 h-11" alt="icon" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-3"
          >
            <DialogTitle className="text-[14px] font-semibold text-center">
              <p>ลิงค์สร้างใบงาน</p>
            </DialogTitle>
            <DialogDescription className="w-full">
              <CustomInput
                name="link"
                register={register("link", { required: "กรุณาระบุลิงค์" })}
              />
            </DialogDescription>
            <Button className="w-[68px]">คัดลอก</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInput;
