import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideMenuBar from "./Layout/SideBar";
import Navbar from "./Layout/Navbar";
import AddCategory from "./Layout/AddCategory";
import ProductList from "./Components/ProductList";
import AddSubCategory from "./Layout/AddSubCategory";
import CreateProduct from "./Layout/CreateProduct";
import SubCategoryList from "./Components/SubcategoryList";
import CategoryList from "./Components/CategoryList";
import Home from "./Components/Home";
import UserRegisterForm from "./Layout/UserRegisterForm";
import UserLogin from "./Layout/UserLogin";
import OtpVerify from "./Layout/OtpVerify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/style.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserRegisterForm />} />
          <Route path="/otpVerify" element={<OtpVerify />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>

        <section className="main-section">
          <Routes>
            <Route
              path="/DashboardView"
              element={
                <>
                  <SideMenuBar /> <Navbar /> <Home />
                </>
              }
            />
            <Route
              path="/categoryadd"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Category Add" />{" "}
                  <AddCategory />{" "}
                </>
              }
            />
            <Route
              path="/subcategory"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Sub-Category Add" />{" "}
                  <AddSubCategory />{" "}
                </>
              }
            />
            <Route
              path="/productAdd"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Product Add" />{" "}
                  <CreateProduct />
                </>
              }
            />
            <Route
              path="/categoryView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Category View" />{" "}
                  <CategoryList title="View Category" />{" "}
                </>
              }
            />
            <Route
              path="/subcategoryView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Sub-Category View" />{" "}
                  <SubCategoryList title="View Sub Category" />
                </>
              }
            />
            <Route
              path="/productView"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Product View" />{" "}
                  <ProductList title="View Product" />{" "}
                </>
              }
            />
            <Route
              path="/category/:id"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Category Add" />{" "}
                  <AddCategory />{" "}
                </>
              }
            />
            <Route
              path="/subcategory/:id"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Sub-Category Add" />{" "}
                  <AddSubCategory />{" "}
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  {" "}
                  <SideMenuBar /> <Navbar title="Product Add" />{" "}
                  <CreateProduct />
                </>
              }
            />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
}
