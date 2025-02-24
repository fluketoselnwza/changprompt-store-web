import { Button } from "@/components/ui/button";
import IconUser from "@/assets/icons/icon-user.png";
import IconSidebar from "@/assets/icons/icon-sidebar.png";
import IconMenuber from "@/assets/icons/icon-menu-bar.png";
import { connect } from "react-redux";
import { openSidebarAction, hideSidebarAction } from "@/redux/sidebar/action";
import { Dispatch } from "redux";
import { ISidebarProps, ISidebarState } from "./interface";
import { useNavigate } from "react-router";

const HeaderBarComponent = (props: ISidebarProps) => {
  const { openSidebar, hideSidebar, isSidebar } = props;
  const navigate = useNavigate();

  const onSidebar = (status: boolean) => {
    console.log("onSidebar");
    if (status) {
      openSidebar();
    } else {
      hideSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_changprompt");
    navigate("/");
  };

  return (
    <div className="h-[56px] bg-white w-full fixed border-b border-[#ECECEC] z-50">
      <div className="h-full flex items-center px-[16px] justify-between">
        <div className="flex items-center justify-between w-[224px] pl-[4px] pr-[20px]">
          {isSidebar ? (
            <img
              src={IconMenuber}
              className="w-[36px] h-[36px] cursor-pointer"
              alt="icon-sidebar"
              onClick={() => onSidebar(false)}
            />
          ) : (
            <>
              <div className="flex gap-2 items-center">
                <img
                  src={"/icon-changprompt.svg"}
                  className="w-[17px] h-[17px]"
                  style={{ objectFit: "contain" }}
                  alt="logo changprompt"
                />
                <span className="font-semibold text-[16px] font-[poppins]">
                  CHANGPROMPT
                </span>
              </div>
              <img
                src={IconSidebar}
                className="w-[18px] h-[18px] cursor-pointer"
                alt="icon-sidebar"
                onClick={() => onSidebar(true)}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <img src={IconUser} className="w-[24px] h-[24px]" alt="icon user" />
          <span className="text-gray-700">0000000 : ร้านค้า</span>
          <div className="border-l border-[#F5F5F5] pl-4">
            <Button
              variant="outline"
              className="h-[38px] text-[14px] rounded-[8px]"
              onClick={handleLogout}
            >
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openSidebar: () => openSidebarAction(dispatch),
  hideSidebar: () => hideSidebarAction(dispatch),
});

const mapStateToProps = (state: { onSidebar: ISidebarState }) => ({
  isSidebar: state?.onSidebar.isSidebar,
});

const HeaderBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBarComponent);

export default HeaderBar;
