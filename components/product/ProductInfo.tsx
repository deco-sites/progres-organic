import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
//import ShippingSimulationForm from "../shipping/Form.tsx";
import AddToCartProductDetail from "./AddToCartProductDetail.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import type { ProductIcon } from "./AddToCartProductDetail.tsx";


interface Props {
  page: ProductDetailsPage | null;
  icons: ProductIcon[];
}

function ProductInfo({ page, icons }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  //const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);

  const percent = listPrice && offers?.lowPrice
    ? Math.round(((listPrice - offers?.lowPrice) / listPrice) * 100)
    : 0;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  //Calculate the Pix Price Value
  const pixPrice = offers?.lowPrice &&
    offers?.lowPrice - offers?.lowPrice * 0.05;
  
  //Calculate Price/6
  const dividedPrice =
    offers?.lowPrice && offers?.lowPrice/6;

  return (
    <div {...viewItemEvent} class="flex flex-col" id={id}>
      {/* Price tag */}
      {/* {percent > 1 && (
        <span
          class={clx(
            "text-sm/4 font-normal text-black bg-primary bg-opacity-15 text-center rounded-badge px-2 py-1",
            percent < 1 && "opacity-0",
            "w-fit"
          )}
        >
          {percent} % off
        </span>
      )} */}

      {/* Product Name */}
      <span class={clx("md:text-3xl text-base font-semibold text-primary")}>
        {title}
      </span>

      <div class="flex md:flex-row flex-col md:items-center gap-10">
        <div>
          {/* Prices */}
          <div class="flex flex-col gap-2 pt-1">
            <span class="line-through text-sm font-medium text-gray-400">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
            <span class="text-3xl font-bold text-primary">
              {formatPrice(offers?.lowPrice, offers?.priceCurrency)}
            </span>

            {/* Value with PIX discount */}
            <span class="font-bold text-[18px] text-primary">
              {formatPrice(pixPrice, offers?.priceCurrency)} no pix
            </span>
            <span class="text-sm ">
              <strong class="font-bold text-primary">5% de desconto</strong>{" "}
              pagando com Pix
            </span>

            <div>
              <p class="text-sm text-secondary">6x de {formatPrice(dividedPrice, offers?.priceCurrency)} sem juros</p>
            </div>
          </div>

          {/* Sku Selector */}
          {/* {hasValidVariants && (
            <div className="mt-4 sm:mt-8">
              <ProductSelector product={product} />
            </div>
          )} */}
        </div>
        <div
          id="teste-review"
          class="konfidency-reviews-summary review-description ml-5"
          data-sku={productID}
        ></div>
      </div>

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock" ? (
          <>
            <AddToCartProductDetail
              item={item}
              seller={seller}
              product={product}
              class="btn btn-primary no-animation"
              disabled={false}
              icons={icons}
            />
          </>
        ) : (
          <OutOfStock productID={productID} />
        )}
      </div>

      {/* Shipping Simulation */}
      {
        //   <div class="mt-8">
        //   <ShippingSimulationForm
        //     items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
        //   />
        // </div>
      }

      <script
        async
        src="https://reviews.konfidency.com.br/progressivaorganica/loader.js"
      />
    </div>
  );
}

export default ProductInfo;
