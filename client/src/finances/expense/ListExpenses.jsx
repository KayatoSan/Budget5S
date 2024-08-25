import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { useTranslation } from 'react-i18next';

const listExpenses = () => {
  const {t, i18n} = useTranslation()

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
      message: `${t('Delete expense confirmation')}`,
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
          console.error("An error occurred : ", err);
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
      return <p>{t('No longer exist')}</p>;
    }
    return <p>{result && result.label}</p>;
  };

  const bucketRef = (object) => {
    const bucket = object.bucketRef;
    const result = buckets.find((data) => data._id === bucket);
    if (result === undefined) {
      return <p>{t('No longer exist')}</p>;
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
          title={t('Expense list title')}
          subTitle={t('Expense list subtitle')}
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Listing')}</b>
            </div>
          </Divider>
          <div className="">
            <DataTable value={data} tableStyle={{ width: "100%" }}>
              <Column field="date" header={t('Date')} body={dateList}></Column>
              <Column field="label" header={t('Label')}></Column>
              <Column field="amount" header={t('Amount')}></Column>
              <Column
                field="bucketRef"
                header={t('Bucket REF')}
                body={bucketRef}
              ></Column>
              <Column
                field="accountRef"
                header={t('Account REF')}
                body={accountRef}
              ></Column>
              <Column field="_id" header={t('Edit')} body={editLink}></Column>
            </DataTable>
          </div>
        </Card>
      </div>
    </>
  );
};

export default listExpenses;
