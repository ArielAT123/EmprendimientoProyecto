import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Summary = () => {
  return(
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Resumen */}
        <Text style={styles.sectionTitle}>Resumen</Text>
        <Text style={styles.summary}>
          As the global home for all developers, GitHub is the complete AI-powered developer platform...
        </Text>
        <TouchableOpacity>
        <Text style={styles.showMore}>Mostrar todos los detalles →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontWeight: 'bold', marginTop: 20, fontSize: 16 },
  summary: { marginTop: 8, color: '#444', fontSize: 13 },
  showMore: { marginTop: 10, color: '#0A66C2', fontWeight: '500' }
});

export default Summary;