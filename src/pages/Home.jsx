import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { apiRequest } from "../context/apiRequest";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const [name, setName] = useState("");
  const [nameItem, setNameItem] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    apiRequest("checklist", "GET", {})
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err.toString()));
  };
  const fetchDataItem = async (id) => {
    apiRequest(`checklist/${id}/item`, "GET", {})
      .then((res) => {
        setDataItem(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err.toString()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
    };
    apiRequest("checklist", "POST", body)
      .then((res) => {
        if (res.status === "success") {
          alert("Success Add Checklist..!");
        }
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(fetchData());
  };

  const handleDelete = (id) => {
    apiRequest(`checklist/${id}`, "DELETE")
      .then((res) => {
        alert(`Checklist Deleted!`);
        fetchData();
      })
      .catch((err) => {
        alert(err.toString());
      });
  };

  return (
    <div className="flex justify-center bg-gray-200 w-full min-h-screen gap-4">
      <div className="flex flex-col bg-white shadow-lg w-1/2 p-16 gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Add Checklist</p>
          <form className="flex justify-between gap-4" onSubmit={(e) => handleSubmit(e)}>
            <Input id="input-name" type="text" placeholder="Add Checklist" required onChange={(e) => setName(e.target.value)} />
            <Button Id="btn-submit" Label="Submit" />
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Checklist</p>
          {data.map((item) => (
            <div key={item.id} className="flex gap-2 mb-4">
              <p>{item.name}</p>
              <Button Label="Delete" OnClick={() => handleDelete(item.id)} />
              <Button Label="Item" OnClick={() => fetchDataItem(item.id)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-white shadow-lg w-1/2 p-16 gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Checklist Item</p>
          {dataItem.map((item) => (
            <div key={item.id} className="flex gap-2 mb-4">
              <p>{item.name}</p>
              <Button Label="Delete" OnClick={() => handleDelete(item.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
