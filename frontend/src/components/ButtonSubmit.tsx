import { toast } from "react-hot-toast";
import { ButtonSubmitProps } from "../types";
import { useTransactions } from "../hooks/useTransactions";

export function CustomButtons({ file, clearFile, ...rest }: ButtonSubmitProps) {
  const { fetchTransactions } = useTransactions();

  const handleSubmit = () => {
    if (!file) {
      toast.error("Selecione um arquivo antes de fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3030/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Formato do arquivo é inválido.");
        }

        return response.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        toast.success("Arquivo enviado com sucesso.");
        clearFile();
        fetchTransactions();
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao fazer o upload do arquivo. \n" + error);
      });
  };

  return (
    <>
      <button onClick={handleSubmit} className="button" {...rest}>
        Enviar Arquivo
      </button>
      <button className="button" onClick={clearFile}>
        Remover
      </button>
    </>
  );
}
