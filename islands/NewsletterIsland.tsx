import { useRef, useState } from "preact/hooks";
import { invoke } from "../runtime.ts";
import { Secret } from "apps/website/loaders/secret.ts";

// export interface EmailJSProps {
//   serviceId: string;
//   templateId: string;
//   publicKey: string;
//   privateKey: Secret;
// }

const NewsletterIsland = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const nameInput = formRef.current?.querySelector(
      "#nameInput",
    ) as HTMLInputElement;
    const emailInput = formRef.current?.querySelector(
      "#emailInput",
    ) as HTMLInputElement;

    const name = nameInput.value.trim().length > 2;
    const email = emailInput.value.trim();

    // Adicione mais validações conforme necessário
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
        .test(
          email,
        );

    setIsFormValid(name && isEmailValid);
  };

  const sendEmail = async (e: Event) => {
    e.preventDefault();

    if (formRef.current) {
      const nomeInput = formRef.current.querySelector(
        "#nameInput",
      ) as HTMLInputElement;
      const name = nomeInput.value;

      const emailInput = formRef.current.querySelector(
        "#emailInput",
      ) as HTMLInputElement;
      const email = emailInput.value;

      // Verifica se o formulário é válido antes de enviar
      if (isFormValid) {
        await invoke("site/actions/sendEmail.ts", {
          name,
          email,
        });

        formRef.current?.reset();
      } else {
        // Exibe uma mensagem de erro ou alerta ao usuário
        console.error(
          "Por favor, preencha todos os campos obrigatórios corretamente.",
        );
      }
    }
  };

  // Chama validateForm toda vez que um campo do formulário muda
  const handleInputChange = () => {
    validateForm();
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      class="flex flex-col items-center sm:flex-row gap-4 mx-auto pt-[60px] pb-12"
    >
      <input
        id="nameInput"
        name="name"
        class="input input-bordered w-[365px] h-[56px]"
        type="text"
        placeholder="Digite seu nome aqui!"
        onChange={handleInputChange}
      />
      <input
        id="emailInput"
        name="email"
        class="input input-bordered w-[365px] md:-w-[551px] h-[56px]"
        type="text"
        placeholder="Digite seu e-mail aqui!"
        onChange={handleInputChange}
      />

      <button class="btn btn-base-200 w-[189px] h-[56px]" type="submit">
        <span class="uppercase">Enviar</span>
      </button>
    </form>
  );
};

export default NewsletterIsland;
