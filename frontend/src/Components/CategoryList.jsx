import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function CategoryList(props) {
  const [List, setList] = useState([]);
  const URL = import.meta.env.VITE_CATEGORY_URL;

  async function showData() {
    const res = await axios.get(URL);
    console.log(res);
    setList(res.data.records);
  }

  console.log(List);
  useEffect(() => {
    showData();
  }, []);

  function Trash(id) {
    Swal.fire({
      title: "Do You Want to Delete Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Category Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
        await axios.delete(`${URL}/${id}`);
        showData();
      } else {
        Swal.fire({
          title: "Not Delete!",
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <div className="card shadow-lg m-4 border-0">
        <div
          className="card-header fw-semibold text-white"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #0dcaf0)",
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
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {List.map((ele, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="fw-semibold">{ele.name}</td>
                  <td>{new Date(ele.createdAt).toLocaleString()}</td>
                  <td>
                    {ele.updatedAt
                      ? new Date(ele.updatedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <NavLink
                      className="btn btn-sm btn-warning me-2"
                      to={`/category/${ele._id}`}
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
