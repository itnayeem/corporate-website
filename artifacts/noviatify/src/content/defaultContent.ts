import { site } from "./defaults/site";
import { home } from "./defaults/home";
import { howItWorks } from "./defaults/howItWorks";
import { services } from "./defaults/services";
import { about } from "./defaults/about";
import { pricing } from "./defaults/pricing";

export const defaultContent = {
  site,
  home,
  howItWorks,
  services,
  about,
  pricing,
};

export type SiteContent = typeof defaultContent;
