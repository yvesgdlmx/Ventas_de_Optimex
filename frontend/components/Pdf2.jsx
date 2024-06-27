import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Definición de estilos
const styles = StyleSheet.create({
  head: {
    backgroundColor: '#04acec', // Reemplaza var(--Azul) con el color que desees
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
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto", margin: "40px 20px" },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "20%", borderStyle: 'dashed', borderWidth: 0.5, backgroundColor: "#04acec", padding: '10', color: '#fff', fontWeight: 'bold' },
  tableCol: { width: "20%", borderStyle: "dashed", borderWidth: 0.5 },
  tableCellHeader: { margin: "auto", marginTop: 5, fontSize: 12, fontWeight: 'extrabold' },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10, padding: '10', color: '#5b5969'},
  totalSection: { marginTop: 10, textAlign: 'right', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '20', borderStyle: 'solid', borderWidth: '0.5', padding: '10', borderRadius: '5px', marginBottom: '20px' },
  totalText: { fontSize: 12, fontWeight: 'bold', marginRight: '25', color: '#5b5969' },
});

const Pdf2 = ({ data }) => {
  // Calcular las sumas de cada columna
  const totalLensPrice = data.reduce((sum, item) => sum + item.LensPrice, 0);
  const totalCoatingsPrice = data.reduce((sum, item) => sum + item.CoatingsPrice, 0);
  const totalTintPrice = data.reduce((sum, item) => sum + item.TintPrice, 0);
  const totalGeneral = data.reduce((sum, item) => sum + item.total, 0);

  // Obtener la fecha formateada (YYYY-MM)
  const formattedDate = data.length > 0 ? data[0].fecha.slice(0, 7) : '';

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.head}></View>
        <View style={styles.prueba}>
          <View style={styles.border}>
            <View style={styles.prueba__flex}>
              <Image src="/img/logo_real.png" style={styles.prueba__img} />
              <View style={styles.prueba__datos}>
                <Text style={styles.prueba__p}>Fecha de orden: <Text style={styles.prueba__span}>2024/06/10</Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.bb}>
            <View style={[styles.prueba__flex, styles.mt, styles.mb]}>
              <View style={styles.prueba_campo__flex}>
                <Text style={styles.prueba__h2}>Dirección:</Text>
                <Text style={styles.prueba__p}>Calle cualquiera #543 calle cualquiera, colonia cualquiera.</Text>
              </View>
              <View style={styles.prueba_campo__flex}>
                <Text style={styles.prueba__h2}>Email:</Text>
                <Text style={styles.prueba__p}>empresa_cualquiera@correo.com</Text>
              </View>
              <View style={styles.prueba_campo__flex}>
                <Text style={[styles.prueba__h2, styles.position]}>Teléfono:</Text>
                <Text style={styles.prueba__p}>33-98-67-56-54</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bb2}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Lens Totals</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Coatings Totals</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Tint Totals</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{formattedDate}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${totalLensPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${totalCoatingsPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${totalTintPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${totalGeneral.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.totalSection}>
            <View>
                <Text style={styles.totalText}>Total General: </Text>
            </View>
            <View>
                <Text style={styles.totalText}> ${totalGeneral.toFixed(2)}</Text>
            </View>
        </View>
        <View>
            <Text style={[styles.prueba__p, styles.padding, styles.mt, styles.mb]}>Los siguientes valores corresponden a la suma total de las ventas del mes de junio del año 2024.</Text>
        </View>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf2;