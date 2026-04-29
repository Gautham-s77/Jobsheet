import apiClient from "./apiClient.js";

/**
 * Deletes all jobs and profile for the current anonymous Firebase session (server enforces anonymous-only).
 */
export async function purgeGuestData() {
  const response = await apiClient.delete("user/guest-data");
  return response.data;
}
