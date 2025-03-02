import MainLayout from "@/components/layout/MainLayout";
import ArchivePage from "@/components/pages/ArchivePage";
import CreatePage from "@/components/pages/CreatePage";
import DetailPage from "@/components/pages/DetailPage";
import EditPage from "@/components/pages/EditPage";
import HomePage from "@/components/pages/HomePage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { ROUTES } from "@/constants/route";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES["notes"]} element={<HomePage />} />
          <Route path={ROUTES["notes-create"]} element={<CreatePage />} />
          <Route path={ROUTES["notes-detail"]} element={<DetailPage />} />
          <Route path={ROUTES["notes-edit"]} element={<EditPage />} />
          <Route path={ROUTES["notes-archives"]} element={<ArchivePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
