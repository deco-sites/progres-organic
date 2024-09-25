import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import SectionUi from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import ProductDescription from "../../components/product/ProductDescription.tsx";
import type { Section } from "deco/blocks/section.ts";
import type { ProductIcon } from "../../components/product/AddToCartProductDetail.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  sections?: Section[];
  icons: ProductIcon[];
}

export default function ProductDetails({ page, sections, icons }: Props) {
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
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Produto não encontrado</span>
          <a href="/" class="btn no-animation">
            Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:my-10 px-5 sm:px-5 max-w-[1440px] pb-10">
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

      <div class="container grid grid-cols-1 gap-2 py-0 sm:grid-cols-4 sm:gap-6 relative mx-auto ">
        <div class="sm:col-span-2">
          <ImageGallerySlider page={page} />
          <ProductDescription page={page} />
        </div>
        <div class="sm:col-span-2 sm:sticky sm:top-[170px] sm:h-[1500px]">
          <ProductInfo page={page} icons={icons} />
          {items}
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <SectionUi.Placeholder height="635px" />;
