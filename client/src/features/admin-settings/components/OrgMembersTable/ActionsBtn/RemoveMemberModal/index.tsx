import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { AlertTriangle, X } from "tabler-icons-react";
import styles from "./RemoveMemberModal.module.css";
import { useRemoveOrgMem } from "api/organizations/updateOrgMem";
import { useUpdateUserOrg } from "api/users/updateUserOrg";

type RemoveMemberModalProps = {
  opened: boolean;
  onClose: () => void;
  orgId: string;
  memberId: string;
};

function RemoveMemberModal({
  opened,
  onClose,
  orgId,
  memberId,
}: RemoveMemberModalProps) {
  const updateUserMutation = useRemoveOrgMem(orgId, memberId);

  const handleClickRemove = () => {
    updateUserMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
      onError: () => {
        showNotification({
          title: "Error",
          message: "Failed to remove member. Please try again.",
          color: "red",
          icon: <AlertTriangle />,
        });
      },
    });
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
          Remove member?
        </Text>
        <ActionIcon
          ml="auto"
          color="dark"
          className={styles["action-btn"]}
          onClick={onClose}
          aria-label="Close member modal"
        >
          <X size={20} />
        </ActionIcon>
      </div>
      <Text size={15}>
        Are you sure you want to remove from the organization? This action
        cannot be undone.
      </Text>
      <Group mt={25} position="right">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red.8"
          onClick={handleClickRemove}
          loading={updateUserMutation.isLoading || updateUserMutation.isSuccess}
        >
          Remove
        </Button>
      </Group>
    </Modal>
  );
}

export default RemoveMemberModal;
