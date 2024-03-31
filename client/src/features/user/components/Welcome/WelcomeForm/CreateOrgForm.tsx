import { Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { FormEvent, useEffect, useState } from "react";
import { useGetAllOrgs } from "api/organizations/getOrg";

import { WelcomeFormValues } from "features/user/types";

type CreateOrgFormProps = {
  form: UseFormReturnType<WelcomeFormValues>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function CreateOrgForm({ form, handleSubmit }: CreateOrgFormProps) {
  // Fetch all organizations
  const { data: orgs = [], error } = useGetAllOrgs();

  useEffect(() => {
    if (error) {
      console.error("Error fetching organizations:", error);
    }
  }, [error]);

  return (
    <form id="create-org-form" onSubmit={handleSubmit}>
      <Select
        label="Select Organization"
        placeholder="Select an organization"
        data={orgs.map((org) => ({
          value: org?._id,
          label: org?.name,
        }))}
        onChange={(value) =>
          form.setFieldValue("organization", value as string)
        }
        // onChange={(value) => handleSubmit(value as string)}
        size="md"
      />
      {/* <TextInput
        label="Organization"
        placeholder="Atlassian"
        {...form.getInputProps("organization")}
        size="md"
        mb={15}
      /> */}
      <TextInput
        label="Position"
        placeholder="Software Engineer"
        {...form.getInputProps("position")}
        size="md"
        mb={15}
      />
      <Select
        label="Role"
        description="Only 'Admin' is allowed in demo"
        //readOnly
        // disabled
        // data={[{ value: "admin", label: "Admin" }]}
        data={[
          { value: "project manager", label: "Project Manager" },
          { value: "member", label: "Member" },
        ]}
        // data={[
        //   { value: "admin", label: "Admin" },
        //   { value: "project manager", label: "Project Manager" },
        //   { value: "member", label: "Member" },
        // ]}
        {...form.getInputProps("role")}
        size="md"
        inputWrapperOrder={["label", "input", "description", "error"]}
      />
    </form>
  );
}

export default CreateOrgForm;
