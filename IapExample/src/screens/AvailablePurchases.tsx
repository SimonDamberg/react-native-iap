import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RNIap, {useIAP} from 'react-native-iap';

import {Box, Button, Heading, Row, State} from '../components';
import {contentContainerStyle, errorLog} from '../utils';

export const AvailablePurchases = () => {
  const {connected, availablePurchases, getAvailablePurchases} = useIAP();

  const handleGetAvailablePurchases = async () => {
    try {
      await getAvailablePurchases();
    } catch (error) {
      if (error instanceof RNIap.IapError) {
        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        errorLog({message: 'handleGetAvailablePurchases', error});
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={contentContainerStyle}>
      <State connected={connected} />

      <Box>
        <View style={styles.container}>
          <Heading copy="Available purchases" />

          {availablePurchases.map((availablePurchase, index) => (
            <Row
              key={availablePurchase.productId}
              fields={[
                {
                  label: 'Product Id',
                  value: availablePurchase.productId,
                },
              ]}
              isLast={availablePurchases.length - 1 === index}
            />
          ))}
        </View>

        <Button
          title="Get the available purchases"
          onPress={handleGetAvailablePurchases}
        />
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
