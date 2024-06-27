import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: {
   fontSize: 12
  },
  logo: { width: 100 },
  companyDetails: {
    
  },
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto", margin: "10px 0" },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "20%", borderStyle: "solid", borderWidth: 1, backgroundColor: "#bdbdbd" },
  tableCol: { width: "20%", borderStyle: "solid", borderWidth: 1 },
  tableCellHeader: { margin: "auto", marginTop: 5, fontSize: 10, fontWeight: "bold" },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  totalSection: { marginTop: 20, textAlign: 'right' },
  totalText: { fontSize: 12, fontWeight: 'bold' },
});

const Pdf = ({ data }) => {
  const totalGeneral = data.reduce((acc, total) => acc + total.total, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/img/logo_real.png" />
          <View style={styles.companyDetails}>
            <Text>Laboratorio Optimex (S.A. de C.V.)</Text>
            <Text>Dirección: Calle Falsa 123, Ciudad, País</Text>
            <Text>Teléfono: +52 123 456 7890</Text>
            <Text>Email: contacto@optimex.com</Text>
            <Text>Fecha: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Factura de Ventas Mensuales</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Lens Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Coatings Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Tint Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>
          {data.map((total, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{total.fecha}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${total.LensPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${total.CoatingsPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${total.TintPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${total.total.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total General: ${totalGeneral.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;