import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
const styles = StyleSheet.create({
  head: {
    backgroundColor: '#04acec',
    height: '15',
    width: '100%',
  },
  prueba: {
    paddingHorizontal: '20',
    marginTop: '20'
  },
  prueba__flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: '10px'
  },
  prueba__img: {
    width: '150px',
  },
  prueba__datos: {
    marginLeft: '20px',
  },
  prueba__h2: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#5b5969',
  },
  prueba__h1: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#5b5969',
  },
  prueba__p: {
    fontSize: '12px',
    color: '#696969',
  },
  prueba__span: {
    fontWeight: 'bold',
  },
  border: {
    borderBottom: '0.5px solid #696969',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  padding: {
    paddingHorizontal: '20px',
  },
  mt: {
    marginTop: '20px',
  },
  mb: {
    marginBottom: '20px',
  },
  ml: {
    marginLeft: '40px',
  },
  prueba_campo__flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '45%',
    gap: '5',
    marginLeft: '20',
  },
  bb: {
    borderBottom: '0.5px solid #696969',
    paddingBottom: '10px',
  },
  bb2: {
    borderBottom: '0.5px solid #696969',
    paddingBottom: '10px',
    marginHorizontal: '20px'
  },
  position:  {
    position: 'relative',
    bottom: '7.5px'
  },
  section: { marginBottom: 10 },
  // Se ajusta la tabla para tener 5 columnas (20% cada una)
  table: { display: "table", width: "auto", margin: "40px 20px" },
  tableRow: { flexDirection: "row", flexWrap: 'nowrap' },
  tableColHeader: { 
    width: "20%", 
    borderStyle: 'dashed', 
    borderWidth: 0.5, 
    backgroundColor: "#04acec", 
    padding: '10', 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  tableCol: { 
    width: "20%", 
    borderStyle: "dashed", 
    borderWidth: 0.5 
  },
  tableCellHeader: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 12, 
    fontWeight: 'extrabold' 
  },
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10, 
    padding: '10', 
    color: '#5b5969'
  },
  totalSection: { 
    marginTop: 10, 
    textAlign: 'right', 
    display: 'flex', 
    flexDirection: 'column', 
    marginHorizontal: '20', 
    borderStyle: 'solid', 
    borderWidth: '0.5', 
    padding: '10', 
    borderRadius: '5px', 
    marginBottom: '20px' 
  },
  totalText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: '5', 
    color: '#5b5969' 
  },
});
const Pdf2 = ({ data }) => {
  // Calcular totales de cada columna
  const totalLensPrice = data.reduce((sum, item) => sum + item.LensPrice, 0);
  const totalCoatingsPrice = data.reduce((sum, item) => sum + item.CoatingsPrice, 0);
  const totalTintPrice = data.reduce((sum, item) => sum + item.TintPrice, 0);
  const totalClickFee = data.reduce((sum, item) => sum + item.click_fee, 0);
  
  // Obtener la fecha formateada (YYYY-MM)
  const formattedDate = data.length > 0 
    ? format(parseISO(data[0].fecha), 'yyyy-MM', { locale: enUS })
    : '';
    
  // Obtener el texto resumen con mes y año
  const monthYearText = data.length > 0 
    ? `The values represent the total sum of sales for the month of ${format(parseISO(data[0].fecha), 'MMMM', { locale: enUS })} in the year ${format(parseISO(data[0].fecha), 'yyyy')}.`
    : 'The values represent the total sum of sales.';
    
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.head}></View>
        <View style={styles.prueba}>
          <View style={styles.border}>
            <View style={styles.prueba__flex}>
              <Image src="/img/logo_real.png" style={styles.prueba__img} />
              <View style={styles.prueba__datos}>
                <Text style={styles.prueba__p}>
                  Order Date: <Text style={styles.prueba__span}>{formattedDate}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bb2}>
          {/* Tabla de totales con 5 columnas: Fecha, Coatings, Tint, Lens y Click Fee */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Fecha</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Coatings Totals</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tint Totals</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Lens Totals</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Click Fee Totals</Text>
              </View>
            </View>
            <View style={styles.tableRow} wrap={false}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formattedDate}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${totalCoatingsPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${totalTintPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${totalLensPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${totalClickFee.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          {/* Sección de totales generales */}
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Grand Total Coatings: ${totalCoatingsPrice.toFixed(2)}</Text>
            <Text style={styles.totalText}>Grand Total Tint: ${totalTintPrice.toFixed(2)}</Text>
            <Text style={styles.totalText}>Grand Total Lens: ${totalLensPrice.toFixed(2)}</Text>
            <Text style={styles.totalText}>Grand Total Click Fee: ${totalClickFee.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={[styles.prueba__p, styles.padding, styles.mt, styles.mb, styles.ml]}>
              {monthYearText}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default Pdf2;