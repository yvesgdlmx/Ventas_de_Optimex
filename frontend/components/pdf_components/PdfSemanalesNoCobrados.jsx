import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Estilos para el PDF
const styles = StyleSheet.create({
  header__flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header__img: {
    width: '200px'
  },
  header_campo__flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header__h2: {
    fontSize: '30px',
    fontWeight: 'bold'
  },
  header__p: {
    fontSize: '20px',
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
    borderBottom: '0.5px solid #696969', // Reemplaza var(--Azul) con el color que desees
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
    marginLeft: '112px',
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
    borderBottom: '0.5px solid #696969', // Reemplaza var(--Azul) con el color que desees
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
  position2:  {
    position: 'relative',
    top: '7.5px'
  },
  page: {
    padding: 5,
    backgroundColor: '#FFF'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 'auto', // Centrar la tabla horizontalmente
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap' // Agregar flexWrap: 'nowrap'
  },
  tableColHeader: {
    width: '12.5%', // Ajustado para incluir la nueva columna
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    padding: 5,
  },
  tableCol: {
    width: '12.5%', // Ajustado para incluir la nueva columna
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    textAlign: 'center',
    padding: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto", margin: "auto", marginTop: 40 },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "12.5%", borderStyle: 'dashed', borderWidth: 0.5, backgroundColor: "#04acec", padding: '10', color: '#fff', fontWeight: 'bold' },
  tableCol: { width: "12.5%", borderStyle: "dashed", borderWidth: 0.5 },
  tableCellHeader: { margin: "auto", marginTop: 5, fontSize: 12, fontWeight: 'extrabold' },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10, padding: '10', color: '#5b5969'},
  totalSection: { marginTop: 10, textAlign: 'right', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '20', borderStyle: 'solid', borderWidth: '0.5', padding: '10', borderRadius: '5px', marginBottom: '20px' },
  totalText: { fontSize: 12, fontWeight: 'bold', marginRight: '25', color: '#5b5969' },
});

const PdfSemanalesNoCobrados = ({ data }) => {
  // Calcular totales
  const totalLensPrice = data.reduce((acc, registro) => acc + parseFloat(registro.LensPrice || 0), 0).toFixed(2);
  const totalCoatingsPrice = data.reduce((acc, registro) => acc + parseFloat(registro.CoatingsPrice || 0), 0).toFixed(2);
  const totalTintPrice = data.reduce((acc, registro) => acc + parseFloat(registro.TintPrice || 0), 0).toFixed(2);

  // Verificar si data no está vacío y tiene al menos un registro
  let formattedDate = '';
  if (data.length > 0 && data[0].ShipDate) {
    const firstRecordDate = parseISO(data[0].ShipDate);
    formattedDate = format(firstRecordDate, 'yyyy-MM', { locale: enUS });
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.head}></View>
        <View style={styles.prueba}>
          <View style={styles.border}>
            <View style={styles.prueba__flex}>
              <Image src="/img/logo_real.png" style={styles.prueba__img} />
              <View style={styles.prueba__datos}>
                <Text style={styles.prueba__p}>Order Date: <Text style={styles.prueba__span}>{formattedDate}</Text></Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.prueba__p, styles.padding, styles.mt, styles.mb, styles.ml]}>
            {data.length > 0 && data[0].ShipDate ? `The following values represent the sales data for ${format(parseISO(data[0].ShipDate), 'MMMM', { locale: enUS })} ${format(parseISO(data[0].ShipDate), 'yyyy')}.` : 'No data available.'}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Date</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Patient</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Coatings</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tint</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Poder</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>TAT</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Lens Total</Text>
              </View>
            </View>
            {data.map((registro, index) => {
              const lensPrice = parseFloat(registro.LensPrice || 0);
              const coatingsPrice = parseFloat(registro.CoatingsPrice || 0);
              const tintPrice = parseFloat(registro.TintPrice || 0);
              return (
                <View style={styles.tableRow} key={index} wrap={false}> {/* Agregar wrap={false} */}
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.ShipDate}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Patient || 'N/A'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${coatingsPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${tintPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Poder || 'N/A'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.TAT}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${lensPrice.toFixed(2)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total Coatings: ${totalCoatingsPrice} -</Text>
          <Text style={styles.totalText}>Total Tint: ${totalTintPrice} -</Text>
          <Text style={styles.totalText}>Total Lens: ${totalLensPrice}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfSemanalesNoCobrados;