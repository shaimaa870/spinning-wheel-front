import Datatable from "react-data-table-component";
import PropTypes from "prop-types";
import config from "src/configs";
import Search from "./Search";
import '@styles/react/libs/tables/react-dataTable-component.scss'

function CustomDataTable({
  keyField,
  data = [],
  loading,
  columns,
  filter,
  setFilter,
  sortServer=true,
  metadata,
  noHeader = false,
  disableSearch,
  ...props
}) {
  let dataprops = { data, columns, noHeader, ...props };
  const handelChanage = (page) => {
    setFilter && setFilter({ ...filter, page: page });
  };
  const handelChangeRowsPerPage = (r, p) => {
    setFilter && setFilter({ ...filter, page: 1, pageSize: r });
  };
  const handleOnSort = (r, p) => {

    setFilter && setFilter({ ...filter, sortBy: r.selector, sortOrder: p });
  };
  dataprops.paginationRowsPerPageOptions = config.pageOptions;

  return setFilter ? (
    <Datatable
      className='react-dataTable'
      keyField={keyField}
      {...dataprops}
      paginationTotalRows={metadata?.totalItemCount || 0}
      paginationPerPage={filter.pageSize}
      progressPending={loading}
      onChangePage={handelChanage}
      paginationDefaultPage={filter.page}
      paginationServer={true}
      onChangeRowsPerPage={handelChangeRowsPerPage}
      subHeader
      sortServer={sortServer}
      onSort={handleOnSort}
      subHeaderComponent={!disableSearch && <Search setFilter={setFilter} filter={filter} />}
      paginationServerOptions={{
        persistSelectedOnPageChange: true,
        persistSelectedOnSort: false,
      }}
    />
  ) : (
    <Datatable {...dataprops} />
  );
}

export default CustomDataTable;

CustomDataTable.propTypes = {
  keyField: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};
