import React, { useRef, useState } from "react";
import styles from "./DraggableUploader.module.scss";
import { AnchorButton, Icon, Intent, ProgressBar } from "@blueprintjs/core";
import Image from "next/image";
import { useMutation } from "graphql-hooks";
import { TypeImage } from "../../api-client/types";
import { GraphQLError } from "graphql";
import handleError from "../../lib/handle-api-error";

const UPLOAD_MUTATION = `
  mutation UploadMutation($file: Upload!) {
    image:uploadImage(file: $file) {
      id
      url
    }
  }
`;

type FileInfo = {
  id?: string;
  url?: string;
  data: string;
  file?: File;
  loading: boolean;
};

type Props = {
  limit?: number;
  images?: Omit<FileInfo, "loading">[];
  onChange?: (files: FileInfo[]) => void;
};

const fileExists = (files: FileInfo[], file: File) =>
  files.find(
    (it) => it.file && it.file.name === file.name && it.file.size === file.size
  );

export default function DraggableUploader({
  limit = 5,
  images,
  onChange
}: Props) {
  const [uploadMutation] = useMutation<
    { image: TypeImage },
    object,
    GraphQLError
  >(UPLOAD_MUTATION);

  const [files, setFiles] = useState<FileInfo[]>(
    (images || []).map((it) => ({ ...it, loading: false }))
  );

  onChange && onChange(files);

  function onFileLoad(
    e: React.DragEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) {
    const fileList = e.currentTarget.files || new FileList();

    for (const item of Array.from(fileList)) {
      if (files.length >= limit) continue;
      if (fileExists(files, item)) continue;

      let fileReader = new FileReader();
      fileReader.onload = () => {
        const file: FileInfo = {
          file: item,
          data: fileReader.result as never,
          loading: true
        };

        addLoadedFile(file);
        uploadFile(file);
      };

      fileReader.readAsDataURL(item);
    }
  }

  async function uploadFile(file: FileInfo) {
    if (!file.file) return;

    const { data, error } = await uploadMutation({
      variables: { file: file.file }
    });

    if (error) {
      handleError(error);
      removeLoadedFile(file);
    } else if (data) {
      updateLoadedFile(file, { ...file, loading: false, id: data.image.id });
    }
  }

  function addLoadedFile(file: FileInfo) {
    setFiles((files) => {
      return files.length < limit ? files.concat(file) : files;
    });
  }

  function removeLoadedFile(file: FileInfo) {
    setFiles((files) => files.filter((f) => f !== file));
  }

  function removeAllLoadedFile() {
    setFiles([]);
  }

  function updateLoadedFile(oldFile: FileInfo, newFile: FileInfo) {
    setFiles((prev) => {
      const index = prev.indexOf(oldFile);
      return prev.map((it, idx) => (idx === index ? newFile : it));
    });

    return newFile;
  }

  let fileInput = useRef<HTMLInputElement>(null);

  return (
    <div
      className={styles["inner-container"]}
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className={styles["sub-header"]}>Drag an Image</div>
      <div className={styles["draggable-container"]}>
        <input
          disabled={files.length >= limit}
          type="file"
          className={styles["file-browser-input"]}
          name="file-browser-input"
          multiple={true}
          accept="image/jpeg, image/png"
          ref={fileInput}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={onFileLoad}
          onChange={onFileLoad}
          draggable={true}
          height={"100%"}
        />
        <div
          className={`${styles["files-preview-container"]} ${styles["ip-scrollbar"]}`}
        >
          {files.map((file, idx) => {
            return (
              <div className={styles.file} key={idx}>
                <Image
                  src={file.data as never}
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
                <div className={styles.container}>
                  <span className={styles["progress-bar"]}>
                    {file.loading && <ProgressBar />}
                  </span>
                  <span
                    className={styles["remove-btn"]}
                    onClick={() => removeLoadedFile(file)}
                  >
                    <Icon icon={"remove"} size={19} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles["helper-text"]}>Drag and Drop Images Here</div>
        <div className={styles["file-browser-container"]}>
          <AnchorButton
            text="Browse"
            intent={Intent.PRIMARY}
            minimal={true}
            onClick={() => fileInput?.current?.click()}
          />
        </div>
      </div>
    </div>
  );
}
