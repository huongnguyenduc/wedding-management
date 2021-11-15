import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./invoice";
import "./pdf.css";
import { useSelector } from "react-redux";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

function PdfView(props) {
  const bills = useSelector((state) => state.notPaidBillItem);
  const services = useSelector((state) => state.weddingServices);
  return (
    <>
      <PDFViewer className="w5-h7">
        <Document>
          <Page size="A4" style={styles.page}>
            <Invoice
              service={services.services ? services.services : []}
              bill={bills}
            />
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}

export default PdfView;
