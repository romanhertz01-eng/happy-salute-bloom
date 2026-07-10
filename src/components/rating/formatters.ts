import type { FundingMethod, KycStatus } from "@/lib/types";

export const NO_DATA = "нет данных"; // П-3

export function formatText(value: string | null): string {
  return value ?? NO_DATA;
}

export function formatKyc(kyc: KycStatus | null): string {
  if (!kyc) return NO_DATA;
  return kyc === "yes" ? "да" : kyc === "no" ? "нет" : "частично";
}

const FUNDING_LABEL: Record<FundingMethod, string> = {
  sbp: "СБП",
  crypto: "Crypto",
  usdt: "USDT",
  transfer: "Перевод",
};

export function formatFunding(methods: FundingMethod[] | null): string {
  if (!methods || methods.length === 0) return NO_DATA;
  return methods.map((m) => FUNDING_LABEL[m]).join(" · ");
}