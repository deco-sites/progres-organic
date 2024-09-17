import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const mockReview = {
  reviews: [
    {
      _id: "337892",
      aggregateRating: 4.6,
      recommendedPercentage: 100,
      reviewCount: 13,
      reviews: [
        {
          _id: "612a928939ff8f181675bae8",
          customer: "tokstok",
          sku: "337892",
          name: "Bruna Hellen dos Santos Renalvo",
          rating: 5,
          text: "Simplesmente encantada com o resultado.",
          helpful: 4,
          unhelpful: 0,
          verified: false,
          created: "2020-08-30T11:32:11.000Z",
          status: "published",
          recommended: true,
          updated: "2021-12-01T23:08:09.432Z",
        },
        {
          _id: "612a928939ff8f181675bae9",
          customer: "johndoe",
          sku: "337892",
          name: "Elisalda de De Melo Miranda",
          rating: 3,
          text: "Ótimo produto,.eu cabelo está crescendo muito.",
          helpful: 2,
          unhelpful: 1,
          verified: true,
          created: "2021-01-15T10:45:30.000Z",
          status: "published",
          recommended: true,
          updated: "2021-12-02T15:12:00.432Z",
        },
      ],
    },
  ],
};

export default function Section({ page }: Props) {
  if (!page || !page.product) return null;

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <div class="md:px-[132px] md:w-[1440px]  mx-auto text-primary">
      {page.product.review ? (
        <div>
          <script
            async
            src="https://reviews.konfidency.com.br/progressivaorganica/loader.js"
          />
          <div class="konfidency-reviews-details"></div>
          <p>oi</p>
        </div>
      ) : (
        <div>
          <div class="flex justify-between mb-[29px]">
            <div class="flex gap-10 items-start">
              <div class="border-b-2 border-primary leading-1 p-2">
                <span>Avaliações</span>
              </div>
              <div class="leading-1 h-[42px] flex items-center">
                <span>Perguntas</span>
              </div>
            </div>
            <div class="flex gap-5 ">
              <div class="btn btn-outline btn-primary w-[127px] h-[42px] min-h-0">
                <span>Avaliar</span>
              </div>
              <div class="btn btn-outline btn-primary w-[127px] h-[42px]  min-h-0">
                <span>Perguntar</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-6 ">
            {mockReview.reviews.map((review) =>
              review.reviews.map((item) => (
                <div class="border border-primary h-[250px] w-full max-w-[576px] min-w-[300px] p-3 rounded">
                  <p class="text-[12px] h-[51px] w-full text-end">
                    {formatDate(item.created)}
                  </p>
                  <p class="text-sm h-[148px]">{item.text}</p>
                  <p class="text-base font-bold text-center h-[51px]">
                    {item.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
