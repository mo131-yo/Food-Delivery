import { useContext } from "react";
import { UserContext } from "../../context";
import { HeaderAddressSelectButton } from ".././header/HeaderAddressSelectButton";
import { HeaderCartButton } from "..//header/HeaderCartButton";
import { HeaderUserProfileIcon } from "..//header/HeaderUserProfileIcon";
import HeaderUserInformationSkeleton from "..//header/HeaderUserInformationSkeleton";

type UserToolbarProps = {
  openSidebar: () => void;
};

export const UserToolbar = ({ openSidebar }: UserToolbarProps) => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <HeaderUserInformationSkeleton />;
  }
  return (
    <>
      <HeaderAddressSelectButton />
      <HeaderCartButton openSidebar={openSidebar} />
      <HeaderUserProfileIcon />
    </>
  );
};
