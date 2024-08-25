import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { Message } from "primereact/message";

import { useTranslation } from 'react-i18next';

const Vaults = (props) => {
  const {t, i18n} = useTranslation()
  const dueDate = (rowData) => {
    const date = new Date(rowData.dateDue);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (rowData.monthlyType === true) {
      return <Message severity="info" text={t('Every month')} />;
    }
    return <Message severity="info" text={`${day}/${month}/${year}`} />;
  };
  const needed = (rowData) => {
    const calculate = rowData.target - rowData.monthly.assigned;
    if (rowData.monthly.assigned < rowData.target) {
      return <Message severity="info" text={`${calculate} ${t('needed')}`} />;
    }
  };

  const assigned = (rowData) => {
    const target = rowData.target;
    const assigned = rowData.monthly.assigned;
    const monthlyType = rowData.monthlyType;
    const date = new Date(rowData.monthly.date);
    const dateDue = new Date(rowData.dateDue);
    const countMonth =
      (dateDue.getFullYear() - date.getFullYear()) * 12 +
      (dateDue.getMonth() - date.getMonth()) +
      1;

    if (!monthlyType) {
      const targetMonthly = (target - rowData.prevTransactions) / countMonth;
      if (countMonth <= 0) {
        return (
          <>
            <Tag
              severity="info"
              className="text-base font-light align-content-center"
              value={`${t('The due date has passed, you have transferred a total of')} ${
                rowData.transactions + rowData.prevTransactions
              } €`}
            ></Tag>
          </>
        );
      } else if (assigned < targetMonthly) {
        return (
          <>
            <Tag
              severity="danger"
              className="text-base font-light align-content-center"
              value={`${
                (targetMonthly - assigned).toFixed(2)
              }€ ${t('more is needed for reach target')}`}
            ></Tag>
          </>
        );
      } else if (assigned >= targetMonthly) {
        return assigned;
      }
    }
    if (assigned < target) {
      return (
        <>
          <Tag
            severity="danger"
            className="text-base font-light align-content-center"
            value={`${(target - assigned).toFixed(2)}€ ${t('more is needed for reach target')}`}
          ></Tag>
        </>
      );
    } else if (assigned >= target) {
      return assigned;
    }
  };

  const neededThisMonth = (rowData) => {
    const target = rowData.target;
    const assigned = rowData.monthly.assigned;
    const monthlyType = rowData.monthlyType;
    const date = new Date(rowData.monthly.date);
    const dateDue = new Date(rowData.dateDue);
    if (monthlyType === true) {
      if (assigned >= target) {
        return <>0</>;
      } else if (assigned < target) {
        return <>{target - assigned}</>;
      }
    } else if (monthlyType === false) {
      const countMonth =
        (dateDue.getFullYear() - date.getFullYear()) * 12 +
        (dateDue.getMonth() - date.getMonth()) +
        1;
      const monthlyDue =
        (target - (rowData.transactions + rowData.prevTransactions)) /
        countMonth;
      const targetMonthly = (target - rowData.prevTransactions) / countMonth;
      if (rowData.transactions >= targetMonthly) {
        return (
          <>
            <Tag
              severity="success"
              className="text-base font-light align-content-center"
              value={`${rowData.transactions} ${t('transfered on')} ${targetMonthly} ${t('required this month')}`}
            ></Tag>
          </>
        );
      }
      return (
        <>
          <Tag
            severity="danger"
            className="text-base font-light align-content-center"
            value={`${t('You need to transfer')} ${
              (targetMonthly - rowData.transactions).toFixed(2)
            } ${t('to reach the target this month')}`}
          ></Tag>
        </>
      );
    }
  };
  const totalTransactions = (rowData) => {
    const calculate = rowData.transactions + rowData.prevTransactions;
    return calculate;
  };
  const cellEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="EUR"
        locale="fr-FR"
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    try {
      const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${
        import.meta.env.VITE_BACKEND_PORT
      }/edit/vaultcell`;
      fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: rowData.monthly._id,
          idBucket: rowData.monthly.bucketRef,
          field: field,
          value: newValue,
        }),
      });
    } catch (err) {
      console.error("An error occurred : ", err);
    }
  };
  return (
    <>
      <DataTable
        editMode="cell"
        stripedRows
        value={props.fetch}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="label" header={t('Label')}></Column>
        <Column field="target" header={t('Target')}></Column>
        <Column header={t('Due date')} body={dueDate}></Column>
        <Column
          body={assigned}
          field="monthly.assigned"
          editor={(options) => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          header={t('assigned')}
        ></Column>
        <Column header={t('needed')} body={neededThisMonth}></Column>
        <Column field="transactions" header={t('Transfered')}></Column>
        <Column body={totalTransactions} header={t('Total transfered')}></Column>
      </DataTable>
      <div className="flex pt-6 text-lg justify-content-end">
        <span className="font-semibold">{props.totalAssigned} €</span>&nbsp;
        {t('assigned')}
      </div>
    </>
  );
};

export default Vaults;
