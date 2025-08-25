// Utility to check if a user can access a video from a pack
// Usage: canAccessVideo(packId, purchasedPackIds)

export function canAccessVideo(packId: number, purchasedPackIds: number[]): boolean {
  return purchasedPackIds.includes(packId);
}
