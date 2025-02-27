import Section from "../components/ui/Section.tsx";

export default function ReviewPDP() {
  return (
    <div class="max-w-[800px] max-h-[470px] mx-auto overflow-y-auto lg:border lg:border-primary rounded-lg">
      <div class="konfidency-reviews-details max-w-[800px] mx-auto  p-5"></div>
      {
        /* <script
        defer
        src="https://reviews.konfidency.com.br/progressivaorganica/loader.js"
      /> */
      }
    </div>
  );
}

export const LoadingFallback = () => (
  <Section.Container>
    <Section.Placeholder height="508px" />;
  </Section.Container>
);
