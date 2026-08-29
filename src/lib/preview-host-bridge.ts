export type PreviewHostBridgeOptions = {
  navigate?: (path: string) => void;
  getRoutePaths?: () => string[];
};

export function isSafeBridgePath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

export function installPreviewHostBridge(
  _options: PreviewHostBridgeOptions = {},
): () => void {
  return () => {};
}

export function collectRoutePathsFromTree(_routeTree: unknown): string[] {
  return [];
}
