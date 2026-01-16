import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductAdd() {
  const { register, handleSubmit, reset } = useForm();

  const [ProductSubCate, setProductSubCate] = useState([]);
  const [image, setImage] = useState("");

  const URL = import.meta.env.VITE_PRODUCT_URL;
  const CateURL = import.meta.env.VITE_CATEGORY_URL;
  const SubCateURL = import.meta.env.VITE_SUBCATEGORY_URL;

  const { id } = useParams();
  let redirect = useNavigate();

  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);

    const product = res.data.product;
    setImage(product.p_image)
    reset({
      ...product,
      category_id: product.category_id._id,
      subcategory_id: product.subcategory_id._id,
      p_image: product.p_image,
    });
  }

  async function ShowDataSubCategory() {
    const res = await axios.get(SubCateURL);
    setProductSubCate(res.data.records);
  }

  useEffect(() => {
    ShowData();
    ShowDataSubCategory();
  }, []);

  async function addProduct(data) {
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("subcategory_id", data.subcategory_id);
    formData.append("p_name", data.p_name);
    formData.append("p_price", data.p_price);
    formData.append("p_image", data.p_image[0]);

    if (id == null) {
      const res = await axios.post(URL, formData);
      console.log(res);
      reset({
        ProductCategory: "--Select Category--",
        ProductSubCategory: "--Select Sub Category--",
        ProductName: "",
        ProductPrice: "",
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Product Added!",
        showConfirmButton: true,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Product Updated!",
        showConfirmButton: true,
        timer: 3000,
      });

      
      await axios.put(`${URL}/${id}`, formData);
      reset({
        ProductCategory: "--Select Category--",
        ProductSubCategory: "--Select Sub Category--",
        ProductName: "",
        ProductPrice: "",
      });
    }
    redirect("/productView");
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit(addProduct)}
      className="card shadow-lg mx-4 mt-5 border-0"
      style={{
        borderRadius: "14px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="card-header fw-semibold fs-5 text-white"
        style={{
          background: "linear-gradient(90deg, #198754, #20c997)",
          borderRadius: "14px 14px 0 0",
        }}
      >
        {id == null ? "Add New Product" : "Update Product"}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Category</label>
          <select className="form-select" {...register("category_id")} required>
            <option disabled selected>
              -- Select Category --
            </option>
            {ProductSubCate.map((ele, index) => (
              <option key={index} value={ele?.category_id?._id}>
                {ele?.category_id?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">
            Sub Category
          </label>
          <select
            className="form-select"
            {...register("subcategory_id")}
            required
          >
            <option disabled selected>
              -- Select Sub Category --
            </option>
            {ProductSubCate.map((ele, index) => (
              <option key={index} value={ele._id}>
                {ele.sub_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            {...register("p_name")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">
            Product Price
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product price"
            {...register("p_price")}
            required
          />
        </div>

        {image && (
          <div className="mx-3 mb-2 d-flex flex-column">
            <label className="form-label  text-secondary fw-bold  pt-2">
              Product Image Preview
            </label>
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/${image}`}
              className="mx-1"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
              alt="not found image"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="form-label fw-semibold text-dark">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            {...register("p_image")}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            className={
              id == null
                ? "btn btn-success px-4"
                : "btn btn-warning px-4 text-dark"
            }
          >
            {id == null ? "Save Product" : "Update Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
