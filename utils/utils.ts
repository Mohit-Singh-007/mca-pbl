export function getUrlStatus(
  status: "ACTIVE" | "EXPIRED",
  expiresAt?: Date,
): "ACTIVE" | "EXPIRED" {
  if (status === "EXPIRED") return "EXPIRED";

  if (expiresAt && new Date(expiresAt).getTime() < Date.now()) {
    return "EXPIRED";
  }

  return "ACTIVE";
}
