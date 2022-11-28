import { FootmanPinIcon, CyclistPinIcon } from "components/icons";
import { activityCode } from "./data";

type Props = {
  height?: number;
  color?: string;
  onClick?: () => void;
};
export function getIcon(code: string, props?: Props) {
  const dict: Record<string, JSX.Element> = {
    bike: <CyclistPinIcon {...props} />,
    foot: <FootmanPinIcon {...props} />,
  };
  return dict[activityCode[code]] || <FootmanPinIcon {...props} />;
}
export function getIconUrl(code: string) {
  const dict: Record<string, string> = {
    bike: "/image/icons/cyclist-circle.svg",
    foot: "/image/icons/footman-circle.svg",
  };
  return dict[activityCode[code]] || "/image/icons/footman-circle.svg";
}
