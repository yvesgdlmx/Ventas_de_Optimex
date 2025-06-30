import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// Definimos estilos para lograr un diseño más profesional
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#FAFAFA'
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#3A3A3A',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottom: '1px solid #E0E0E0',
  },
  label: {
    fontWeight: 'bold',
    color: '#555555',
  },
  value: {
    color: '#555555',
  },
  lastSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    // Si no deseas border-bottom en el último registro comenta la siguiente línea:
    borderBottom: '1px solid #E0E0E0', 
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    border: '1px solid #E0E0E0',
    borderRadius: 5,
    overflow: 'hidden'
  }
});
const PdfInkMermas = ({
  sumaCost,
  sumaCostMerm,
  fivePercent,
  diferencia,
  percentDiferencia,
  total,
  selectedMonth
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>INK - Mermas - {selectedMonth.label}</Text>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.label}>Suma Cost:</Text>
            <Text style={styles.value}>{sumaCost.toFixed(2)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Suma Cost Merm:</Text>
            <Text style={styles.value}>{sumaCostMerm.toFixed(2)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>5% de Suma Cost:</Text>
            <Text style={styles.value}>{fivePercent.toFixed(2)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Diferencia (Merm - Cost):</Text>
            <Text style={styles.value}>{diferencia.toFixed(2)}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>% Diferencia sobre Suma Cost:</Text>
            <Text style={styles.value}>{percentDiferencia.toFixed(2)}%</Text>
          </View>
          <View style={styles.lastSection}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.value}>{total.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PdfInkMermas;