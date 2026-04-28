import { useAuthContext } from '@/context/AuthContext';
import { axiosClient } from '@/utils/axiosClient';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CgSpinner } from 'react-icons/cg';
import { FaCameraRetro } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AvatarComponent = () => {
  const { user, fetchUserProfile } = useAuthContext();
  const sample_uri =
    'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80';

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', acceptedFiles[0]);

        const response = await axiosClient.put(
          '/auth/update-avatar',
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          },
        );
        const data = await response.data;
        await fetchUserProfile();
        toast.success(data.msg);
      } catch (error) {
        toast.error(error?.response?.data?.detail || error.message);
      } finally {
        setLoading(false);
      }
    }

    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="w-[200px] relative h-[200px] border border-gray-200 rounded-full p-1 mx-auto flex justify-center items-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <div className="flex items-center flex-col gap-y-2 ">
              <FiUploadCloud className="text-2xl" />
              <p>Upload Image</p>
            </div>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <CgSpinner className="text-4xl animate-spin" />
              </>
            ) : (
              <img
                src={user?.avatar ?? sample_uri}
                className="w-full h-full rounded-full"
                alt=""
              />
            )}
          </>
        )}
        <button
          type="button"
          className="p-2 text-xl rounded-full bg-blue-600 absolute -right-2 bottom-10  text-white"
        >
          <FaCameraRetro />
        </button>
      </div>
    </>
  );
};

export default AvatarComponent;
