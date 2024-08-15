import {useRoutes} from "react-router-dom";
import StaffListPage from "./page/StaffListPage/StaffListPage";
import EditStaffPage from "./page/EditStaffPage/EditStaffPage";
import CreateStaffPage from "./page/CreateStaffPage/CreateStaffPage";
import {Toaster} from "react-hot-toast";

function App() {
  const routes =  useRoutes([
    {
      path: "/",
      element: <StaffListPage />,
    },
    { path: "/editStaff/:staffId", element: <EditStaffPage /> },
    { path: "/createStaff", element: <CreateStaffPage /> },
  ]);

  return (
      <>
        <Toaster
            position="top-center"
            gutter={8}
            containerClassName=""
        />
        {routes}
      </>
  )
}

export default App;
