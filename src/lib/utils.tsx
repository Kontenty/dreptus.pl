import { CyclistPinIcon, FootmanPinIcon } from "components/icons";
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

export const sortTrips = (
  a: { number: string | null | undefined },
  b: { number: string | null | undefined }
) => {
  if (typeof a.number !== "string" || typeof b.number !== "string") {
    return 0;
  }

  const s1 = a.number;
  const s2 = b.number;

  // prefix checks are handled by the `group` function below

  const group = (str: string) => {
    if (str.charAt(0) === "#") {
      return 2; // hashes last
    }
    if (/[A-Za-z]/.test(str.charAt(0))) {
      return 0; // letter-prefixed first
    }
    if (/[0-9]/.test(str.charAt(0))) {
      return 1; // plain numbers next
    }
    return 3; // unknowns last after hashes
  };

  const g1 = group(s1);
  const g2 = group(s2);
  if (g1 !== g2) {
    return g1 < g2 ? -1 : 1;
  }

  // same group: compare inside group
  const compareNumeric = (x: number, y: number) => {
    if (Number.isNaN(x) && Number.isNaN(y)) {
      return 0;
    }
    if (Number.isNaN(x)) {
      return -1;
    }
    if (Number.isNaN(y)) {
      return 1;
    }
    return x < y ? -1 : x > y ? 1 : 0;
  };

  if (g1 === 0) {
    // letter-prefixed, compare letter then numeric part
    const l1 = s1.charAt(0).toUpperCase();
    const l2 = s2.charAt(0).toUpperCase();
    if (l1 < l2) {
      return -1;
    }
    if (l1 > l2) {
      return 1;
    }
    const n1 = Number(s1.substring(1));
    const n2 = Number(s2.substring(1));
    return (
      compareNumeric(n1, n2) || (s1.substring(1) < s2.substring(1) ? -1 : 1)
    );
  }

  if (g1 === 1) {
    // plain numbers
    const n1 = Number(s1);
    const n2 = Number(s2);
    return compareNumeric(n1, n2) || (s1 < s2 ? -1 : 1);
  }

  if (g1 === 2) {
    // hashes
    const n1 = Number(s1.replace("#", ""));
    const n2 = Number(s2.replace("#", ""));
    return compareNumeric(n1, n2) || (s1 < s2 ? -1 : 1);
  }

  return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
};

export const formatDate = (date: string | Date) => {
  if (!date) {
    return "";
  }
  const dateObject = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObject.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObject);
};
