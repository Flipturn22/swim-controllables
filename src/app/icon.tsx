import { ImageResponse } from "next/og";
import { FlipturnIconMarkup } from "@/lib/brand-icon-markup";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<FlipturnIconMarkup size={512} />, size);
}
