import React, { useState, useEffect } from "react";
import { DataTable, Text, Paragraph } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import Loading from "./Loading";

const numberOfItemsPerPageList = [10, 25, 50];

const CustomTable = ({ rows, headers, loading, tableStyle }) => {
  //Hooks & Consts
  const isEmpty = rows?.length ? rows?.length === 0 : true;
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, rows?.length);
  const [sort, setSort] = useState({ field: "date", order: "desc" });

  //Listeners
  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  //Functions
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy] || b[orderBy] === null) {
      return -1;
    }
    if (b[orderBy] > a[orderBy] || a[orderBy] === null) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleSort = (field, order) => {
    setSort((prev) => {
      var newOrder;
      if (field !== prev.field) {
        newOrder = prev.order;
      } else {
        newOrder = order === "asc" ? "desc" : "asc";
      }
      return { field, order: newOrder };
    });
  };

  const tableheader = (header) => {
    const { id, name, label, isNum, style } = header;
    return (
      <DataTable.Title
        key={id}
        numeric={isNum}
        style={style}
        onPress={() => handleSort(name, sort.order)}
        sortDirection={
          sort.field === name &&
          (sort.order === "asc" ? "ascending" : "descending")
        }
      >
        {label}
      </DataTable.Title>
    );
  };

  const tableRow = (row) => {
    var arr = [];
    for (const [key, value] of Object.entries(row)) {
      headers?.map(
        (header) => header?.name === key && arr?.push({ key, value })
      );
    }
    return (
      <DataTable.Row key={row.id}>
        {headers?.map((header) => {
          const { renderCell } = header;
          return arr.map(
            (item) =>
              item?.key === header?.name &&
              (header?.multiline ? (
                <View style={[header?.style]} key={item.key}>
                  <Text style={{ textAlign: header.textAlign }}>
                    {renderCell ? renderCell(item.value) : item.value}
                  </Text>
                </View>
              ) : (
                <DataTable.Cell style={header?.style} key={item.key}>
                  {renderCell ? renderCell(item.value) : item.value}
                </DataTable.Cell>
              ))
          );
        })}
        {headers.map(
          (header) =>
            header.name === "actions" && (
              <DataTable.Cell
                style={[header?.style, { position: "relative", top: 3 }]}
                key={header.id}
              >
                {header.renderCell(row)}
              </DataTable.Cell>
            )
        )}
      </DataTable.Row>
    );
  };

  return (
    <DataTable style={[styles.table, tableStyle]}>
      <DataTable.Header>
        {headers.map((header) => header.name && tableheader(header))}
      </DataTable.Header>
      {isEmpty ? (
        <Paragraph style={styles.noresults}>No results found.</Paragraph>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {loading ? (
            <Loading style={styles.loading} />
          ) : (
            [...rows]
              ?.sort(getComparator(sort.order, sort.field))
              ?.slice(
                page * numberOfItemsPerPage,
                page * numberOfItemsPerPage + numberOfItemsPerPage
              )
              ?.map((row) => tableRow(row))
          )}
        </ScrollView>
      )}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(rows?.length / numberOfItemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${rows?.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default CustomTable;

const styles = StyleSheet.create({
  table: {
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 50,
    height: "100%",
    width: "100%",
    overflow: "scroll",
  },
  content: {
    flexGrow: 1,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noresults: {
    alignSelf: "center",
    margin: 10,
    padding: 10,
  },
});
