import { Component, type ComponentType } from "preact";
import { toFileUrl } from "std/path/mod.ts";
import type { AppContext } from "../apps/site.ts";
import { useSection } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";

interface Props {
  component: string;
  props?: Record<string, unknown>;
}

export type ComponentProps<LoaderFunc, ActionFunc = LoaderFunc> = SectionProps<
  LoaderFunc,
  ActionFunc
>;

const ROOT = toFileUrl(Deno.cwd()).href;

export class ErrorBoundary extends Component<{
  fallback?: ComponentType<{ error: Error }>;
}, { error: Error | null }> {
  override state = { error: null };

  static override getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    const error = this.state.error;

    if (error && Fallback) {
      return <Fallback error={error} />;
    }

    return <>{children}</>;
  }
}

export function useComponent<T = Record<string, unknown>>(
  component: string,
  props?: T,
  otherProps: { href?: string } = {},
) {
  return useSection({
    ...otherProps,
    props: {
      props,
      component: component.replace(ROOT, ""),
      __resolveType: "site/sections/Component.tsx",
    },
  });
}

const identity = <T,>(x: T) => x;

export const loader = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  try {
    const { default: Component, loader, action, ErrorFallback } = await import(
      `${ROOT}${component}`
    );
    if (!Component) throw new Error(`Componente não definido: ${component}`);

    const p = await (loader || action || identity)(props, req, ctx);
    return {
      Component: () => (
        <ErrorBoundary fallback={ErrorFallback || fallbackComponent}>
          <Component {...p} />
        </ErrorBoundary>
      ),
    };
  } catch (error) {
    const err = error as Error; // Converta para o tipo Error
    console.error("Erro ao carregar o componente:", err.message);
    return {
      Component: () => <div>Erro ao carregar componente 1: {err.message}</div>,
    };
  }
};

export const action = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  try {
    const { default: Component, action, loader, ErrorFallback } = await import(
      `${ROOT}${component}`
    );
    if (!Component) throw new Error(`Componente não definido: ${component}`);

    const p = await (action || loader || identity)(props, req, ctx);
    return {
      Component: () => (
        <ErrorBoundary fallback={ErrorFallback || fallbackComponent}>
          <Component {...p} />
        </ErrorBoundary>
      ),
    };
  } catch (error) {
    const err = error as Error; // Converta para o tipo Error
    console.error("Erro ao carregar o componente:", err.message);
    return {
      Component: () => <div>Erro ao carregar componente 2: {err.message}</div>,
    };
  }
};

export default function Section({ Component }: { Component: any }) {
  return <Component />;
}

const fallbackComponent = () => <div>Erro ao carregar componente 3.</div>;
