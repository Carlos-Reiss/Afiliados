import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

export function CustomDropzone() {
  const [fileName, setFileName] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/plain": [".txt"] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) {
        return;
      }
      setFileName(file.name);
      toast.success("Arquivo adicionado com sucesso");
    },
    onDropRejected(fileRejections) {
      if (fileRejections.length > 1) {
        alert("Apenas um arquivo pode ser enviado por vez");
      } else {
        const [fileRejection] = fileRejections;
        const { errors } = fileRejection;
        const [error] = errors;
        const { code } = error;
        toast.error("Formato do Arquivo é inválido: \n" + code);
      }
    },
  });

  return (
    <>
      <div className="file-uploader">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arraste e solte arquivos .txt aqui ou clique para selecionar.</p>
        </div>
        {fileName}
      </div>

      <button className="button">Enviar Arquivo</button>
    </>
  );
}
