import { SectionProps } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";

interface NoticeProps {
  title?: string;
  description?: string;
}

export interface Props {
  title?: string;
  description?: string;
  success?: NoticeProps;
  failed?: NoticeProps;

  /** @description Nome placeholder */
  placeholderName?: string;

  /** @description Input placeholder */
  placeholderEmail?: string;

  /** @hide true */
  status?: "success" | "failed";
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();

  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;
  const name = `${form.get("name") ?? ""}`;

  if (platform === "vnda") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("site/actions/sendEmailJS.ts", {
      name,
      email,
    });

    return { ...props, status: "success" };
  }

  return { ...props, status: "failed" };
}

export function loader(props: Props) {
  return { ...props, status: undefined };
}

function Notice({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div class="flex flex-col justify-center items-center sm:items-start gap-4">
      <span class="text-3xl font-semibold text-center sm:text-start">
        {title}
      </span>
      <span class="text-sm font-normal text-base-400 text-center sm:text-start">
        {description}
      </span>
    </div>
  );
}

function Newsletter({
  title,
  description,
  success = {
    title: "Thank you for subscribing!",
    description:
      "You’re now signed up to receive the latest news, trends, and exclusive promotions directly to your inbox. Stay tuned!",
  },
  failed = {
    title: "Oops. Something went wrong!",
    description:
      "Something went wrong. Please try again. If the problem persists, please contact us.",
  },
  placeholderName = "Digite seu nome aqui!",
  placeholderEmail = "Digite seu e-mail aqui",
  status,
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <Section.Container class="bg-base-200">
        <div class="p-10 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
          <Icon
            size={80}
            class={clx(status === "success" ? "text-primary" : "text-error")}
            id={status === "success" ? "check-circle" : "error"}
          />
          <Notice {...(status === "success" ? success : failed)} />
        </div>
      </Section.Container>
    );
  }

  return (
    <div class="bg-primary text-base-200 mb-8">
      <div class="flex flex-col ">
        <div class="flex flex-col justify-center items-center  pt-6">
          <span class="uppercase text-base">Newsletter</span>
          <span class="text-2xl font-semibold text-center pt-9 uppercase">
            {title}
          </span>
          <span class="text-base font-normal text-center pt-4">
            {description}
          </span>
        </div>

        <form
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          class="flex flex-col items-center lg:flex-row gap-4 mx-auto pt-[60px] pb-12"
        >
          <input
            name="name"
            class="input input-bordered lg:w-[365px] h-[56px] w-[330px] text-secondary"
            type="text"
            placeholder={placeholderName}
          />
          <input
            name="email"
            class="input input-bordered w-[330px] lg:w-[551px] h-[56px] text-secondary"
            type="text"
            placeholder={placeholderEmail}
          />

          <button class="btn btn-base-200 w-[189px] h-[56px]" type="submit">
            <span class="[.htmx-request_&]:hidden inline uppercase">
              Enviar
            </span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
          </button>
        </form>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="412px" />;

export default Newsletter;
