import { Page, Document, StyleSheet } from '@react-pdf/renderer';
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


const Vieww = () => (
  <PDFViewer className="w5-h7" >
    <Document >
    <Page size="A4" style={styles.page}>
        <Invoice />
    </Page>
  </Document>
  </PDFViewer>
);



function pdfView() {
  return (
      <Vieww />
  );
}

export default pdfView;
