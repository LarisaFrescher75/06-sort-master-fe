
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layouts/Layout";
import Containers from "./pages/Containers";
import CreateContainerForm from "./components/CreateContainerForm";
import Items from "./pages/Items";
import CreateItemForm from "./components/CreateItemForm";
import ItemCard from "./pages/ItemCard";
import ItemDetails from "./components/ItemDetails";
import CreateAdsForm from "./components/Header/CreateAdsForm";
import AdsPage from "./pages/AdsPage";

import { AdvertProvider } from "./contexts/AdvertContext"; 

function App() {
  return (
    <AdvertProvider>
      <div>
        <nav></nav>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/item" element={<ItemCard item={{ id: 0, name: "", containerId: 0 }} />} />
            <Route path="/item/:itemId" element={<ItemDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/items" element={<Items />} />         
            <Route path="/container-form" element={<CreateContainerForm />} />
            <Route path="/item-form" element={<CreateItemForm />} />
            <Route path="/ads" element={<AdsPage />} />
            <Route path="/ads-create" element={<CreateAdsForm />} />
          </Routes>
        </Layout>
      </div>
    </AdvertProvider>
  );
}

export default App;
