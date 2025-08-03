import { createBrowserRouter } from "react-router";
import Todos from "./Todos";
import Layout from "./components/ui/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Todos />,
      },
      {
        path: "job-board",
        element: (
          <div className="flex items-center justify-center h-[500px] w-full">
            <div className="card p-4">
              <h2>Work is in progress. Come back later.</h2>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default router;
