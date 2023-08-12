import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { CustomButtons } from "./ButtonSubmit";

export function CustomDropzone() {
  const [file, setFile] = useState<File>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/plain": [".txt"] },
    onDrop: (acceptedFiles, filesRejections) => {
      const file = acceptedFiles[0];

      if (filesRejections.length) {
        const [fileRejection] = filesRejections;
        const { errors } = fileRejection;
        const [error] = errors;

        if (error) {
          return toast.error(error.message);
        }
      }

      if (!file) {
        return;
      }
      setFile(file);
      toast.success("Arquivo adicionado com sucesso");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClearFile = () => {
    setFile(undefined);
  };

  return (
    <>
      <div className="file-uploader">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arraste e solte arquivos .txt aqui ou clique para selecionar.</p>
        </div>
        {file && <p>{file.name}</p>}
      </div>

      {file && <CustomButtons clearFile={handleClearFile} file={file} />}
    </>
  );
}
