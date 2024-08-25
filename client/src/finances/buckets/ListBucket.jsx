import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { IconX } from "@tabler/icons-react";

import { useTranslation } from 'react-i18next';

const listBucket = () => {
  const {t, i18n} = useTranslation()

  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/buckets/list`;
  const [data, setData] = useState();

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
      message: `${t('Delete Bucket Confirmation')}`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/bucket/delete/${id}/`, {
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

  const target = (object) => {
    if (object.targeted === false) {
      return <IconX size={18} />;
    }
    return <p>{object.defaultTarget}</p>;
  };

  const editLink = (object) => {
    return (
      <>
        <a href={`/buckets/edit/${object._id}`}>
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
          title="Buckets"
          subTitle={t('List buckets subtitle')}
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
                field="defaultTarget"
                header={t('Target')}
                body={target}
              ></Column>
              <Column field="_id" header={t('Edit')} body={editLink}></Column>
            </DataTable>
          </div>
        </Card>
      </div>
    </>
  );
};

export default listBucket;
