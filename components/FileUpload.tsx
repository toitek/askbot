import React, { useEffect, useState } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface Props {
  setFilesUpload: (file: string[]) => void;
}

function FilePondUpload({ setFilesUpload }: Props) {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    setFilesUpload(files);
  }, [files, setFilesUpload]);

  return (
    <FilePond
      allowMultiple={true}
      acceptedFileTypes={["text/plain", "json"]}
      files={files}
      onupdatefiles={setFiles}
      maxFiles={3}
      allowReorder={true}
    />
  );
}
export default FilePondUpload;
