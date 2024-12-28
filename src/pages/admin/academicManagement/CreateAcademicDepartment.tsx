/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { academicDepartmentsOptions } from "../../../constants/academicDepartment";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { TResponse } from "../../../types";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultysOptions } from "../../../constants/academicFaculty";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Department");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
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
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHSelect
            label="Name of Department"
            name="name"
            options={academicDepartmentsOptions}
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultysOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
