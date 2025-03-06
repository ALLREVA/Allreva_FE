import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { requestPostPresignedUrl } from 'api';
import type { FileType } from 'types';

const createPresignedUrl = async ({ file, fileType }: { file: File; fileType: FileType }) => {
  const { data } = await requestPostPresignedUrl({ fileName: file.name, fileType });

  if (!data?.result) {
    throw new Error('Presigned URL 생성 실패');
  }

  const presignedUrl = data.result;
  await axios.put(presignedUrl, file);

  return presignedUrl.split('?')[0];
};

export const usePostPresigned = () => {
  return useMutation({
    mutationFn: createPresignedUrl,
    onSuccess: () => {
      console.log('Presigned Url 업로드 성공');
    },
    onError: (err) => {
      console.log('Presigned Url 업로드 오류:', err);
    },
  });
};
