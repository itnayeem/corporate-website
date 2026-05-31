import { site } from "./defaults/site";
import { home } from "./defaults/home";
import { howItWorks } from "./defaults/howItWorks";
import { services } from "./defaults/services";
import { about } from "./defaults/about";

export const defaultContent = {
  site,
  home,
  howItWorks,
  services,
  about,
};

export type SiteContent = typeof defaultContent;
