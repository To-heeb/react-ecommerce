const TableSpinner = () => {
  return (
    <>
      <tr>
        <td className=" text-center" colSpan={7}>
          <div className="spinner-border text-primary my-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableSpinner;
