import { Card } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const gridStyle: React.CSSProperties = {
  width: "25%",
  // textAlign: "center",
};

const AcademicDepartment = () => {
  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  return (
    <Card title="Name Of Academic Faculties">
      {academicDepartmentData?.data?.map((item) => (
        <Card.Grid style={gridStyle} key={item._id}>
          <p>
            <span style={{ fontWeight: "bold" }}>Department:</span> {item.name}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Faculty:</span>{" "}
            {item.academicFaculty?.name}
          </p>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default AcademicDepartment;
