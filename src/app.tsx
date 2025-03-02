import Navbar from "@/components/layout/Navbar";
import ArchivePage from "@/components/pages/ArchivePage";
import CreatePage from "@/components/pages/CreatePage";
import DetailPage from "@/components/pages/DetailPage";
import HomePage from "@/components/pages/HomePage";
import { ROUTES } from "@/constants/route";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path={ROUTES["notes"]} element={<HomePage />} />
          <Route path={ROUTES["notes-create"]} element={<CreatePage />} />
          <Route path={ROUTES["notes-detail"]} element={<DetailPage />} />
          <Route path={ROUTES["notes-archives"]} element={<ArchivePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
