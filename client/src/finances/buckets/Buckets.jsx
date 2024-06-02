import { DataTable } from "primereact/datatable";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { InputNumber } from "primereact/inputnumber";
import { Message } from "primereact/message";


const Buckets = (props) => {
  const available = (rowData) => {
    const calculate =
      rowData.monthly.assigned +
      rowData.prevAssigned +
      (-rowData.expense + -rowData.prevExpense);
    if (calculate < 0) {
      return <Message severity="warn" text={`${calculate}`} />;
    }
    return <Message severity="success" text={`${calculate}`} />;
  };

  const assigned = (rowData) => {
    const target = rowData.monthly.target;
    const assigned = rowData.monthly.assigned;
    const needed = target - assigned;
    if (rowData.target === false) {
      return assigned;
    } else if (assigned < target) {
      return (
        <>
          <Tag
            severity="danger"
            className="text-base font-light align-content-center"
            value={`${needed}€ more is needed for reach target`}
          ></Tag>
        </>
      );
    } else if (assigned >= target) {
      return assigned;
    }
  };
  const target = (rowData) => {
    const target = rowData.targeted;
    if (target === true) {
      return rowData.monthly.target;
    }
    return (
      <>
        <Tag
          severity="success"
          className="text-base font-light align-content-center"
          value={`target isn't required`}
        ></Tag>
      </>
    );
  };

  const progressBar = (rowData) => {
    const calculate = (rowData.expense / rowData.monthly.assigned) * 100;
    if (rowData.monthly.assigned === 0) {
      return <Message text="You must assign an amount" />;
    } else if (isNaN(calculate)) {
      return <ProgressBar value={0}></ProgressBar>;
    } else if (calculate > 100) {
      return (
        <ProgressBar
          className="p-progressbar-over"
          value={Math.round(calculate)}
        ></ProgressBar>
      );
    } else if (calculate === 100) {
      return (
        <ProgressBar
          className="p-progressbar-perfect"
          value={Math.round(calculate)}
        ></ProgressBar>
      );
    }
    return <ProgressBar value={Math.round(calculate)}></ProgressBar>;
  };

  const cellEditor = (options) => {
    return (
      <InputNumber
        className="max-w-max"
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
      const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/bucketcell`;
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

  const footerTarget = () => {
    const data = props.fetch
    const calculate = data.reduce(
      (total, objet) => total + objet.monthly.target,
      0
    );
    return calculate
  }

  const footerAvailable = () => {
    const data = props.fetch
    const assigned = data.reduce(
      (total, objet) => total + objet.monthly.assigned,
      0
    );
    const prevAssigned = data.reduce(
      (total, objet) => total + objet.prevAssigned,
      0
    );
    const expense = data.reduce(
      (total, objet) => total + objet.expense,
      0
    );
    const prevExpense = data.reduce(
      (total, objet) => total + objet.prevExpense,
      0
    );
    const calculate = 
      assigned +
      prevAssigned +
      (-expense + -prevExpense);

    return calculate
  }

  const footerAssigned = () => {
    const data = props.fetch
    const calculate = data.reduce(
      (total, objet) => total + objet.monthly.assigned,
      0
    );
    return calculate
  }

  const footerExpense = () => {
    const data = props.fetch
    const calculate = data.reduce(
      (total, objet) => total + objet.expense,
      0
    );
    return calculate
  }

  const footerTable = (
    <ColumnGroup>
        <Row>
            <Column  style={{ width: "13%" }} />
            <Column footer="Totals:"  style={{ width: "40%" }} footerStyle={{ textAlign: 'right' }}  />
            <Column footer={footerTarget} style={{ width: "18%" }} /> 
            <Column footer={footerAssigned} style={{ width: "19%" }} /> 
            <Column footer={footerExpense} style={{ width: "11%" }} />
            <Column footer={footerAvailable} style={{ width: "12%" }} />
        </Row>
    </ColumnGroup>
);

  return (
    <>
      <DataTable
        editMode="cell"
        stripedRows
        value={props.fetch}
        tableStyle={{ minWidth: "50rem" }}
        footerColumnGroup={footerTable}
      >
        <Column field="label" style={{ width: "13%" }} header="label"></Column>
        <Column
          style={{ width: "40%" }}
          header="% spended / assigned this month"
          body={progressBar}
        ></Column>
        <Column
          body={target}
          field="monthly.target"
          style={{ width: "18%" }}
          editor={(options) => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          header="target"
        ></Column>
        <Column
          body={assigned}
          field="monthly.assigned"
          style={{ width: "19%" }}
          editor={(options) => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          header="assigned"
        ></Column>
        <Column
          style={{ width: "11%" }}
          field="expense"
          header="expense"
        ></Column>
        <Column
          style={{ width: "12%" }}
          header="available"
          body={available}
        ></Column>
      </DataTable>
    </>
  );
};

export default Buckets;
