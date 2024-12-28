import { Card } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const AcademicFaculty = () => {
  const { data } = useGetAcademicFacultiesQuery(undefined);

  return (
    <Card title="Name Of Academic Faculties">
      {data?.data?.map((item) => (
        <Card.Grid style={gridStyle} key={item._id}>
          {item.name}
        </Card.Grid>
      ))}
    </Card>
  );
};

export default AcademicFaculty;
