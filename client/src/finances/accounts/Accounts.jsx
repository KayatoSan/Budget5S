import { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { useTranslation } from 'react-i18next';

const Accounts = () => {
  const {t, i18n} = useTranslation()
  
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/all/accounts`;
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      return fetchResponse.data;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const confirm = (id) => {
    confirmDialog({
      message: `${t('Delete Account Confirmation')}`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/account/delete/${id}/`, {
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
        <a href={`/account/edit/${object._id}`}>
          <i className="cursor-pointer mt-1 pi pi-file-edit edit-icon"></i>
        </a>
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

  const formatCurrency = (value) => {
    return value.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  };

  const priceBody = (data) => {
    return formatCurrency(data.balance);
  };

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);
  return (
    <>
      <ConfirmDialog />
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title={t('Account')}
          subTitle={t('Account Subtitle')}
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Listing')}</b>
            </div>
          </Divider>
          <div className="">
            <DataTable value={data} tableStyle={{ width: "100%" }}>
              <Column field="label" header={t('Label')}></Column>
              <Column
                field="balance"
                header={t('Balance')}
                body={priceBody}
              ></Column>
              <Column field="_id" header={t('Edit')} body={editLink}></Column>
            </DataTable>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Accounts;
