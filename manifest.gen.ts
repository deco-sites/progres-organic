// DO NOT EDIT. This file is generated by deco.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $$$$$$$$$0 from "./actions/minicart/submit.ts";
import * as $$$$$$$$$1 from "./actions/sendEmailJS.ts";
import * as $$$$$$$$$2 from "./actions/wishlist/submit.ts";
import * as $$$$$$$$$$$0 from "./apps/deco/analytics.ts";
import * as $$$$$$$$$$$1 from "./apps/deco/htmx.ts";
import * as $$$$$$$$$$$2 from "./apps/deco/konfidency.ts";
import * as $$$$$$$$$$$3 from "./apps/deco/shopify.ts";
import * as $$$$$$$$$$$4 from "./apps/deco/vnda.ts";
import * as $$$$$$$$$$$5 from "./apps/site.ts";
import * as $$$0 from "./loaders/availableIcons.ts";
import * as $$$1 from "./loaders/icons.ts";
import * as $$$2 from "./loaders/minicart.ts";
import * as $$$3 from "./loaders/user.ts";
import * as $$$4 from "./loaders/wishlist.ts";
import * as $$$$$$0 from "./sections/Animation/Animation.tsx";
import * as $$$$$$1 from "./sections/BoughtTogether.tsx";
import * as $$$$$$2 from "./sections/Category/CategoryBanner.tsx";
import * as $$$$$$3 from "./sections/Category/CategoryGrid.tsx";
import * as $$$$$$4 from "./sections/Component.tsx";
import * as $$$$$$5 from "./sections/Content/Faq.tsx";
import * as $$$$$$6 from "./sections/Content/Hero.tsx";
import * as $$$$$$7 from "./sections/Content/Intro.tsx";
import * as $$$$$$8 from "./sections/Content/Logos.tsx";
import * as $$$$$$9 from "./sections/Footer/Footer.tsx";
import * as $$$$$$10 from "./sections/Header/Header.tsx";
import * as $$$$$$11 from "./sections/HeroBar.tsx";
import * as $$$$$$12 from "./sections/Images/Banner.tsx";
import * as $$$$$$13 from "./sections/Images/Carousel.tsx";
import * as $$$$$$14 from "./sections/Images/ImageGallery.tsx";
import * as $$$$$$15 from "./sections/Images/ShoppableBanner.tsx";
import * as $$$$$$16 from "./sections/Images/WideBanner.tsx";
import * as $$$$$$17 from "./sections/Informations.tsx";
import * as $$$$$$18 from "./sections/Links/LinkTree.tsx";
import * as $$$$$$19 from "./sections/Miscellaneous/CampaignTimer.tsx";
import * as $$$$$$20 from "./sections/Miscellaneous/CookieConsent.tsx";
import * as $$$$$$21 from "./sections/NewSection.tsx";
import * as $$$$$$22 from "./sections/Newsletter/Newsletter.tsx";
import * as $$$$$$23 from "./sections/Product/ProductDetails.tsx";
import * as $$$$$$24 from "./sections/Product/ProductShelf.tsx";
import * as $$$$$$25 from "./sections/Product/ProductShelfTabbed.tsx";
import * as $$$$$$26 from "./sections/Product/SearchResult.tsx";
import * as $$$$$$27 from "./sections/Product/ShelfWithImage.tsx";
import * as $$$$$$28 from "./sections/Product/Wishlist.tsx";
import * as $$$$$$29 from "./sections/ProductShelfHorizontal.tsx";
import * as $$$$$$30 from "./sections/ReviewsPDP.tsx";
import * as $$$$$$31 from "./sections/Session.tsx";
import * as $$$$$$32 from "./sections/SmallBannersTop.tsx";
import * as $$$$$$33 from "./sections/Social/InstagramPosts.tsx";
import * as $$$$$$34 from "./sections/Social/WhatsApp.tsx";
import * as $$$$$$40 from "./sections/teste001.tsx";
import * as $$$$$$35 from "./sections/TextWithImage.tsx";
import * as $$$$$$36 from "./sections/Theme/Theme.tsx";
import * as $$$$$$37 from "./sections/TrackPackage.tsx";
import * as $$$$$$38 from "./sections/VideoAndImagePost.tsx";
import * as $$$$$$39 from "./sections/VideoBeforeAfter.tsx";

const manifest = {
  "loaders": {
    "site/loaders/availableIcons.ts": $$$0,
    "site/loaders/icons.ts": $$$1,
    "site/loaders/minicart.ts": $$$2,
    "site/loaders/user.ts": $$$3,
    "site/loaders/wishlist.ts": $$$4,
  },
  "sections": {
    "site/sections/Animation/Animation.tsx": $$$$$$0,
    "site/sections/BoughtTogether.tsx": $$$$$$1,
    "site/sections/Category/CategoryBanner.tsx": $$$$$$2,
    "site/sections/Category/CategoryGrid.tsx": $$$$$$3,
    "site/sections/Component.tsx": $$$$$$4,
    "site/sections/Content/Faq.tsx": $$$$$$5,
    "site/sections/Content/Hero.tsx": $$$$$$6,
    "site/sections/Content/Intro.tsx": $$$$$$7,
    "site/sections/Content/Logos.tsx": $$$$$$8,
    "site/sections/Footer/Footer.tsx": $$$$$$9,
    "site/sections/Header/Header.tsx": $$$$$$10,
    "site/sections/HeroBar.tsx": $$$$$$11,
    "site/sections/Images/Banner.tsx": $$$$$$12,
    "site/sections/Images/Carousel.tsx": $$$$$$13,
    "site/sections/Images/ImageGallery.tsx": $$$$$$14,
    "site/sections/Images/ShoppableBanner.tsx": $$$$$$15,
    "site/sections/Images/WideBanner.tsx": $$$$$$16,
    "site/sections/Informations.tsx": $$$$$$17,
    "site/sections/Links/LinkTree.tsx": $$$$$$18,
    "site/sections/Miscellaneous/CampaignTimer.tsx": $$$$$$19,
    "site/sections/Miscellaneous/CookieConsent.tsx": $$$$$$20,
    "site/sections/NewSection.tsx": $$$$$$21,
    "site/sections/Newsletter/Newsletter.tsx": $$$$$$22,
    "site/sections/Product/ProductDetails.tsx": $$$$$$23,
    "site/sections/Product/ProductShelf.tsx": $$$$$$24,
    "site/sections/Product/ProductShelfTabbed.tsx": $$$$$$25,
    "site/sections/Product/SearchResult.tsx": $$$$$$26,
    "site/sections/Product/ShelfWithImage.tsx": $$$$$$27,
    "site/sections/Product/Wishlist.tsx": $$$$$$28,
    "site/sections/ProductShelfHorizontal.tsx": $$$$$$29,
    "site/sections/ReviewsPDP.tsx": $$$$$$30,
    "site/sections/Session.tsx": $$$$$$31,
    "site/sections/SmallBannersTop.tsx": $$$$$$32,
    "site/sections/Social/InstagramPosts.tsx": $$$$$$33,
    "site/sections/Social/WhatsApp.tsx": $$$$$$34,
    "site/sections/teste001.tsx": $$$$$$40,
    "site/sections/TextWithImage.tsx": $$$$$$35,
    "site/sections/Theme/Theme.tsx": $$$$$$36,
    "site/sections/TrackPackage.tsx": $$$$$$37,
    "site/sections/VideoAndImagePost.tsx": $$$$$$38,
    "site/sections/VideoBeforeAfter.tsx": $$$$$$39,
  },
  "actions": {
    "site/actions/minicart/submit.ts": $$$$$$$$$0,
    "site/actions/sendEmailJS.ts": $$$$$$$$$1,
    "site/actions/wishlist/submit.ts": $$$$$$$$$2,
  },
  "apps": {
    "site/apps/deco/analytics.ts": $$$$$$$$$$$0,
    "site/apps/deco/htmx.ts": $$$$$$$$$$$1,
    "site/apps/deco/konfidency.ts": $$$$$$$$$$$2,
    "site/apps/deco/shopify.ts": $$$$$$$$$$$3,
    "site/apps/deco/vnda.ts": $$$$$$$$$$$4,
    "site/apps/site.ts": $$$$$$$$$$$5,
  },
  "name": "site",
  "baseUrl": import.meta.url,
};

export type Manifest = typeof manifest;

export default manifest;
