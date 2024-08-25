import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { IconCheck, IconX } from "@tabler/icons-react";

import { useTranslation } from 'react-i18next';

const listVault = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/vaults/list`;
  const urlAPIAccounts = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/all/accounts`;

  const {t, i18n} = useTranslation()

  const [data, setData] = useState();
  const [accounts, setAccounts] = useState();

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      setData(fetchResponse.data);
    } catch (err) {
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
  const targetState = (object) => {
    if (object.monthlyType == true) {
      return <IconCheck size={18} />;
    } else if (object.monthlyType === false) {
      return <IconX size={18} />;
    }
  };

  const confirm = (id) => {
    confirmDialog({
      message: `${t('Delete vault confirmation')}`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/vault/delete/${id}/`, {
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
        <a href={`/vault/edit/${object._id}`}>
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

  const accountLinked = (object) => {
    const account = object.accountLinked;
    const result = accounts.find((data) => data._id === object.accountLinked);
    if (result === undefined) {
      return <p>{t('No longer exist')}</p>;
    }
    return <p>{result && result.label}</p>;
  };

  useEffect(() => {
    fetchAccounts().then(() => {
      fetchData();
    });
  }, []);

  return (
    <>
      <ConfirmDialog />
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title="Vaults"
          subTitle={t('List vault subtitle')}
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
                field="accountLinked"
                header={t('Account linked')}
                body={accountLinked}
              ></Column>
              <Column
                field="monthlyType"
                header={t('Monthly')}
                body={targetState}
              ></Column>
              <Column field="dateDue" header={t('Date due')}></Column>
              <Column field="target" header={t('Target')}></Column>
              <Column field="_id" header={t('Edit')} body={editLink}></Column>
            </DataTable>
          </div>
        </Card>
      </div>
    </>
  );
};

export default listVault;
