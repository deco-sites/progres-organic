import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import SectionUi from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import ProductDescription from "../../components/product/ProductDescription.tsx";
import type { ProductIcon } from "../../components/product/AddToCartProductDetail.tsx";
import type { PaymentIcon } from "../../components/product/ProductInfo.tsx";
import { Head } from "$fresh/runtime.ts";
import { type Section } from "@deco/deco/blocks";
import { useDevice } from "@deco/deco/hooks";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  sections?: Section[];
  icons: ProductIcon[];
  paymentIcons?: PaymentIcon;
  showShipping: boolean;
  showIconsShipping: boolean;
  iconsShipping: ProductIcon[];
}
export default function ProductDetails(
  { page, sections, icons, paymentIcons, iconsShipping, showIconsShipping, showShipping }: Props,
) {
  const device = useDevice();
  const items = sections?.map(({ Component, props }) => (
    <div>
      <Component {...props} />
    </div>
  ));
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div class="flex justify-center items-center pt-28 pb-3 w-full">
        <div class="flex flex-col justify-center items-center gap-6">
          <span class="font-medium text-2xl">Produto não encontrado</span>
          <a href="/" class="btn no-animation">
            Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div class="flex flex-col gap-4 sm:gap-5 sm:my-10 px-5 sm:px-5 py-5 pb-10 w-full max-w-[1440px] container">
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />
      {(device === "mobile" || device === "tablet") && (
        <div class="relative gap-2 sm:gap-6 grid grid-cols-1 sm:grid-cols-4 mx-auto py-0 container">
          <div class="sm:col-span-2">
            <ImageGallerySlider page={page} />
            <ProductInfo
              page={page}
              icons={icons}
              iconsShipping={showIconsShipping ? iconsShipping : []}
              paymentIcons={paymentIcons}
              showShipping={showShipping}
              sku={page?.product.sku}
            />

            {/* <ProductDescription page={page} /> */}
            {items}
          </div>
        </div>
      )}

      {device === "desktop" && (
        <div class="relative gap-2 sm:gap-10 grid grid-cols-1 sm:grid-cols-4 mx-auto py-0 container">
          <div class="sm:col-span-2">
            <ImageGallerySlider page={page} />
            <ProductDescription page={page} />
          </div>
          <div class="sm:col-span-2">
            <ProductInfo
              page={page}
              icons={icons}
              iconsShipping={showIconsShipping ? iconsShipping : []}
              paymentIcons={paymentIcons}
              showShipping={showShipping}
              sku={page?.product.sku}
            />
            {items}
          </div>
          {
            /* <div class="hidden md:flex  xl:px-[132px] md:w-[1440px]  mx-auto text-primary pt-10 mb-8">
              <div class="konfidency-reviews-details"></div>
            </div> */
          }
        </div>
      )}
    </div>
  );
}
export const LoadingFallback = () => <SectionUi.Placeholder height="635px" />;
