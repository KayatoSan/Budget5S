import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { Message } from "primereact/message";

const Vaults = (props) => {
  const dueDate = (rowData) => {
    const date = new Date(rowData.dateDue);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (rowData.monthlyType === true) {
      return <Message severity="info" text="Every month" />;
    }
    return <Message severity="info" text={`${day}/${month}/${year}`} />;
  };
  const needed = (rowData) => {
    const calculate = rowData.target - rowData.monthly.assigned;
    if (rowData.monthly.assigned < rowData.target) {
      return <Message severity="info" text={`${calculate} needed`} />;
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
    const targetMonthly = (target - rowData.prevTransactions) / countMonth;

    if (target === false) {
      return assigned;
    } else if (assigned < targetMonthly) {
      return (
        <>
          <Tag
            severity="danger"
            className="text-base font-light align-content-center"
            value={`${
              targetMonthly - assigned
            }€ more is needed for reach target`}
          ></Tag>
        </>
      );
    } else if (assigned >= targetMonthly) {
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
        return <>OK</>;
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
              value={`${rowData.transactions} transfered on ${targetMonthly} required this month`}
            ></Tag>
          </>
        );
      }
      return (
        <>
          <Tag
            severity="danger"
            className="text-base font-light align-content-center"
            value={`You need to transfer ${
              targetMonthly - rowData.transactions
            } to reach the target this month`}
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
      const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/vaultcell`;
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
      console.error("Une erreur s'est produite : ", err);
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
        <Column field="label" header="label"></Column>
        <Column field="target" header="target"></Column>
        <Column header="due date" body={dueDate}></Column>

        <Column
          body={assigned}
          field="monthly.assigned"
          editor={(options) => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          header="assigned"
        ></Column>
        <Column header="needed" body={neededThisMonth}></Column>
        <Column field="transactions" header="transfered"></Column>
        <Column body={totalTransactions} header="total transfered"></Column>
      </DataTable>
      <div className="flex pt-6 text-lg justify-content-end">
        <span className="font-semibold">{props.totalAssigned} €</span>&nbsp;
        assigned
      </div>
    </>
  );
};

export default Vaults;
