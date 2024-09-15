import { ProductDetailsPage } from "apps/commerce/types.ts";
import SectionUi from "../components/ui/Section.tsx";
import { useSendEvent } from "../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../sdk/useOffer.ts";
import { useId } from "../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../sdk/clx.ts";
import { relative } from "../sdk/url.ts";
import { formatPrice } from "../sdk/format.ts";
import AddToCartButton from "../components/product/AddToCartButton.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { url, productID, offers, isVariantOf, image: pImages } = product;
  //const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const relativeUrl = relative(url);

  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);

  const inStock = availability === "https://schema.org/InStock";

  const percent =
    listPrice && offers?.lowPrice
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
  const hasValidVariants =
    isVariantOf?.hasVariant?.some(
      (variant) =>
        variant?.name?.toLowerCase() !== "title" &&
        variant?.name?.toLowerCase() !== "default title"
    ) ?? false;

  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const cardImage = groupImages[0];

  console.log(cardImage);

  return (
    <div class="container flex gap-4 sm:gap-5 w-full pt-8 items-center py-5">
      <div class="relative card card-compact group text-sm hover:shadow-lg p-3 w-[147px] h-[225px] justify-center items-center">
        <a href={relativeUrl} class="">
          <Image
            class="object-contain w-[145px]"
            src={cardImage.url || ""}
            alt={cardImage.alternateName}
            width={145}
            height={160}
            loading={"lazy"}
          />
          <div
            class={clx(
              "text-[7px] font-bold text-base-200 bg-primary text-center rounded-badge w-[25px] h-[25px]",
              "absolute top-0 left-0 flex flex-col items-center justify-center",
              " leading-tight",
              (percent < 1 || !inStock) && "opacity-0"
            )}
          >
            <span>{percent}%</span>
            <span>off</span>
          </div>
        </a>
        <div class="flex flex-col justify-center items-center  w-full">
          <a href={relativeUrl} class="pt-2 flex flex-col items-center w-full">
            <span class="text-sm text-secondary">{title}</span>

            <div class="flex flex-col  pt-2">
              {listPrice && (
                <span class="line-through font-normal text-[11px] text-gray-600">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <span class="font-bold text-base text-warning">
                {formatPrice(offers?.lowPrice, offers?.priceCurrency)}
              </span>
            </div>
          </a>

          {/* SKU Selector */}
          {/* {variants.length > 1 && firstVariantName !== shoeSizeVariant && (
          <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto border border-primary">
            {variants
              .map(([value, link]) => [value, relative(link)] as const)
              .map(([value, link]) => (
                <li>
                  <a href={link} class="cursor-pointer">
                    <input
                      class="hidden peer"
                      type="radio"
                      name={`${id}-${firstSkuVariations?.[0]}`}
                      checked={link === relativeUrl}
                    />
                    <Ring value={value} checked={link === relativeUrl} />
                  </a>
                </li>
              ))}
          </ul>
        )} */}

          <div class="flex-grow pt-3" />

          {/* <div>
            {inStock ? (
              <AddToCartButton
                product={product}
                seller={seller}
                item={item}
                class={clx("btn btn-primary no-animation w-full")}
                icon={
                  "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/progres-organic/9b758649-d701-4193-9cfd-7700099f3cc9/cartPlus.svg"
                }
              />
            ) : (
              <a
                href={relativeUrl}
                class={clx(
                  "btn",
                  "btn-outline justify-center  !text-[12px] !font-medium px-0 no-animation w-full",
                  "text-center border border-secondary btn-secondary min-h-0 h-[26px]"
                )}
              >
                Fora de estoque
              </a>
            )}
          </div> */}
        </div>
      </div>

      <div class="py-auto w-[25px] h-[25px]">
        <p class="w-full h-full text-xl font-bold text-base-200 bg-secondary rounded-full flex items-center justify-center">
          +
        </p>
      </div>

      <div class="relative card card-compact group text-sm hover:shadow-lg p-3 w-[147px] h-[225px] justify-center items-center">
        <a href={relativeUrl} class="">
          <Image
            class="object-contain w-[145px]"
            src={cardImage.url || ""}
            alt={cardImage.alternateName}
            width={145}
            height={160}
            loading={"lazy"}
          />
          <div
            class={clx(
              "text-[7px] font-bold text-base-200 bg-primary text-center rounded-badge w-[25px] h-[25px]",
              "absolute top-0 left-0 flex flex-col items-center justify-center",
              " leading-tight",
              (percent < 1 || !inStock) && "opacity-0"
            )}
          >
            <span>{percent}%</span>
            <span>off</span>
          </div>
        </a>
        <div class="flex flex-col justify-center items-center  w-full">
          <a href={relativeUrl} class="pt-2 flex flex-col items-center w-full">
            <span class="text-sm text-secondary">{title}</span>

            <div class="flex flex-col  pt-2">
              {listPrice && (
                <span class="line-through font-normal text-[11px] text-gray-600">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <span class="font-bold text-base text-warning">
                {formatPrice(offers?.lowPrice, offers?.priceCurrency)}
              </span>
            </div>
          </a>
        </div>
      </div>
      <div class="py-auto w-[25px] h-[25px]">
        <p class="w-full h-full text-xl font-bold text-base-200 bg-secondary rounded-full flex items-center justify-center">
          =
        </p>
      </div>

      <div class="flex flex-col items-center">
        <p class="text-sm font-semibold ">Valor total:</p>
        <p class="text-lg font-bold text-warning">R$00,00</p>
        <button class="btn btn-outline btn-primary">Adicionar os 2 produtos no carrinho</button>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <SectionUi.Placeholder height="635px" />;
