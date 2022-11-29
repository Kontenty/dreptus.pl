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

export const sortTrips = (a: { number: string }, b: { number: string }) => {
  const is1Hash = a.number.charAt(0) === "#";
  const is2Hash = b.number.charAt(0) === "#";
  if (is1Hash && is2Hash) {
    return Number(a.number.replace("#", "")) < Number(b.number.replace("#", ""))
      ? -1
      : 1;
  }
  if (is1Hash) return 1;
  if (is2Hash) return -1;
  const n1 = Number(a.number);
  const n2 = Number(b.number);
  if (Number.isNaN(n1) && Number.isNaN(n2)) {
    if (a.number[0] < b.number[0]) {
      return -1;
    } else if (a.number[0] > b.number[0]) {
      return 1;
    }
    return a.number.substring(1) < b.number.substring(1) ? -1 : 1;
  }
  if (Number.isNaN(n1)) {
    return -1;
  }
  if (Number.isNaN(n2)) {
    return 1;
  }

  if (n1 < n2) {
    return -1;
  } else if (n1 > n2) {
    return 1;
  }
  return 0;
};
