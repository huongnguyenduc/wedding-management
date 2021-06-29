import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export  function ExportReport(fileName, reportData){
    var wb = XLSX.utils.book_new();
    reportData.forEach(report=>{
        var wscols = [];
        report.data[0].forEach(column => {
            wscols.push({width: 25})
        });
        
       
        wb.SheetNames.push(report.sheet);
        var ws = XLSX.utils.aoa_to_sheet(report.data);
        ws["!cols"] = wscols;
        wb.Sheets[report.sheet] = ws;
        
        
    })
    
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fileName + '.xlsx')
}

function s2ab(s) {

    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
    
}