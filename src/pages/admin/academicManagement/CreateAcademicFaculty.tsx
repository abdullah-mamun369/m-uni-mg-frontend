/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { TResponse } from "../../../types";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultysOptions } from "../../../constants/academicFaculty";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Department");

    const facultyData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHSelect
            label="Name of Faculty"
            name="name"
            options={academicFacultysOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
