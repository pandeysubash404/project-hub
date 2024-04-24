import { Modal } from "@mantine/core";
import React from "react";

import ModalHeader from "components/ModalHeader";
import { Project } from "types";

import ManageMemberForm from "./ManageMemberForm";

type ManageMemberModalProps = {
  opened: boolean;
  onClose: () => void;
  project: Project;
  orgId: string | undefined;
};

function ManageMemberModal({
  opened,
  onClose,
  project,
  orgId,
}: ManageMemberModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      transitionDuration={300}
      centered
    >
      <ModalHeader
        title="Manage Members"
        onClose={onClose}
        ariaLabel="Close member management modal"
      />
      <ManageMemberForm onClose={onClose} project={project} orgId={orgId} />
    </Modal>
  );
}

export default ManageMemberModal;
