import React from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CloseIcon from "@/assets/icons/icon-close.png";
import { Button } from "@/components/ui/button";
import { closeModalWarning } from "@/redux/modal-warning/action";
import { Dispatch } from "redux";
import { IModalState } from "@/redux/modal-warning/interface";

interface IModalWarningProps extends IModalState {
  closeModalWarning: () => void;
}

const ModalWarningComponent: React.FC<IModalWarningProps> = (props) => {
  const {
    isShow,
    image,
    title,
    description,
    labelBtnFirst,
    fnBtnFirst,
    labelBtnSecond,
    fnBtnSecond,
    closeModalWarning,
  } = props;

  return (
    <Dialog open={isShow}>
      <DialogContent className="w-[90%] bg-white rounded-lg">
        <div className="flex justify-end">
          <img
            src={CloseIcon}
            className="w-3 h-3 cursor-pointer"
            alt="icon close"
            onClick={() => closeModalWarning()}
          />
        </div>
        <DialogHeader className="flex flex-col items-center gap-2">
          {image && <img src={image} className="w-11 h-11" alt="icon" />}
          <div>
            {title && (
              <DialogTitle className="text-[16px] font-semibold">
                {title}
              </DialogTitle>
            )}

            {description && (
              <div className="mt-1">
                {description.split("<enter>").map((str, index) => {
                  if (str === "") {
                    return <br />;
                  } else {
                    return (
                      <DialogDescription
                        className="text-[14px] text-center"
                        key={index}
                      >
                        {str}
                      </DialogDescription>
                    );
                  }
                })}
              </div>
            )}
          </div>

          {fnBtnFirst && fnBtnSecond ? (
            <div className="flex justify-center w-full gap-4">
              {fnBtnFirst && (
                <Button
                  className="w-[30%]"
                  variant={"outline"}
                  onClick={() => fnBtnFirst()}
                >
                  {labelBtnFirst}
                </Button>
              )}
              {fnBtnSecond && (
                <Button className="w-[30%]" onClick={() => fnBtnSecond()}>
                  {labelBtnSecond}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex justify-center w-full">
              {fnBtnFirst && (
                <Button className="w-[60%]" onClick={() => fnBtnFirst()}>
                  {labelBtnFirst}
                </Button>
              )}
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModalWarning: () => closeModalWarning(dispatch),
});

const mapStateToProps = (state: { modalWarning: IModalState }) => ({
  isShow: state?.modalWarning?.isShow,
  image: state?.modalWarning?.image,
  title: state?.modalWarning?.title,
  description: state?.modalWarning?.description,
  labelBtnFirst: state?.modalWarning?.labelBtnFirst,
  fnBtnFirst: state?.modalWarning?.fnBtnFirst,
  labelBtnSecond: state?.modalWarning?.labelBtnSecond,
  fnBtnSecond: state?.modalWarning?.fnBtnSecond,
});

const ModalWarning = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWarningComponent);

export default ModalWarning;
