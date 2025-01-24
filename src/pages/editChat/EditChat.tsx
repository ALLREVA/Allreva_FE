import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import ChatTextArea from './components/ChatTextArea';
import ChatTitleField from './components/ChatTitleField';
import type { ChatFormData } from './components/EditChatDialog';
import EditChatDialog from './components/EditChatDialog';
import ThumbnailUpload from './components/ThumbnailUpload';

import BaseButton from 'components/buttons/BaseButton';
import type { ChatSchemaType } from 'schemas';
import { chatSchema } from 'schemas';
import { useModalStore } from 'stores';
import { BodyMediumText } from 'styles/Typography';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.6rem;
  padding: 2.4rem;
`;

const EditChatForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 3.2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 3.2rem;
  width: 100%;
  padding-top: 1.6rem;
`;

const FormField = styled.div`
  width: 100%;
`;

const FieldLabel = styled(BodyMediumText)`
  margin-bottom: 1.2rem;
`;

const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

const EditChat = () => {
  const location = useLocation();
  const { openModal } = useModalStore(['openModal']);
  const { thumbnail, title, description } = location.state || {};

  const methods = useForm<ChatSchemaType>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      title: title || '',
      description,
      imageFile: undefined,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ChatFormData) => {
    openModal('dialog', 'confirm', <EditChatDialog formData={data} />);
  };

  return (
    <ContentContainer>
      <FormProvider {...methods}>
        <EditChatForm onSubmit={handleSubmit(onSubmit)}>
          <ContentWrapper>
            <ThumbnailUpload thumbnail={thumbnail} />
            <FormField>
              <FieldLabel>
                채팅방 제목
                <Asterisk>*</Asterisk>
              </FieldLabel>
              <ChatTitleField />
            </FormField>
            <FormField>
              <FieldLabel>채팅방 소개</FieldLabel>
              <ChatTextArea />
            </FormField>
          </ContentWrapper>
          <BaseButton color="primary" size="medium" type="submit" variant="fill">
            수정 완료
          </BaseButton>
        </EditChatForm>
      </FormProvider>
    </ContentContainer>
  );
};

export default EditChat;
