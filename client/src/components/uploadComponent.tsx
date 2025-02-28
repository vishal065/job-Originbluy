import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../store/store";
import { uploadImages } from "../store/features/images/imagesAction";
import { uploadvideo } from "../store/features/videos/videoAction";

interface UploadFileProp {
  open: boolean;
  handleClose: () => void;
  label: string;
  fileType: string;
}

export default function UploadFile({
  open,
  handleClose,
  label,
  fileType,
}: UploadFileProp) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.includes(`${fileType}/`)) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setFile(null);
        toast.error(`Please select a valid ${fileType}`);
      }
    }
  };

  const uploadFile = async () => {
    if (!file) return toast.error("Please select the file");
    setUploading(true);

    const formData = new FormData();
    formData.append(`${fileType}`, file);

    try {
      let data;
      if (fileType === "image") {
        data = dispatch(uploadImages(formData)).unwrap();
      } else if (fileType === "video") {
        console.log("yeh wala chala");
        
        data = dispatch(uploadvideo(formData)).unwrap();
      }

      data?.then((item) =>
        item?._id && item?._id.trim() != ""
          ? toast.success("File uploaded successfully")
          : null
      );
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={handleClose}
      ></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
          <h2 className="text-xl font-bold mb-4 ">{label}</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{}</p>

          <div className="mb-4">
            <input
              type="file"
              id="file"
              name="file"
              autoFocus
              required
              onChange={handleFileChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white `}
            />
          </div>
          <div>
            {preview && (
              <>
                {file?.type.startsWith("video") ? (
                  <video src={preview} controls className="w-64 rounded" />
                ) : (
                  <img src={preview} alt="Preview" className="w-64 rounded" />
                )}
              </>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={uploadFile}
              disabled={uploading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
