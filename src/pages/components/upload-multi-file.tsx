import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from "uuid";
import { IFileItemState } from "./interface";
import IconPhoto from "@/assets/icons/icon-photo.png";
import IconDowload from "@/assets/icons/icon-dowload.png";
import IconDalete from "@/assets/icons/icon-delete-image.png";

interface IUploadProps {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  fileItem: IFileItemState[] | [];
  setFileItem: (value: IFileItemState[]) => void;
  setDeleteItem?: (id: string) => void;
  disabled?: boolean;
}

const UploadMultiFile: React.FC<IUploadProps> = ({
  error,
  label,
  id,
  required,
  fileItem,
  setFileItem,
  setDeleteItem,
  disabled,
}) => {
  // const [fileItem, setFileItem] = useState<IFileItemState[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

  const handleLoading = (size: number) => {
    const setTime = size > 1000000 ? size / 100000 : size / 10000;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsLoadingFile(false);
          return 100;
        }
        return prevProgress + 1;
      });
    }, setTime);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    console.log("file : ", file);

    if (file) {
      handleLoading(file.size);
      setIsLoadingFile(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileUrl = reader.result as string;
        const fileObject = { fileUrl, fileData: file, id: uuidv4() };

        console.log("fileObject --* ", fileObject);

        setFileItem([fileObject, ...fileItem]);
        // setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
      setProgress(0);
      // setFileImage(file);
    }
  };

  const handleDelete = (id: string) => {
    setIsLoadingFile(false);
    const deleteData = fileItem.filter((item) => item.id !== id);
    setFileItem(deleteData);
    setDeleteItem?.(id);
  };

  const handleDownload = (fileData: File) => {
    const url = URL.createObjectURL(fileData); // Create a URL for the file
    const link = document.createElement("a"); // Create an anchor element
    link.href = url; // Set the URL of the file to the anchor tag
    link.download = fileData.name; // Set the download attribute to the file's name
    link.click(); // Programmatically click the link to trigger the download
    URL.revokeObjectURL(url); // Release the object URL after download
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label>
          {label} {required && <span className="text-red-600 text-xs">*</span>}
        </label>
      )}
      {!disabled && (
        <>
          <div
            className="h-[42px] w-full bg-gray-50 border border-gray-200 rounded-[8px] gap-4 flex items-center"
            onClick={() => document.getElementById(id)?.click()}
          >
            <div className="bg-blue-700 h-full w-[90px] flex items-center justify-center rounded-tl-[8px] rounded-bl-[8px]">
              <span className="text-white">เลือกไฟล์</span>
            </div>
            <span>ยังไม่พบไฟล์</span>
          </div>
          <span className="text-[12px] text-gray-500">
            อัปโหลดได้มากกว่า 1 ไฟล์
          </span>
        </>
      )}
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
      {fileItem?.length ? (
        <>
          <div className="flex flex-col gap-[16px] mt-4">
            {fileItem.map((item, index) => {
              const fileType = item?.fileData?.type
                ? item.fileData.type?.split("/")
                : [];
              let fileExtension = fileType?.length ? fileType[1] : fileType[0];

              console.log("fileExtension ==> ", fileExtension);

              if (!fileExtension) {
                fileExtension = item?.fileData?.name?.split(".")[1] ?? "";
              }

              return (
                <div>
                  <div
                    className="border border-gray-300 rounded-[8px] h-[50px] px-[12px] flex justify-between"
                    key={index}
                  >
                    <div className="flex items-center gap-x-[16px]">
                      <img
                        src={IconPhoto}
                        className="w-[24px] h-[24px]"
                        alt="icon photo"
                      />
                      <span className="font-medium text-[16px]">
                        {item?.fileData?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-x-[16px]">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDownload(item.fileData)}
                      >
                        <img
                          src={IconDowload}
                          className="w-[24px] h-[24px]"
                          alt="icon dowload"
                        />
                      </div>
                      {!disabled && (
                        <div
                          onClick={() => handleDelete(item.id)}
                          className="cursor-pointer"
                        >
                          <img
                            src={IconDalete}
                            className="w-[24px] h-[24px]"
                            alt="icon delete"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {isLoadingFile && index === 0 ? (
                    <div className="w-full flex items-center gap-2 mt-2">
                      <Progress value={progress} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <input
        type="file"
        accept="image/png, image/jpeg, application/pdf"
        onChange={handleUploadFile}
        className="hidden"
        id={id}
      />
    </div>
  );
};

export default UploadMultiFile;
