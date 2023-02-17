import { useRef } from 'react';
import { useMemo } from 'react';
import { uploadImageAPI } from '../api/image';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useReviewQuillEditor = () => {
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const result = await uploadImageAPI(formData);
        const IMG_URL = result.data.url;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패했어요ㅠ');
      }
    });
  };

  const quillRef = useRef();
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [['image'], [{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote']],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'image'];

  return { quillRef, modules, formats };
};

const ReviewSchema = yup.object().shape({
  title: yup.string().required('제목은 필수 입력값 입니다'),
  contents: yup.string().required('내용은 필수 입력값 입니다.'),
});

export const useReviewForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(ReviewSchema) });

  return { register, setValue, handleSubmit, trigger, errors, getValues };
};
