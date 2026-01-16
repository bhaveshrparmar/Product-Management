import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductList(props) {
  const [Product, setProduct] = useState([]);

  console.log("Product", Product);

  const URL = import.meta.env.VITE_PRODUCT_URL;

  async function showData() {
    const res = await axios.get(URL);
    if (res) {
      setProduct(res.data.records);
    }
  }

  console.log(Product);

  function Trash(id) {
    Swal.fire({
      title: "Do You Want to Delete Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Product Deleted!",
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

  console.log(Product);

  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <div className="card shadow-lg m-4 border-0">
        <div
          className="card-header fw-semibold text-white"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #6610f2)",
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
                <th>Product Name</th>
                <th>Image</th>
                <th>Price (₹)</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {Product.map((ele, index) => (
                <tr key={ele._id}>
                  <th scope="row">{index + 1}</th>

                  <td className="fw-semibold">
                    {ele?.category_id?.name || "-"}
                  </td>
                  <td>{ele?.subcategory_id?.sub_name || "-"}</td>
                  <td>{ele.p_name}</td>

                  <td style={{ width: "90px" }}>
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${ele.p_image}`}
                      alt="Product"
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "70px",
                        objectFit: "contain",
                      }}
                    />
                  </td>

                  <td className="fw-bold text-success">₹{ele.p_price}</td>

                  <td>
                    {ele.createdAt
                      ? new Date(ele.createdAt).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    <NavLink
                      to={`/product/${ele._id}`}
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
