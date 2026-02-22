import { IconType } from "react-icons";

import {
  HiOutlineHeart,
  HiOutlineRocketLaunch,
  HiOutlineUser,
} from "react-icons/hi2";

export const iconLibrary: Record<string, IconType> = {
  heart: HiOutlineHeart,
  rocket: HiOutlineRocketLaunch,
  user: HiOutlineUser,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;