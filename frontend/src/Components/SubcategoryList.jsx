import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategoryList(props) {
  const URL = import.meta.env.VITE_SUBCATEGORY_URL;

  const [SubCate, setSubCate] = useState([]);

  console.log(SubCate);

  async function ShowData() {
    const res = await axios.get(URL);
    setSubCate(res.data.records);
  }
  function Trash(id) {
    Swal.fire({
      title: "Do You Want to Delete Sub-Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sub-Category Deleted!",
          icon: "success",
        });
        await axios.delete(`${URL}/${id}`);
        ShowData();
      } else {
        Swal.fire({
          title: "Not Delete!",
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    ShowData();
  }, []);
  return (
    <>
      <div className="card shadow-lg m-4 border-0">
        <div
          className="card-header fw-semibold text-white"
          style={{
            background: "linear-gradient(90deg, #198754, #20c997)",
          }}
        >
          {props.title}
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-center">
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {SubCate.map((ele, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="fw-semibold">
                    {ele?.category_id?.name || "-"}
                  </td>
                  <td>{ele.sub_name}</td>
                  <td>
                    {ele.createdAt
                      ? new Date(ele.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <NavLink
                      to={`/subcategory/${ele._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      <AiFillEdit />
                    </NavLink>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => Trash(ele._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
