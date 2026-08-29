import type { AddonId, PackageId } from "./content";
import { pkgName, type Copy } from "./i18n";

const PACKAGE_IDS: PackageId[] = [
  "mention",
  "integration",
  "dedicated",
  "shorts",
  "pack360",
];

export function addonLabel(t: Copy, id: AddonId) {
  switch (id) {
    case "extraShort":
      return t.addExtraShort;
    case "stories":
      return t.addStories;
    case "pinned":
      return t.addPinned;
    case "exclusive":
      return t.addExclusive;
    case "rush":
      return t.addRush;
  }
}

export function lineLabel(t: Copy, id: string) {
  if (PACKAGE_IDS.includes(id as PackageId)) return pkgName(t, id);
  return addonLabel(t, id as AddonId);
}
