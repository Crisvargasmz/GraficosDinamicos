import React, { useState, useEffect } from 'react';
import {  View, Button, Alert, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from "react-native-chart-kit";
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import { CartesianChart, Bar } from "victory-native";
import { LinearGradient, vec, useFont } from "@shopify/react-native-skia";


export default function GraficoBarras({data}) {

  const generarPDF = async () => {
    try {
      // Crear una instancia de jsPDF
      const doc = new jsPDF();

      // Agregar título al PDF
      doc.text("Reporte de Salarios Barra", 10, 10);

      // Agregar los datos al PDF
      data.forEach((label, index) => {
        doc.text(`${label.nombre}: C$${label.salario}`, 10, 20 + index * 10); // Formato de los datos
      });


      // Generar el PDF como base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      // Definir la ruta temporal para el archivo PDF en el sistema de archivos del dispositivo
      const fileUri = `${FileSystem.documentDirectory}reporte_salarios_Barra.pdf`;

      // Guardar el archivo PDF
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Compartir el archivo PDF
      await Sharing.shareAsync(fileUri);
      
    } catch (error) {
      console.error("Error al generar o compartir el PDF: ", error);
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    }
  };

  const font = useFont(require("../../fonts/Roboto-Regular.ttf"));

  console.log("Datos para el gráfico:", data); // Agrega esta línea para depurar los datos

  return (
    <View style={styles.container}>
      {data.length > 0 ? ( // Verifica si hay datos antes de renderizar el gráfico
        <View style={{ width: '100%', height: 300 }}>
          <CartesianChart
            data={data.filter(item => typeof item.y === 'number' && item.y !== undefined)} // Filtra los datos
            xKey="x"
            yKeys={["y"]}
            padding={5}
            domainPadding={{ left: 50, right: 50, top: 10 }}
            axisOptions={{
              tickCount: { x: data.length, y: 10 },
              font: font,
              labelPosition: 'outset'
            }}
          >
            {({ points, chartBounds }) => (
              <Bar
                points={points.y}
                chartBounds={chartBounds}
                innerPadding={0.5}
                color="green"
                roundedCorners={{ topLeft: 10, topRight: 10 }}
                labels={{ position: "top", color: "orange" }}
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, 500)}
                  colors={[
                    "#a78bfa",
                    "#a78bfa50",
                  ]}
                />
              </Bar>
            )}
          </CartesianChart>
        </View>
      ) : (
        <View><Text>No hay datos para mostrar</Text></View> // Mensaje alternativo si no hay datos
      )}
            {/* Botón para generar y compartir PDF */}
	<Button title="Generar y Compartir PDF" onPress={generarPDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

