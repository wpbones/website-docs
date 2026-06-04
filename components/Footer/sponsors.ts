export interface Sponsor {
  key: string;
  name: string;
  /** GitHub username — the avatar is resolved as https://github.com/<github>.png */
  github: string;
  /** Optional website to link instead of the GitHub profile */
  href?: string;
}

/**
 * Current GitHub sponsors of the WPBones organization, shown in the footer sponsors wall.
 * WPBones has its own sponsor profile (https://github.com/sponsors/wpbones) — do NOT
 * sync this list with the personal gfazioli sponsors list.
 */
export const sponsors: Sponsor[] = [];
