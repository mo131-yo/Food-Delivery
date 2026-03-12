import { useContext } from "react";
import { UserContext } from "../../context";
import { HeaderAddressSelectButton } from "./HeaderAddressSelectButton";
import { HeaderCartButton } from "./HeaderCartButton";
import { HeaderUserProfileIcon } from "./HeaderUserProfileIcon";
import HeaderUserInformationSkeleton from "./HeaderUserInformationSkeleton";

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
