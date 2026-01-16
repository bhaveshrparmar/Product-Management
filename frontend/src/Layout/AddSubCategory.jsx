import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategory() {
  const { register, handleSubmit, reset } = useForm();
  const [SubCate, setSubCate] = useState([]);
  const URL = import.meta.env.VITE_SUBCATEGORY_URL;
  const CATEURL = import.meta.env.VITE_CATEGORY_URL;
  let date = new Date();
  let { id } = useParams();
  let redirect = useNavigate();

  const currentDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  // Sub Category
  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);
    console.log("My Res", res.data.subCategory);
    reset(res.data.subCategory);
  }

  // Category
  async function ShowDataCateGory() {
    const res = await axios.get(CATEURL);
    setSubCate(res.data.records);
  }

  // Sub Category Add and Update
  async function addSubcategory(data) {
    if (id == null) {
      const res = await axios.post(URL, { currentDate, ...data });
      console.log("res", res);
      if (res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sub-Category Added!",
          showConfirmButton: true,
          timer: 3000,
        });
        reset({
          subCategorySelect: "--select Category--",
          subCategory_name: "",
        });
        redirect("/subcategoryView");
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
      }
    } else {
      await axios.put(`${URL}/${id}`, { currentDate, ...data });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Sub-Category Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
      reset({ subCategorySelect: "--select Category--", subCategory_name: "" });
      redirect("/subcategoryView");
    }
  }

  useEffect(() => {
    ShowData();
    ShowDataCateGory();
  }, []);

  return (
    <form
      method="post"
      onSubmit={handleSubmit(addSubcategory)}
      className="card shadow-lg mx-4 mt-5 border-0"
      style={{
        borderRadius: "14px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="card-header fw-semibold fs-5 text-white"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #0dcaf0)",
          borderRadius: "14px 14px 0 0",
        }}
      >
        {id == null ? "Add Sub Category" : "Update Sub Category"}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Category</label>
          <select className="form-select" {...register("category_id")} required>
            <option disabled selected>-- Select Category --</option>
            {SubCate.map((ele, index) => (
              <option key={index} value={ele._id}>
                {ele.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold text-dark">
            Sub Category Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter sub category name"
            {...register("sub_name")}
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            className={
              id == null
                ? "btn btn-primary px-4"
                : "btn btn-warning px-4 text-dark"
            }
          >
            {id == null ? "Save Sub Category" : "Update Sub Category"}
          </button>
        </div>
      </div>
    </form>
  );
}
