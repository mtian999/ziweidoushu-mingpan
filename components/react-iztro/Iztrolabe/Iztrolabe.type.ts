import type { IztroInput } from "@/lib/hooks/iztro-hook/index.type";
import { NestedProps } from "../config/types";

export type IztrolabeProps = {
  width?: number | string;
  horoscopeDate?: string | Date;
  horoscopeHour?: number;
} & IztroInput &
  NestedProps;
