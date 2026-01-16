import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateCategory() {
  const { register, handleSubmit, reset } = useForm();
  let redirect = useNavigate();
  const URL = import.meta.env.VITE_CATEGORY_URL;
  const { id } = useParams();

  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);
    console.log("res ok", res.data);
    reset(res.data.category);
  }

  useEffect(() => {
    ShowData();
  }, [id]);

  async function addcategory(data) {
    if (id == null) {
      try {
        const res = await axios.post(URL, data);
        if (res.data.success) {
          reset();
          redirect("/categoryView");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Category Added!",
            showConfirmButton: true,
            timer: 3000,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
            timer: 3000,
          });
        }
      } catch (err) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Error : ${err.message}`,
          showConfirmButton: true,
          timer: 3000,
        });
      }
    } else {
      await axios.put(`${URL}/${id}`, data);
      reset();
      redirect("/categoryView");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Category Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit(addcategory)}
      className="card shadow-lg mx-4 mt-5 border-0"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        borderRadius: "12px",
      }}
    >
      <div
        className="card-header fw-semibold fs-6"
        style={{
          backgroundColor: "#0d6efd",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        {id == null ? "Create New Category" : "Edit Category"}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">
            Category Name
          </label>

          <input
            type="text"
            {...register("name")}
            className="form-control"
            placeholder="Create New Category..."
            required
            style={{
              borderRadius: "8px",
              border: "1px solid #ced4da",
              padding: "10px",
            }}
          />
        </div>

        <div>
          <button
            className={
              id == null
                ? "btn btn-success px-4"
                : "btn btn-warning px-4 text-dark"
            }
          >
            {id == null ? "Create Category" : "Update Category"}
          </button>
        </div>
      </div>
    </form>
  );
}
