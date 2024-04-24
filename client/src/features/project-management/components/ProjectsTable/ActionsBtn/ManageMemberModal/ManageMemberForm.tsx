import React, { useState } from "react";
import { Button, Table } from "@mantine/core";

import { useGetOrg } from "api/organizations/getOrg";
import { useUpdateProjectMember } from "api/projects/updateProject";
import { showNotification } from "@mantine/notifications";
import { ExclamationMark } from "tabler-icons-react";
import { Project } from "types";

type ManageMemberFormProps = {
  onClose: () => void;
  project: Project;
  orgId: string | undefined;
};

function ManageMemberForm({ onClose, project, orgId }: ManageMemberFormProps) {
  const { data: orgs } = useGetOrg(orgId);
  const updateProjectMutation = useUpdateProjectMember(orgId);

  // Function to filter organization members who are not in the project
  const getMembersNotInProject = () => {
    if (!orgs || !project) return [];

    const projectMemberIds = project.members.map((member) => member._id);
    return orgs.members.filter(
      (member) => !projectMemberIds.includes(member._id)
    );
  };


  const handleSubmit = (memberId: string, remove: boolean) => {
    if (remove) {
      // Remove the member from the project
      updateProjectMutation.mutate(
        {
          projectId: project._id,
          projectData: {
            name: project.name,
            description: project.description,
            category: project.category,
          },
          memberId: memberId,
          remove: true, // Indicate that the member should be removed
        },
        {
          onSuccess: () => {
            console.log("Remove: ", remove);
            console.log("Removed member with ID: ", memberId);
            onClose();
          },
          onError: () => {
            showNotification({
              title: "Error",
              message:
                "Failed to remove member from project. Please try again.",
              color: "red",
              icon: <ExclamationMark />,
            });
          },
        }
      );
    } else {
      // Add the member to the project
      updateProjectMutation.mutate(
        {
          projectId: project._id,
          projectData: {
            name: project.name,
            description: project.description,
            category: project.category,
          },
          memberId: memberId,
          remove:false,
        },
        {
          onSuccess: () => {
            console.log("Added member with ID: ", memberId);
            onClose();
          },
          onError: () => {
            showNotification({
              title: "Error",
              message: "Failed to add member to project. Please try again.",
              color: "red",
              icon: <ExclamationMark />,
            });
          },
        }
      );
    }
  };
  
  
  return (
    <div>
      <br />
      <h4>Project Members</h4>
      <Table withBorder verticalSpacing="md" horizontalSpacing={20}>
        <tbody>
          {project.members.map((member) => (
            <tr key={member._id}>
              <td>{`${member.firstName} ${member.lastName}`}</td>
              <td>
                <Button
                  variant="outline"
                  pl={10}
                  pr={6}
                  miw={95}
                  onClick={() => handleSubmit(member._id,true)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <h4>Organization Members Not in Project</h4>
      <Table withBorder verticalSpacing="md" horizontalSpacing={20}>
        <tbody>
          {getMembersNotInProject().map((member) => (
            <tr key={member._id}>
              <td>{`${member.firstName} ${member.lastName}`}</td>
              <td>
                <Button
                  variant="filled"
                  pl={10}
                  pr={6}
                  miw={95}
                  onClick={() => handleSubmit(member._id, false)}
                >
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageMemberForm;
