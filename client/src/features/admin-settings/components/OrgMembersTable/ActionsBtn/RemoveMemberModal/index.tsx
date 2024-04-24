import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { AlertTriangle, ExclamationMark, X } from 'tabler-icons-react';


import styles from './RemoveMemberModal.module.css';

type RemoveMemberModalProps = {
  opened: boolean;
  onClose: () => void;
  orgId: string | undefined;
};

function RemoveMemberModal({
  opened,
  onClose,
  orgId,
}: RemoveMemberModalProps) {
 // const deleteProjectMutation = useDeleteProject();

  const handleClickDelete = () => {
    // deleteProjectMutation.mutate(
    //   {, orgId },
    //   {
    //     onSuccess: () => {
    //       onClose();
    //     },
    //     onError: () => {
    //       showNotification({
    //         title: 'Error',
    //         message: 'Failed to delete project. Please try again.',
    //         color: 'red',
    //         icon: <ExclamationMark />,
    //       });
    //     },
    //   }
    // );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      centered
    >
      <div className={styles.delete}>
        <AlertTriangle color="#DE350B" size={24} />
        <Text weight={700} size={20}>
          Delete project?
        </Text>
        <ActionIcon
          ml="auto"
          color="dark"
          className={styles['action-btn']}
          onClick={onClose}
          aria-label="Close delete project modal"
        >
          <X size={20} />
        </ActionIcon>
      </div>
      <Text size={15}>
        Are you sure you want to delete this project? This action cannot be
        undone.
      </Text>
      <Group mt={25} position="right">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red.8"
          onClick={handleClickDelete}
          // loading={
          //   deleteProjectMutation.isLoading || deleteProjectMutation.isSuccess
          // }
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

export default RemoveMemberModal;
