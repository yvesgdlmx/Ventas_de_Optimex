import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header__flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    marginLeft: '112px',
  },
  page: {
    padding: 5,
    backgroundColor: '#FFF'
  },
  table: { 
    display: "table", 
    width: "auto", 
    margin: "40px 20px" 
  },
  tableRow: { 
    flexDirection: "row" 
  },
  tableColHeader: { 
    width: "14.5%", 
    borderStyle: 'dashed', 
    borderWidth: 0.5, 
    backgroundColor: "#04acec", 
    padding: '10', 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  tableCol: { 
    width: "14.5%", 
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
    flexDirection: 'row', 
    justifyContent: 'space-between', 
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
    marginRight: '25', 
    color: '#5b5969' 
  },
});

const PdfConsumoMaterial = ({ data, mes, ano }) => {
  // Calcular totales
  const totalCantidad = data.reduce((acc, registro) => acc + parseFloat(registro.Cantidad || 0), 0).toFixed(2);
  const totalCosto = data.reduce((acc, registro) => acc + parseFloat(registro.Costo || 0), 0).toFixed(2);
  const totalBase = data.reduce((acc, registro) => acc + parseFloat(registro.Base || 0), 0).toFixed(2);

  // Nombres de meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const nombreMes = monthNames[parseInt(mes, 10) - 1];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.prueba}>
          <View style={styles.border}>
            <View style={styles.prueba__flex}>
              <Image src="/img/logo_real.png" style={styles.prueba__img} />
              <View style={styles.prueba__datos}>
                <Text style={styles.prueba__p}>
                  Período: <Text style={styles.prueba__span}>{nombreMes} {ano}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Texto descriptivo */}
        <View>
          <Text style={[styles.prueba__p, styles.padding, styles.mt, styles.mb, styles.ml]}>
            {`Reporte de consumo de material correspondiente al período de ${nombreMes} ${ano}.`}
          </Text>
        </View>

        {/* Tabla */}
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Material</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Capa</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>SKU</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Base</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tipo</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Cantidad</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Costo</Text>
              </View>
            </View>
            {data.map((registro, index) => {
              const cantidad = parseFloat(registro.Cantidad || 0);
              const costo = parseFloat(registro.Costo || 0);
              const base = parseFloat(registro.Base || 0);
              const fecha = new Date(registro.Fecha).toLocaleDateString();
              
              return (
                <View style={styles.tableRow} key={index} wrap={false}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Material || 'N/A'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Capa || 'N/A'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.SKU || 'N/A'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{base.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{registro.Tipo || 'N/A'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{cantidad.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>${costo.toFixed(2)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Totales */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total Cantidad: {totalCantidad} -</Text>
          <Text style={styles.totalText}>Total Costo: ${totalCosto}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfConsumoMaterial;