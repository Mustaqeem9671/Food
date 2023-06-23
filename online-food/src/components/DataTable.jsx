// import React from "react";
// import MaterialTable from "material-table";
// import { ThemeProvider, createTheme } from "@mui/material";

// const DataTable = ({ columns, data, title, actions }) => {
//   const defaultMaterialTheme = createTheme();
//   return (
//     <ThemeProvider theme={defaultMaterialTheme}>
//       <MaterialTable
//         columns={columns}
//         data={data}
//         title={title}
//         actions={actions}
//       />
//     </ThemeProvider>
//   );
// };

// export default DataTable;

import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme();
  
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data || []} // Ensure data is an array or provide a default empty array
        title={title}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default DataTable;
