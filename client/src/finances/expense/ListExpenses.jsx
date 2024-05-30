import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const listExpenses = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/expenses/list`;
  const urlAPIAccounts = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/all/accounts`;
  const urlAPIBucket = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/buckets/list`;

  const [data, setData] = useState();
  const [accounts, setAccounts] = useState();
  const [buckets, setBuckets] = useState();

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      setData(fetchResponse.data);
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const fetchGet = await fetch(urlAPIAccounts),
        fetchResponse = await fetchGet.json();
      setAccounts(fetchResponse.data);
    } catch (err) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const fetchBucket = async () => {
    try {
      const fetchGet = await fetch(urlAPIBucket),
        fetchResponse = await fetchGet.json();
      setBuckets(fetchResponse.data);
    } catch (err) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const confirm = (id) => {
    confirmDialog({
      message: "Are you sure do you want to delete this expense ?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/expense/delete/${id}/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          window.location.reload();
        } catch (err) {
          console.error("Une erreur s'est produite : ", err);
        }
      },
      reject: () => {},
    });
  };

  const editLink = (object) => {
    return (
      <>
        <a
          onClick={() => {
            confirm(object._id);
          }}
        >
          <i className="cursor-pointer mt-1 pl-2 pi pi-trash edit-icon"></i>
        </a>
      </>
    );
  };

  const dateList = (object) => {
    const date = new Date(object.date);
    const dateFormatted = date.toLocaleString("gb-GB");
    return <p>{dateFormatted}</p>;
  };

  const accountRef = (object) => {
    const account = object.accountRef;
    const result = accounts.find((data) => data._id === account);
    if (result === undefined) {
      return <p>No longer exist</p>;
    }
    return <p>{result && result.label}</p>;
  };

  const bucketRef = (object) => {
    const bucket = object.bucketRef;
    const result = buckets.find((data) => data._id === bucket);
    if (result === undefined) {
      return <p>No longer exist</p>;
    }
    return <p>{result && result.label}</p>;
  };

  useEffect(() => {
    fetchAccounts();
    fetchBucket().then(() => {
      fetchData();
    });
  }, []);

  return (
    <>
      <ConfirmDialog />
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title="Expenses"
          subTitle="List all your expenses"
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>Listing</b>
            </div>
          </Divider>
          <div className="">
            <DataTable value={data} tableStyle={{ width: "100%" }}>
              <Column field="date" header="Date" body={dateList}></Column>
              <Column field="label" header="Label"></Column>
              <Column field="amount" header="amount"></Column>
              <Column
                field="bucketRef"
                header="Bucket REF"
                body={bucketRef}
              ></Column>
              <Column
                field="accountRef"
                header="Account REF"
                body={accountRef}
              ></Column>
              <Column field="_id" header="Edit" body={editLink}></Column>
            </DataTable>
          </div>
        </Card>
      </div>
    </>
  );
};

export default listExpenses;
