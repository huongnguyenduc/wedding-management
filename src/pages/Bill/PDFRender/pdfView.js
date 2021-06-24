import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import Invoice from './invoice';
import './pdf.css';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});



function pdfView(props) {
    return (
        <PDFViewer className="w5-h7" >
          <Document >
            <Page size="A4" style={styles.page}>
                <Invoice bill={props.bill}/>
            </Page>
          </Document>
        </PDFViewer>
    );
}

export default pdfView;
